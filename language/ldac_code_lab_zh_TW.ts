<?xml version='1.0' encoding='utf-8'?>
<TS version="2.1" language="zh_TW">
<context>
    <name>LdacJob</name>
    <message>
        <location filename="../ldac_gui.py" line="126" />
        <location filename="../ldac_gui.py" line="168" />
        <location filename="../ldac_gui.py" line="252" />
        <source>ffmpeg not found: {path}</source>
        <translation>找不到 ffmpeg：{path}</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="128" />
        <location filename="../ldac_gui.py" line="170" />
        <source>LDAC encoder not found: {path}</source>
        <translation>找不到 LDAC 編碼器：{path}</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="155" />
        <location filename="../ldac_gui.py" line="202" />
        <source>Decode input to 32-bit float stereo PCM...</source>
        <translation>將輸入解碼為 32-bit float 立體聲 PCM...</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="158" />
        <location filename="../ldac_gui.py" line="205" />
        <source>ffmpeg did not produce PCM data; input may be unreadable or corrupted.</source>
        <translation>ffmpeg 沒有產生 PCM 資料；輸入可能無法讀取或已損壞。</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="161" />
        <source>Encode LDAC at {bitrate} kbps...</source>
        <translation>以 {bitrate} kbps 編碼 LDAC...</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="172" />
        <location filename="../ldac_gui.py" line="254" />
        <source>LDAC decoder not found: {path}</source>
        <translation>找不到 LDAC 解碼器：{path}</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="207" />
        <source>Encode temporary LDAC at {bitrate} kbps...</source>
        <translation>以 {bitrate} kbps 編碼暫存 LDAC...</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="210" />
        <source>Decode temporary LDAC to 24-bit PCM WAV...</source>
        <translation>將暫存 LDAC 解碼為 24-bit PCM WAV...</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="228" />
        <source>Save round-trip output as FLAC...</source>
        <translation>將往返測試輸出儲存為 FLAC...</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="260" />
        <source>Decode LDAC to 24-bit PCM WAV...</source>
        <translation>將 LDAC 解碼為 24-bit PCM WAV...</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="278" />
        <source>Convert decoded PCM to FLAC...</source>
        <translation>將解碼後 PCM 轉為 FLAC...</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <location filename="../ldac_gui.py" line="543" />
        <source>Base bands count; controls how many frequency bands are encoded. At 48 kHz LDAC clamps this internally, and too high a value may fail initialization.</source>
        <translation>Base bands 數量；決定編碼涵蓋到多少頻帶。48 kHz 會被 LDAC 內部上限限制，過高可能初始化失敗。</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="544" />
        <source>Gradient mode; controls how the bit allocation gradient curve is interpreted. Mode 0 uses the full qu/offset range and is useful for manual experiments.</source>
        <translation>Gradient 模式；控制 bit allocation 梯度曲線的解讀方式。mode 0 使用完整 qu/offset 範圍，較適合手動實驗。</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="545" />
        <source>Gradient start quantization unit; lower values make the allocation curve affect lower and mid frequencies earlier.</source>
        <translation>Gradient 起始 quantization unit；數值越低，分配曲線越早影響低/中頻。</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="546" />
        <source>Gradient end quantization unit; higher values extend the allocation curve into higher-frequency units.</source>
        <translation>Gradient 結束 quantization unit；數值越高，分配曲線會延伸到更高頻的量化單元。</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="547" />
        <source>Start offset; affects bit retention near the beginning of the gradient. Lower values usually preserve more bits there.</source>
        <translation>起始 offset；影響梯度前段的 bit 保留傾向。較小通常讓該區域懲罰較少、保留較多。</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="548" />
        <source>End offset; affects high-frequency bit retention. Lower values usually preserve more high-frequency bits but consume budget from other bands.</source>
        <translation>結束 offset；影響高頻端 bit 保留傾向。較小通常讓高頻保留更多，但會消耗其他頻段的 bit budget。</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="549" />
        <source>Advanced bit allocation control flag. Original tables mostly use 0; enabling it may change allocation behavior and should be verified by testing.</source>
        <translation>Advanced bit allocation control 旗標；原始表多為 0。開啟可能改變 bit allocation 行為，需用實測確認。</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="523" />
        <source>LDAC Codec Lab</source>
        <translation>LDAC Codec Lab</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="524" />
        <source>Language</source>
        <translation>語言</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="525" />
        <source>System Default</source>
        <translation>系統預設</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="528" />
        <location filename="../ldac_gui.py" line="580" />
        <source>Select Audio</source>
        <translation>選擇音檔</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="529" />
        <source>Select Output</source>
        <translation>選擇輸出</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="533" />
        <source>Custom</source>
        <translation>自訂</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="534" />
        <source>Auto / keep source</source>
        <translation>自動 / 保持來源</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="535" />
        <source>Bitrate</source>
        <translation>碼率</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="536" />
        <source>Custom bitrate</source>
        <translation>自訂碼率</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="537" />
        <source>PCM sample rate</source>
        <translation>PCM 取樣率</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="538" />
        <source>Output format</source>
        <translation>輸出格式</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="539" />
        <source>Encode Settings</source>
        <translation>編碼設定</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="540" />
        <source>Decode Settings</source>
        <translation>解碼設定</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="541" />
        <source>Custom LDAC Gradient</source>
        <translation>自訂 LDAC Gradient</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="554" />
        <source>Start</source>
        <translation>開始</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="555" />
        <source>LDAC Round-Trip Test</source>
        <translation>LDAC 往返測試</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="569" />
        <source>Original LDAC preset parameters
