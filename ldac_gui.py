from __future__ import annotations

import os
import platform
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from PySide6.QtCore import Qt, QThread, Signal
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
            else:
                output = self.decode_ldac()
            self.done.emit(output)
        except Exception as exc:  # noqa: BLE001 - GUI must surface subprocess failures.
            self.failed.emit(str(exc))

    def encode_audio(self) -> Path:
        if not FFMPEG.exists():
            raise FileNotFoundError(f"ffmpeg not found: {FFMPEG}")
        if not LDACENC_RAW_EXE.exists():
            raise FileNotFoundError(f"Windows LDAC encoder not found: {LDACENC_RAW_EXE}")

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

            self.log.emit("Decode input to 32-bit float stereo PCM...")
            self.log.emit(run_command(ffmpeg_cmd))
            if not pcm_path.exists() or pcm_path.stat().st_size == 0:
                raise RuntimeError("ffmpeg did not produce PCM data; input may be unreadable or corrupted.")

            ldac_cmd = self.build_encode_command(pcm_path, output_ldac, encode_rate)
            self.log.emit(f"Encode LDAC at {self.bitrate} kbps...")
            self.log.emit(run_command(ldac_cmd, cwd=APP_DIR))

        return output_ldac

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
            raise FileNotFoundError(f"ffmpeg not found: {FFMPEG}")
        if not LDACDEC_WAV_EXE.exists():
            raise FileNotFoundError(f"Windows LDAC decoder not found: {LDACDEC_WAV_EXE}")

        final_output = self.output_path
        with tempfile.TemporaryDirectory(prefix="ldac_gui_") as tmp:
            decoded_wav = Path(tmp) / "decoded_24bit.wav"

            self.log.emit("Decode LDAC to 24-bit PCM WAV...")
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
                self.log.emit("Convert decoded PCM to FLAC...")
                self.log.emit(run_command(ffmpeg_cmd))

        return final_output


