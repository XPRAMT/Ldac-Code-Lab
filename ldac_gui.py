from __future__ import annotations

import os
import platform
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from PySide6.QtCore import Qt, QThread, QTranslator, Signal
from PySide6.QtWidgets import (
    QApplication,
    QCheckBox,
    QComboBox,
    QFileDialog,
    QFormLayout,
    QGridLayout,
    QGroupBox,
    QHBoxLayout,
    QLabel,
    QLineEdit,
    QMainWindow,
    QMessageBox,
    QPushButton,
    QPlainTextEdit,
    QProgressBar,
    QSpinBox,
    QVBoxLayout,
    QWidget,
)


APP_DIR = Path(__file__).resolve().parents[1]
TOOLS_DIR = Path(__file__).resolve().parent / "bin"
LANGUAGE_DIR = Path(__file__).resolve().parent / "language"
LANGUAGES = [
    ("en_US", "English"),
    ("zh_TW", "繁體中文（台灣）"),
    ("zh_CN", "简体中文"),
    ("ja_JP", "日本語"),
]


def bundled_tool(name: str) -> Path:
    system = platform.system()
    if system == "Windows":
        return TOOLS_DIR / f"{name}.exe"
    if system == "Linux":
        return TOOLS_DIR / name
    raise RuntimeError(f"Unsupported operating system: {system}")


LDACENC_RAW_EXE = bundled_tool("ldacenc_raw")
LDACDEC_WAV_EXE = bundled_tool("ldacdec_wav")


def find_ffmpeg() -> Path:
    ffmpeg = shutil.which("ffmpeg")
    if ffmpeg:
        return Path(ffmpeg)
    return Path("ffmpeg")


FFMPEG = find_ffmpeg()


def run_command(args: list[str], cwd: Path | None = None) -> str:
    completed = subprocess.run(
        args,
        cwd=str(cwd) if cwd else None,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        check=False,
    )
    output = completed.stdout.decode("utf-8", errors="replace")
    if completed.returncode != 0:
        raise RuntimeError(
            f"Command failed with exit code {completed.returncode}\n"
            f"{' '.join(args)}\n\n{output}"
        )
    return output