Fields: nbands, mode, quL, quH, ofstL, ofstH, abc

48k / 44.1k:
990k: 12, 0, 18, 32,  7, 23, 0
660k: 12, 0, 16, 32, 10, 31, 0
330k: 10, 0, 14, 26, 12, 31, 0

96k / 88.2k:
990k: 16, 0, 18, 32,  7, 23, 0
660k: 13, 0, 16, 32, 10, 31, 0
330k: 10, 0, 14, 26, 12, 31, 0</source>
        <translation>原始 LDAC 預設參數
欄位: nbands, mode, quL, quH, ofstL, ofstH, abc

48k / 44.1k:
990k: 12, 0, 18, 32,  7, 23, 0
660k: 12, 0, 16, 32, 10, 31, 0
330k: 10, 0, 14, 26, 12, 31, 0

96k / 88.2k:
990k: 16, 0, 18, 32,  7, 23, 0
660k: 13, 0, 16, 32, 10, 31, 0
330k: 10, 0, 14, 26, 12, 31, 0</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="575" />
        <source>44.1/48 kHz are 1FS and LDAC allows up to 12 bands; 88.2/96 kHz are 2FS and allow up to 16 bands. Other gradient fields are the same.</source>
        <translation>44.1/48 kHz 屬於 1FS，LDAC 最多允許 12 bands；88.2/96 kHz 屬於 2FS，最多允許 16 bands。其他 gradient 欄位相同。</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="582" />
        <source>Audio Files (*.ldac *.wav *.flac *.m4a *.aac *.mp3 *.ogg *.opus);;All Files (*)</source>
        <translation>音訊檔 (*.ldac *.wav *.flac *.m4a *.aac *.mp3 *.ogg *.opus);;所有檔案 (*)</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="602" />
        <source>Select Output Path</source>
        <translation>選擇輸出路徑</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="615" />
        <source>No audio file selected</source>
        <translation>尚未選擇音檔</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="618" />
        <source>Input is LDAC: it can be decoded to WAV/FLAC</source>
        <translation>輸入為 LDAC：可解碼為 WAV/FLAC</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="620" />
        <source>Input is regular audio: it will be converted to PCM before LDAC encoding</source>
        <translation>輸入為一般音訊：會先轉 PCM，再編碼為 LDAC</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="680" />
        <source>Input type mismatch</source>
        <translation>輸入類型不符</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="681" />
        <source>LDAC round-trip test requires a regular audio file and does not accept .ldac input.</source>
        <translation>LDAC 往返測試需要一般音訊檔，不接受 .ldac。</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="692" />
        <source>File not found</source>
        <translation>找不到檔案</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="692" />
        <source>Please select an existing audio file first.</source>
        <translation>請先選擇存在的音檔。</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="701" />
        <source>Missing output path</source>
        <translation>缺少輸出路徑</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="701" />
        <source>Please select an output path first.</source>
        <translation>請先選擇輸出路徑。</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="745" />
        <source>Done: {path}</source>
        <translation>完成：{path}</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="746" />
        <source>Done</source>
        <translation>完成</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="746" />
        <source>Output completed:
{path}</source>
        <translation>輸出完成：
{path}</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="751" />
        <source>Failed</source>
        <translation>失敗</translation>
    </message>
</context>
</TS>