class MainWindow(QMainWindow):
    def __init__(self) -> None:
        super().__init__()
        self.setWindowTitle("LDAC Codec Lab")
        self.resize(860, 620)
        self.job: LdacJob | None = None

        self.input_edit = QLineEdit()
        self.input_edit.setReadOnly(True)
        self.browse_button = QPushButton("選擇音檔")
        self.browse_button.clicked.connect(self.choose_file)

        file_row = QHBoxLayout()
        file_row.addWidget(self.input_edit, 1)
        file_row.addWidget(self.browse_button)

        self.output_edit = QLineEdit()
        self.output_button = QPushButton("選擇輸出")
        self.output_button.clicked.connect(self.choose_output)

        output_row = QHBoxLayout()
        output_row.addWidget(self.output_edit, 1)
        output_row.addWidget(self.output_button)

        self.mode_label = QLabel("尚未選擇")
        self.mode_label.setAlignment(Qt.AlignLeft)

        self.bitrate_combo = QComboBox()
        self.bitrate_combo.addItems(["990", "660", "330", "自訂"])
        self.bitrate_combo.currentTextChanged.connect(self.sync_bitrate_mode)
        self.custom_bitrate = QSpinBox()
        self.custom_bitrate.setRange(132, 1536)
        self.custom_bitrate.setValue(660)
        self.custom_bitrate.setSuffix(" kbps")
        self.custom_bitrate.setEnabled(False)

        self.sample_rate_combo = QComboBox()
        self.sample_rate_combo.addItem("自動/保持", None)
        for rate in (44100, 48000, 88200, 96000):
            self.sample_rate_combo.addItem(f"{rate} Hz", rate)

        self.output_format = QComboBox()
        self.output_format.addItems(["wav", "flac"])
        self.output_format.currentTextChanged.connect(self.refresh_output_path)

        encode_form = QFormLayout()
        encode_form.addRow("碼率", self.bitrate_combo)
        encode_form.addRow("自訂碼率", self.custom_bitrate)
        encode_form.addRow("輸入轉 PCM 取樣率", self.sample_rate_combo)
        encode_box = QGroupBox("編碼設定")
        encode_box.setLayout(encode_form)

        decode_form = QFormLayout()
        decode_form.addRow("輸出格式", self.output_format)
        decode_box = QGroupBox("解碼設定")
        decode_box.setLayout(decode_form)

        self.gradient_box = QGroupBox("自訂 LDAC Gradient")
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
                "Base bands 數量；決定編碼涵蓋到多少頻帶。48 kHz 會被 LDAC 內部上限限制，過高可能初始化失敗。",
            ),
            (
                "grad-mode",
                "mode",
                0,
                3,
                0,
                "Gradient 模式；控制 bit allocation 梯度曲線的解讀方式。mode 0 使用完整 qu/offset 範圍，較適合手動實驗。",
            ),
            (
                "grad-qu-l",
                "qu low",
                0,
                31,
                18,
                "Gradient 起始 quantization unit；數值越低，分配曲線越早影響低/中頻。",
            ),
            (
                "grad-qu-h",
                "qu high",
                1,
                32,
                32,
                "Gradient 結束 quantization unit；數值越高，分配曲線延伸到更高頻的量化單元。",
            ),
            (
                "grad-ofst-l",
                "offset low",
                0,
                31,
                7,
                "起始 offset；影響梯度前段的 bit 保留傾向。較小通常讓該區域懲罰較少、保留較多。",
            ),
            (
                "grad-ofst-h",
                "offset high",
                0,
                31,
                23,
                "結束 offset；影響高頻端 bit 保留傾向。較小通常讓高頻被保留更多，但會消耗其他頻段 bit budget。",
            ),
            (
                "abc",
                "abc",
                0,
                1,
                0,
                "Advanced bit allocation control flag；原始表多為 0。開啟可能改變 bit allocation 行為，需用實測確認。",
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

        preset_label = QLabel(
            "原始 LDAC 預設參數\n"
            "欄位: nbands, mode, quL, quH, ofstL, ofstH, abc\n\n"
            "48k / 44.1k:\n"
            "990k: 12, 0, 18, 32,  7, 23, 0\n"
            "660k: 12, 0, 16, 32, 10, 31, 0\n"
            "330k: 10, 0, 14, 26, 12, 31, 0\n\n"
            "96k / 88.2k:\n"
            "990k: 16, 0, 18, 32,  7, 23, 0\n"
            "660k: 13, 0, 16, 32, 10, 31, 0\n"
            "330k: 10, 0, 14, 26, 12, 31, 0"
        )
        preset_label.setTextInteractionFlags(Qt.TextSelectableByMouse)
        preset_label.setToolTip(
            "48k/44.1k 屬於 1FS，LDAC 內部最多 12 bands；"
            "96k/88.2k 屬於 2FS，最多 16 bands。gradient 其他欄位相同。"
        )
        preset_label.setStyleSheet("font-family: Consolas, monospace;")

        gradient_layout = QHBoxLayout()
        gradient_layout.addLayout(gradient_grid, 1)
        gradient_layout.addWidget(preset_label)
        self.gradient_box.setLayout(gradient_layout)

        self.run_button = QPushButton("開始")
        self.run_button.clicked.connect(self.start_auto)

        action_row = QHBoxLayout()
        action_row.addWidget(self.run_button)
        action_row.addStretch(1)

        self.progress = QProgressBar()
        self.progress.setRange(0, 1)
        self.progress.setValue(0)
        self.log_output = QPlainTextEdit()
        self.log_output.setReadOnly(True)

        central = QWidget()
        layout = QVBoxLayout(central)
        layout.addLayout(file_row)
        layout.addLayout(output_row)
        layout.addWidget(self.mode_label)
        settings_row = QHBoxLayout()
        settings_row.addWidget(encode_box)
        settings_row.addWidget(decode_box)
        layout.addLayout(settings_row)
        layout.addWidget(self.gradient_box)
        layout.addLayout(action_row)
        layout.addWidget(self.progress)
        layout.addWidget(self.log_output, 1)
        self.setCentralWidget(central)

        self.sync_bitrate_mode()
        self.refresh_mode()

    def choose_file(self) -> None:
        path, _ = QFileDialog.getOpenFileName(
            self,
            "選擇音檔",
            str(Path.home()),
            "Audio Files (*.ldac *.wav *.flac *.m4a *.aac *.mp3 *.ogg *.opus);;All Files (*)",
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
            "選擇輸出路徑",
            str(default_path),
            file_filter,
        )
        if path:
            self.output_edit.setText(path)

    def sync_bitrate_mode(self) -> None:
        self.custom_bitrate.setEnabled(self.bitrate_combo.currentText() == "自訂")

    def refresh_mode(self) -> None:
        path = self.selected_input()
        if path is None:
            self.mode_label.setText("尚未選擇音檔")
            return
        if path.suffix.lower() == ".ldac":
            self.mode_label.setText("輸入為 LDAC：可解碼為 WAV/FLAC")
        else:
            self.mode_label.setText("輸入為一般音訊：會先轉 24-bit PCM，再編碼為 LDAC")

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

    def selected_input(self) -> Path | None:
        text = self.input_edit.text().strip()
        if not text:
            return None
        return Path(text)

    def selected_bitrate(self) -> int:
        if self.bitrate_combo.currentText() == "自訂":
            return self.custom_bitrate.value()
        return int(self.bitrate_combo.currentText())

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

    def require_input(self) -> Path | None:
        path = self.selected_input()
        if path is None or not path.exists():
            QMessageBox.warning(self, "找不到檔案", "請先選擇存在的音檔。")
            return None
        return path

    def require_output(self, suffix: str) -> Path | None:
        output = self.selected_output()
        if output is None:
            input_path = self.selected_input()
            if input_path is None:
                QMessageBox.warning(self, "缺少輸出路徑", "請先選擇輸出路徑。")
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
        self.progress.setRange(0, 0 if busy else 1)
        if not busy:
            self.progress.setValue(1)

    def append_log(self, text: str) -> None:
        if text.strip():
            self.log_output.appendPlainText(text.rstrip())

    def job_done(self, output: Path) -> None:
        self.set_busy(False)
        self.append_log(f"完成：{output}")
        QMessageBox.information(self, "完成", f"輸出完成：\n{output}")

    def job_failed(self, message: str) -> None:
        self.set_busy(False)
        self.append_log(message)
        QMessageBox.critical(self, "失敗", message)


def main() -> int:
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    return app.exec()


if __name__ == "__main__":
    raise SystemExit(main())
