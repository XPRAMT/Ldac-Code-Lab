# LDAC Code Lab

[English](README.md) | [繁體中文](README.zh-TW.md)

Cross-platform Python GUI for experimenting with LDAC encoding and decoding on Windows and Linux.

## Features

- Select an audio file and automatically choose the operation:
  - Non-`.ldac` input: convert to PCM and encode to `.ldac`
  - `.ldac` input: decode to 24-bit WAV or FLAC
- LDAC bitrate presets: 990, 660, 330 kbps
- Custom bitrate support
- Custom LDAC gradient parameters:
  - `nbands`
  - `grad-mode`
  - `grad-qu-l`
  - `grad-qu-h`
  - `grad-ofst-l`
  - `grad-ofst-h`
  - `abc`
- Supports 44.1, 48, 88.2, and 96 kHz workflows.

## Run

Install Python dependencies:

```powershell
pip install PySide6
```

Run:

```powershell
python ldac_gui.py
```

Or double-click:

```text
RUN.bat
```

## Included Binaries

The GUI uses bundled native helper binaries in `bin/`:

- Windows:
  - `bin/ldacenc_raw.exe`
  - `bin/ldacdec_wav.exe`
- Linux:
  - `bin/ldacenc_raw`
  - `bin/ldacdec_wav`

These are built from the local LDAC source tree. Windows no longer requires WSL at runtime.

On Linux, if the binaries lose their executable bit after download, run:

```bash
chmod +x bin/ldacenc_raw bin/ldacdec_wav
```

FFmpeg is still required for general audio format conversion. Install FFmpeg and make sure
`ffmpeg` can be executed from your `PATH`.

Check from PowerShell:

```powershell
ffmpeg -version
```

## Source Code Origins

This project is a GUI/tooling wrapper around LDAC-related source code from:

- `hegdi/libldacdec`  
  https://github.com/hegdi/libldacdec  
  License: MIT

- Android Open Source Project `external/libldac`  
  https://android.googlesource.com/platform/external/libldac  
  License: Apache License 2.0

The LDAC encoder logic and LDAC bit allocation tables come from AOSP `external/libldac`.
The LDAC decoder code used here comes from `hegdi/libldacdec`.

## Notes

- This is an experimental codec analysis tool, not an official Sony LDAC product.
- Custom gradient parameters can make the encoder reject a configuration if the values violate LDAC internal limits.
- For 44.1/48 kHz, LDAC internally limits effective `nbands` to 12. For 88.2/96 kHz, the limit is 16.
