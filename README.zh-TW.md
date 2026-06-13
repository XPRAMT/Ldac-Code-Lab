# LDAC Code Lab

[English](README.md) | [繁體中文](README.zh-TW.md)

這是一個用於 LDAC 編碼、解碼與參數實驗的跨平台 Python GUI 工具，支援 Windows 與 Linux。

## 功能

- 選擇音訊檔後自動判斷操作：
  - 非 `.ldac` 輸入：轉成 PCM 後編碼為 `.ldac`
  - `.ldac` 輸入：解碼為 24-bit WAV 或 FLAC
- LDAC 往返測試：
  - 輸入音訊 -> LDAC 編碼 -> LDAC 解碼 -> WAV 或 FLAC
  - 用於檢查 LDAC 對解碼後音訊的影響
  - 輸出檔名會使用 `_ldac`，例如 `song_ldac.wav` 或 `song_ldac.flac`
- 使用 Qt Linguist 翻譯檔的多語言 GUI：
  - 英語
  - 繁體中文（台灣）
  - 簡體中文
  - 日語
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

GUI 使用 `bin/` 裡的原生輔助工具：

- Windows:
  - `bin/ldacenc_raw.exe`
  - `bin/ldacdec_wav.exe`
- Linux:
  - `bin/ldacenc_raw`
  - `bin/ldacdec_wav`

這些執行檔由本地 LDAC 原始碼建置而來。Windows 執行 GUI 時不需要 WSL。

Linux 下載後如果執行權限遺失，請執行：

```bash
chmod +x bin/ldacenc_raw bin/ldacdec_wav
```

## 翻譯檔

翻譯檔放在 `language/`，使用 Qt Linguist 格式：

- 翻譯來源檔：`*.ts`
- 執行時載入檔：`*.qm`

修改 GUI 文字後可用下列命令更新翻譯：

```powershell
pyside6-lupdate ldac_gui.py -ts language\ldac_code_lab_en_US.ts language\ldac_code_lab_zh_TW.ts language\ldac_code_lab_zh_CN.ts language\ldac_code_lab_ja_JP.ts
pyside6-lrelease language\ldac_code_lab_en_US.ts language\ldac_code_lab_zh_TW.ts language\ldac_code_lab_zh_CN.ts language\ldac_code_lab_ja_JP.ts
```

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