class LdacJob(QThread):
    log = Signal(str)
    done = Signal(Path)
    failed = Signal(str)

    def __init__(
        self,
        input_path: Path,
        mode: str,
        bitrate: int,
        sample_rate: int | None,
        output_format: str,
        output_path: Path,
        gradient_enabled: bool,
        gradient_values: dict[str, int],
    ) -> None:
        super().__init__()
        self.input_path = input_path
        self.mode = mode
        self.bitrate = bitrate
        self.sample_rate = sample_rate
        self.output_format = output_format
        self.output_path = output_path
        self.gradient_enabled = gradient_enabled
        self.gradient_values = gradient_values

    def run(self) -> None:
        try:
            if self.mode == "encode":
                output = self.encode_audio()
            elif self.mode == "roundtrip":
                output = self.roundtrip_audio()
            else:
                output = self.decode_ldac()
            self.done.emit(output)
        except Exception as exc:  # noqa: BLE001 - GUI must surface subprocess failures.
            self.failed.emit(str(exc))

    def encode_audio(self) -> Path:
        if not FFMPEG.exists():
            raise FileNotFoundError(self.tr("ffmpeg not found: {path}").format(path=FFMPEG))
        if not LDACENC_RAW_EXE.exists():
            raise FileNotFoundError(self.tr("LDAC encoder not found: {path}").format(path=LDACENC_RAW_EXE))

        output_ldac = self.output_path
        with tempfile.TemporaryDirectory(prefix="ldac_gui_") as tmp:
            pcm_path = Path(tmp) / "input_f32le.pcm"
            encode_rate = self.sample_rate or 48000
            ffmpeg_cmd = [
                str(FFMPEG),
                "-y",
                "-hide_banner",
                "-loglevel",
                "error",
                "-i",
                str(self.input_path),
                "-map",
                "0:a:0",
                "-ac",
                "2",
                "-ar",
                str(encode_rate),
                "-c:a",
                "pcm_f32le",
                "-f",
                "f32le",
            ]
            ffmpeg_cmd.append(str(pcm_path))

            self.log.emit(self.tr("Decode input to 32-bit float stereo PCM..."))
            self.log.emit(run_command(ffmpeg_cmd))
            if not pcm_path.exists() or pcm_path.stat().st_size == 0:
                raise RuntimeError(self.tr("ffmpeg did not produce PCM data; input may be unreadable or corrupted."))

            ldac_cmd = self.build_encode_command(pcm_path, output_ldac, encode_rate)
            self.log.emit(self.tr("Encode LDAC at {bitrate} kbps...").format(bitrate=self.bitrate))
            self.log.emit(run_command(ldac_cmd, cwd=APP_DIR))

        return output_ldac

    def roundtrip_audio(self) -> Path:
        if not FFMPEG.exists():
            raise FileNotFoundError(self.tr("ffmpeg not found: {path}").format(path=FFMPEG))
        if not LDACENC_RAW_EXE.exists():
            raise FileNotFoundError(self.tr("LDAC encoder not found: {path}").format(path=LDACENC_RAW_EXE))
        if not LDACDEC_WAV_EXE.exists():
            raise FileNotFoundError(self.tr("LDAC decoder not found: {path}").format(path=LDACDEC_WAV_EXE))

        final_output = self.output_path
        with tempfile.TemporaryDirectory(prefix="ldac_gui_") as tmp:
            tmp_dir = Path(tmp)
            pcm_path = tmp_dir / "input_f32le.pcm"
            ldac_path = tmp_dir / "roundtrip.ldac"
            decoded_wav = tmp_dir / "decoded_24bit.wav"
            encode_rate = self.sample_rate or 48000

            ffmpeg_cmd = [
                str(FFMPEG),
                "-y",
                "-hide_banner",
                "-loglevel",
                "error",
                "-i",
                str(self.input_path),
                "-map",
                "0:a:0",
                "-ac",
                "2",
                "-ar",
                str(encode_rate),
                "-c:a",
                "pcm_f32le",
                "-f",
                "f32le",
                str(pcm_path),
            ]
            self.log.emit(self.tr("Decode input to 32-bit float stereo PCM..."))
            self.log.emit(run_command(ffmpeg_cmd))
            if not pcm_path.exists() or pcm_path.stat().st_size == 0:
                raise RuntimeError(self.tr("ffmpeg did not produce PCM data; input may be unreadable or corrupted."))

            self.log.emit(self.tr("Encode temporary LDAC at {bitrate} kbps...").format(bitrate=self.bitrate))
            self.log.emit(run_command(self.build_encode_command(pcm_path, ldac_path, encode_rate), cwd=APP_DIR))

            self.log.emit(self.tr("Decode temporary LDAC to 24-bit PCM WAV..."))
            self.log.emit(run_command([str(LDACDEC_WAV_EXE), str(ldac_path), str(decoded_wav)], cwd=APP_DIR))

            if self.output_format == "wav":
                shutil.copyfile(decoded_wav, final_output)
            else:
                ffmpeg_cmd = [
                    str(FFMPEG),
                    "-y",
                    "-hide_banner",
                    "-loglevel",
                    "error",
                    "-i",
                    str(decoded_wav),
                    "-c:a",
                    "flac",
                    str(final_output),
                ]
                self.log.emit(self.tr("Save round-trip output as FLAC..."))
                self.log.emit(run_command(ffmpeg_cmd))

        return final_output

    def build_encode_command(self, pcm_path: Path, output_ldac: Path, sample_rate: int) -> list[str]:
        options = [
            str(LDACENC_RAW_EXE),
            "--input",
            str(pcm_path),
            "--output",
            str(output_ldac),
            "--rate",
            str(sample_rate),
            "--bitrate",
            str(self.bitrate),
        ]
        if self.gradient_enabled:
            for cli_name, value in self.gradient_values.items():
                options.extend([f"--{cli_name}", str(value)])
        return options

    def decode_ldac(self) -> Path:
        if self.output_format == "flac" and not FFMPEG.exists():
            raise FileNotFoundError(self.tr("ffmpeg not found: {path}").format(path=FFMPEG))
        if not LDACDEC_WAV_EXE.exists():
            raise FileNotFoundError(self.tr("LDAC decoder not found: {path}").format(path=LDACDEC_WAV_EXE))

        final_output = self.output_path
        with tempfile.TemporaryDirectory(prefix="ldac_gui_") as tmp:
            decoded_wav = Path(tmp) / "decoded_24bit.wav"

            self.log.emit(self.tr("Decode LDAC to 24-bit PCM WAV..."))
            self.log.emit(run_command([str(LDACDEC_WAV_EXE), str(self.input_path), str(decoded_wav)], cwd=APP_DIR))

            if self.output_format == "wav":
                shutil.copyfile(decoded_wav, final_output)
            else:
                ffmpeg_cmd = [
                    str(FFMPEG),
                    "-y",
                    "-hide_banner",
                    "-loglevel",
                    "error",
                    "-i",
                    str(decoded_wav),
                    "-c:a",
                    "flac",
                    str(final_output),
                ]
                self.log.emit(self.tr("Convert decoded PCM to FLAC..."))
                self.log.emit(run_command(ffmpeg_cmd))

        return final_output


