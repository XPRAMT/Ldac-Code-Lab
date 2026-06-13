# LDAC Code Lab

[English](README.md) | [繁體中文](README.zh-TW.md)

這是一個用於 LDAC 編碼、解碼與參數實驗的 Windows GUI 工具。

## 功能

- 選擇音訊檔後自動判斷操作：
  - 非 `.ldac` 輸入：轉成 PCM 後編碼為 `.ldac`
  - `.ldac` 輸入：解碼為 24-bit WAV 或 FLAC
- LDAC 碼率預設：990、660、330 kbps
- 支援自訂碼率
- 支援自訂 LDAC gradient 參數：
  - `nbands`
  - `grad-mode`
  - `grad-qu-l`
  - `grad-qu-h`
  - `grad-ofst-l`
  - `grad-ofst-h`
  - `abc`
- 支援 44.1、48、88.2、96 kHz 流程。

## 執行方式

安裝 Python 依賴：

```powershell
pip install PySide6
```

執行：

```powershell
python ldac_gui.py
```

或直接雙擊：

```text
RUN.bat
```

## 內含執行檔

GUI 使用 `bin/` 裡的 Windows 原生輔助工具：

- `bin/ldacenc_raw.exe`
- `bin/ldacdec_wav.exe`

這些執行檔由本地 LDAC 原始碼建置而來，執行 GUI 時不需要 WSL。

一般音訊格式轉換仍需要 FFmpeg。請安裝 FFmpeg，並確認 `ffmpeg` 可以從 `PATH` 執行。

可在 PowerShell 檢查：

```powershell
ffmpeg -version
```

## 原始碼來源

本專案是基於 LDAC 相關原始碼製作的 GUI 與工具封裝：

- `hegdi/libldacdec`  
  https://github.com/hegdi/libldacdec  
  授權：MIT

- Android Open Source Project `external/libldac`  
  https://android.googlesource.com/platform/external/libldac  
  授權：Apache License 2.0

LDAC encoder 邏輯與 bit allocation 表來自 AOSP `external/libldac`。
此處使用的 LDAC decoder 程式碼來自 `hegdi/libldacdec`。

## 注意事項

- 這是編碼器分析與實驗工具，不是 Sony 官方 LDAC 產品。
- 自訂 gradient 參數若違反 LDAC 內部限制，encoder 可能拒絕該設定。
- 44.1/48 kHz 時，LDAC 內部會將有效 `nbands` 限制在 12；88.2/96 kHz 時上限為 16。