class MainWindow(QMainWindow):
    def __init__(self) -> None:
        super().__init__()
        self.resize(860, 620)
        self.job: LdacJob | None = None
        self.translator = QTranslator(self)
        self.current_language = "en_US"

        self.language_label = QLabel()
        self.language_combo = QComboBox()
        for code, name in LANGUAGES:
            self.language_combo.addItem(name, code)
        self.language_combo.currentIndexChanged.connect(self.change_language)

        language_row = QHBoxLayout()
        language_row.addWidget(self.language_label)
        language_row.addWidget(self.language_combo)
        language_row.addStretch(1)

        self.input_edit = QLineEdit()
        self.input_edit.setReadOnly(True)
        self.browse_button = QPushButton()
        self.browse_button.clicked.connect(self.choose_file)

        file_row = QHBoxLayout()
        file_row.addWidget(self.input_edit, 1)
        file_row.addWidget(self.browse_button)

        self.output_edit = QLineEdit()
        self.output_button = QPushButton()
        self.output_button.clicked.connect(self.choose_output)

        output_row = QHBoxLayout()
        output_row.addWidget(self.output_edit, 1)
        output_row.addWidget(self.output_button)

        self.mode_label = QLabel()
        self.mode_label.setAlignment(Qt.AlignLeft)

        self.bitrate_combo = QComboBox()
        self.bitrate_combo.addItem("990", 990)
        self.bitrate_combo.addItem("660", 660)
        self.bitrate_combo.addItem("330", 330)
        self.bitrate_combo.addItem("", "custom")
        self.bitrate_combo.currentTextChanged.connect(self.sync_bitrate_mode)
        self.custom_bitrate = QSpinBox()
        self.custom_bitrate.setRange(132, 1536)
        self.custom_bitrate.setValue(660)
        self.custom_bitrate.setSuffix(" kbps")
        self.custom_bitrate.setEnabled(False)

        self.sample_rate_combo = QComboBox()
        self.sample_rate_combo.addItem("", None)
        for rate in (44100, 48000, 88200, 96000):
            self.sample_rate_combo.addItem(f"{rate} Hz", rate)

        self.output_format = QComboBox()
        self.output_format.addItems(["wav", "flac"])
        self.output_format.currentTextChanged.connect(self.refresh_output_path)

        self.bitrate_label = QLabel()
        self.custom_bitrate_label = QLabel()
        self.sample_rate_label = QLabel()
        encode_form = QFormLayout()
        encode_form.addRow(self.bitrate_label, self.bitrate_combo)
        encode_form.addRow(self.custom_bitrate_label, self.custom_bitrate)
        encode_form.addRow(self.sample_rate_label, self.sample_rate_combo)
        self.encode_box = QGroupBox()
        self.encode_box.setLayout(encode_form)

        self.output_format_label = QLabel()
        decode_form = QFormLayout()
        decode_form.addRow(self.output_format_label, self.output_format)
        self.decode_box = QGroupBox()
        self.decode_box.setLayout(decode_form)

        self.gradient_box = QGroupBox()
        self.gradient_box.setCheckable(True)
        self.gradient_box.setChecked(False)
        gradient_grid = QGridLayout()
        self.gradient_spins: dict[str, QSpinBox] = {}
        gradient_specs = [
            (
                "nbands",
                "nbands",
                2,
                17,
                12,
                self.tr("Base bands count; controls how many frequency bands are encoded. At 48 kHz LDAC clamps this internally, and too high a value may fail initialization."),
            ),
            (
                "grad-mode",
                "mode",
                0,
                3,
                0,
                self.tr("Gradient mode; controls how the bit allocation gradient curve is interpreted. Mode 0 uses the full qu/offset range and is useful for manual experiments."),
            ),
            (
                "grad-qu-l",
                "qu low",
                0,
                31,
                18,
                self.tr("Gradient start quantization unit; lower values make the allocation curve affect lower and mid frequencies earlier."),
            ),
            (
                "grad-qu-h",
                "qu high",
                1,
                32,
                32,
                self.tr("Gradient end quantization unit; higher values extend the allocation curve into higher-frequency units."),
            ),
            (
                "grad-ofst-l",
                "offset low",
                0,
                31,
                7,
                self.tr("Start offset; affects bit retention near the beginning of the gradient. Lower values usually preserve more bits there."),
            ),
            (
                "grad-ofst-h",
                "offset high",
                0,
                31,
                23,
                self.tr("End offset; affects high-frequency bit retention. Lower values usually preserve more high-frequency bits but consume budget from other bands."),
            ),
            (
                "abc",
                "abc",
                0,
                1,
                0,
                self.tr("Advanced bit allocation control flag. Original tables mostly use 0; enabling it may change allocation behavior and should be verified by testing."),
            ),
        ]
        for index, (key, label, low, high, default, tooltip) in enumerate(gradient_specs):
            name_label = QLabel(label)
            name_label.setToolTip(tooltip)
            spin = QSpinBox()
            spin.setRange(low, high)
            spin.setValue(default)
            spin.setToolTip(tooltip)
            self.gradient_spins[key] = spin
            row = index // 2
            col = (index % 2) * 2
            gradient_grid.addWidget(name_label, row, col)
            gradient_grid.addWidget(spin, row, col + 1)

        self.preset_label = QLabel()
        self.preset_label.setTextInteractionFlags(Qt.TextSelectableByMouse)
        self.preset_label.setStyleSheet("font-family: Consolas, monospace;")

        gradient_layout = QHBoxLayout()
        gradient_layout.addLayout(gradient_grid, 1)
        gradient_layout.addWidget(self.preset_label)
        self.gradient_box.setLayout(gradient_layout)

        self.run_button = QPushButton()
        self.run_button.clicked.connect(self.start_auto)
        self.roundtrip_button = QPushButton()
        self.roundtrip_button.clicked.connect(self.start_roundtrip)

        action_row = QHBoxLayout()
        action_row.addWidget(self.run_button)
        action_row.addWidget(self.roundtrip_button)
        action_row.addStretch(1)

        self.progress = QProgressBar()
        self.progress.setRange(0, 1)
        self.progress.setValue(0)
        self.log_output = QPlainTextEdit()
        self.log_output.setReadOnly(True)

        central = QWidget()
        layout = QVBoxLayout(central)
        layout.addLayout(language_row)
        layout.addLayout(file_row)
        layout.addLayout(output_row)
        layout.addWidget(self.mode_label)
        settings_row = QHBoxLayout()
        settings_row.addWidget(self.encode_box)
        settings_row.addWidget(self.decode_box)
        layout.addLayout(settings_row)
        layout.addWidget(self.gradient_box)
        layout.addLayout(action_row)
        layout.addWidget(self.progress)
        layout.addWidget(self.log_output, 1)
        self.setCentralWidget(central)

        self.load_language(self.current_language)
        self.retranslate_ui()
        self.sync_bitrate_mode()
        self.refresh_mode()

    def change_language(self) -> None:
        code = self.language_combo.currentData()
        if code:
            self.load_language(code)
            self.retranslate_ui()
            self.refresh_mode()
            self.refresh_output_path()

    def load_language(self, code: str) -> None:
        app = QApplication.instance()
        if app is None:
            return
        app.removeTranslator(self.translator)
        self.translator = QTranslator(self)
        qm_path = LANGUAGE_DIR / f"ldac_code_lab_{code}.qm"
        if qm_path.exists() and self.translator.load(str(qm_path)):
            app.installTranslator(self.translator)
        self.current_language = code

    def retranslate_ui(self) -> None:
        self.setWindowTitle(self.tr("LDAC Codec Lab"))
        self.language_label.setText(self.tr("Language"))
        self.browse_button.setText(self.tr("Select Audio"))
        self.output_button.setText(self.tr("Select Output"))
        self.bitrate_combo.setItemText(0, "990")
        self.bitrate_combo.setItemText(1, "660")
        self.bitrate_combo.setItemText(2, "330")
        self.bitrate_combo.setItemText(3, self.tr("Custom"))
        self.sample_rate_combo.setItemText(0, self.tr("Auto / keep source"))
        self.bitrate_label.setText(self.tr("Bitrate"))
        self.custom_bitrate_label.setText(self.tr("Custom bitrate"))
        self.sample_rate_label.setText(self.tr("PCM sample rate"))
        self.output_format_label.setText(self.tr("Output format"))
        self.encode_box.setTitle(self.tr("Encode Settings"))
        self.decode_box.setTitle(self.tr("Decode Settings"))
        self.gradient_box.setTitle(self.tr("Custom LDAC Gradient"))
        self.run_button.setText(self.tr("Start"))
        self.roundtrip_button.setText(self.tr("LDAC Round-Trip Test"))
        self.preset_label.setText(
            self.tr(
                "Original LDAC preset parameters\n"
                "Fields: nbands, mode, quL, quH, ofstL, ofstH, abc\n\n"
                "48k / 44.1k:\n"
                "990k: 12, 0, 18, 32,  7, 23, 0\n"
                "660k: 12, 0, 16, 32, 10, 31, 0\n"
                "330k: 10, 0, 14, 26, 12, 31, 0\n\n"
                "96k / 88.2k:\n"
                "990k: 16, 0, 18, 32,  7, 23, 0\n"
                "660k: 13, 0, 16, 32, 10, 31, 0\n"
                "330k: 10, 0, 14, 26, 12, 31, 0"
            )
        )
        self.preset_label.setToolTip(
            self.tr(
                "44.1/48 kHz are 1FS and LDAC allows up to 12 bands; "
                "88.2/96 kHz are 2FS and allow up to 16 bands. Other gradient fields are the same."
            )
        )

    def choose_file(self) -> None:
        path, _ = QFileDialog.getOpenFileName(
            self,
            self.tr("Select Audio"),
            str(Path.home()),
            self.tr("Audio Files (*.ldac *.wav *.flac *.m4a *.aac *.mp3 *.ogg *.opus);;All Files (*)"),
        )
        if path:
            self.input_edit.setText(path)
            self.refresh_mode()
            self.refresh_output_path()

    def choose_output(self) -> None:
        input_path = self.selected_input()
        default_path = self.default_output_path(input_path) if input_path else Path.home() / "output.ldac"
        if input_path and input_path.suffix.lower() == ".ldac":
            if self.output_format.currentText() == "flac":
                file_filter = "FLAC (*.flac);;All Files (*)"
            else:
                file_filter = "WAV (*.wav);;All Files (*)"
        else:
            file_filter = "LDAC (*.ldac);;All Files (*)"

        path, _ = QFileDialog.getSaveFileName(
            self,
            self.tr("Select Output Path"),
            str(default_path),
            file_filter,
        )
        if path:
            self.output_edit.setText(path)

    def sync_bitrate_mode(self) -> None:
        self.custom_bitrate.setEnabled(self.bitrate_combo.currentData() == "custom")

    def refresh_mode(self) -> None:
        path = self.selected_input()
        if path is None:
            self.mode_label.setText(self.tr("No audio file selected"))
            return
        if path.suffix.lower() == ".ldac":
            self.mode_label.setText(self.tr("Input is LDAC: it can be decoded to WAV/FLAC"))
        else:
            self.mode_label.setText(self.tr("Input is regular audio: it will be converted to PCM before LDAC encoding"))

    def refresh_output_path(self) -> None:
        path = self.selected_input()
        if path is None:
            return
        current = self.output_edit.text().strip()
        if not current or Path(current).parent == path.parent:
            self.output_edit.setText(str(self.default_output_path(path)))

    def default_output_path(self, input_path: Path) -> Path:
        if input_path.suffix.lower() == ".ldac":
            return input_path.with_suffix(f".{self.output_format.currentText()}")
        return input_path.with_suffix(".ldac")

    def roundtrip_output_path(self, input_path: Path) -> Path:
        return input_path.with_name(f"{input_path.stem}_ldac.{self.output_format.currentText()}")

    def selected_input(self) -> Path | None:
        text = self.input_edit.text().strip()
        if not text:
            return None
        return Path(text)

    def selected_bitrate(self) -> int:
        if self.bitrate_combo.currentData() == "custom":
            return self.custom_bitrate.value()
        return int(self.bitrate_combo.currentData())

    def selected_sample_rate(self) -> int | None:
        return self.sample_rate_combo.currentData()

    def selected_output(self) -> Path | None:
        text = self.output_edit.text().strip()
        if not text:
            return None
        return Path(text)

    def start_auto(self) -> None:
        path = self.require_input()
        if path is None:
            return
        if path.suffix.lower() == ".ldac":
            output = self.require_output(f".{self.output_format.currentText()}")
            if output is None:
                return
            self.start_job("decode", path, output)
        else:
            output = self.require_output(".ldac")
            if output is None:
                return
            self.start_job("encode", path, output)

    def start_roundtrip(self) -> None:
        path = self.require_input()
        if path is None:
            return
        if path.suffix.lower() == ".ldac":
            QMessageBox.warning(
                self,
                self.tr("Input type mismatch"),
                self.tr("LDAC round-trip test requires a regular audio file and does not accept .ldac input."),
            )
            return
        output = self.roundtrip_output_path(path)
        self.output_edit.setText(str(output))
        output.parent.mkdir(parents=True, exist_ok=True)
        self.start_job("roundtrip", path, output)

    def require_input(self) -> Path | None:
        path = self.selected_input()
        if path is None or not path.exists():
            QMessageBox.warning(self, self.tr("File not found"), self.tr("Please select an existing audio file first."))
            return None
        return path

    def require_output(self, suffix: str) -> Path | None:
        output = self.selected_output()
        if output is None:
            input_path = self.selected_input()
            if input_path is None:
                QMessageBox.warning(self, self.tr("Missing output path"), self.tr("Please select an output path first."))
                return None
            output = self.default_output_path(input_path)
            self.output_edit.setText(str(output))
        if output.suffix.lower() != suffix:
            output = output.with_suffix(suffix)
            self.output_edit.setText(str(output))
        output.parent.mkdir(parents=True, exist_ok=True)
        return output

    def start_job(self, mode: str, path: Path, output: Path) -> None:
        self.set_busy(True)
        self.log_output.clear()
        self.progress.setRange(0, 0)
        self.job = LdacJob(
            input_path=path,
            mode=mode,
            bitrate=self.selected_bitrate(),
            sample_rate=self.selected_sample_rate(),
            output_format=self.output_format.currentText(),
            output_path=output,
            gradient_enabled=self.gradient_box.isChecked(),
            gradient_values={key: spin.value() for key, spin in self.gradient_spins.items()},
        )
        self.job.log.connect(self.append_log)
        self.job.done.connect(self.job_done)
        self.job.failed.connect(self.job_failed)
        self.job.start()

    def set_busy(self, busy: bool) -> None:
        self.browse_button.setEnabled(not busy)
        self.output_button.setEnabled(not busy)
        self.run_button.setEnabled(not busy)
        self.roundtrip_button.setEnabled(not busy)
        self.progress.setRange(0, 0 if busy else 1)
        if not busy:
            self.progress.setValue(1)

    def append_log(self, text: str) -> None:
        if text.strip():
            self.log_output.appendPlainText(text.rstrip())

    def job_done(self, output: Path) -> None:
        self.set_busy(False)
        self.append_log(self.tr("Done: {path}").format(path=output))
        QMessageBox.information(self, self.tr("Done"), self.tr("Output completed:\n{path}").format(path=output))

    def job_failed(self, message: str) -> None:
        self.set_busy(False)
        self.append_log(message)
        QMessageBox.critical(self, self.tr("Failed"), message)


def main() -> int:
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    return app.exec()


if __name__ == "__main__":
    raise SystemExit(main())
