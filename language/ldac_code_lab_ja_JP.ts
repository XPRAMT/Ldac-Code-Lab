<?xml version='1.0' encoding='utf-8'?>
<TS version="2.1" language="ja_JP">
<context>
    <name>LdacJob</name>
    <message>
        <location filename="../ldac_gui.py" line="126" />
        <location filename="../ldac_gui.py" line="168" />
        <location filename="../ldac_gui.py" line="252" />
        <source>ffmpeg not found: {path}</source>
        <translation>ffmpeg が見つかりません: {path}</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="128" />
        <location filename="../ldac_gui.py" line="170" />
        <source>LDAC encoder not found: {path}</source>
        <translation>LDAC エンコーダーが見つかりません: {path}</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="155" />
        <location filename="../ldac_gui.py" line="202" />
        <source>Decode input to 32-bit float stereo PCM...</source>
        <translation>入力を 32-bit float ステレオ PCM にデコードしています...</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="158" />
        <location filename="../ldac_gui.py" line="205" />
        <source>ffmpeg did not produce PCM data; input may be unreadable or corrupted.</source>
        <translation>ffmpeg が PCM データを生成しませんでした。入力を読めないか破損している可能性があります。</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="161" />
        <source>Encode LDAC at {bitrate} kbps...</source>
        <translation>{bitrate} kbps で LDAC エンコードしています...</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="172" />
        <location filename="../ldac_gui.py" line="254" />
        <source>LDAC decoder not found: {path}</source>
        <translation>LDAC デコーダーが見つかりません: {path}</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="207" />
        <source>Encode temporary LDAC at {bitrate} kbps...</source>
        <translation>一時 LDAC を {bitrate} kbps でエンコードしています...</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="210" />
        <source>Decode temporary LDAC to 24-bit PCM WAV...</source>
        <translation>一時 LDAC を 24-bit PCM WAV にデコードしています...</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="228" />
        <source>Save round-trip output as FLAC...</source>
        <translation>往復テスト出力を FLAC として保存しています...</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="260" />
        <source>Decode LDAC to 24-bit PCM WAV...</source>
        <translation>LDAC を 24-bit PCM WAV にデコードしています...</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="278" />
        <source>Convert decoded PCM to FLAC...</source>
        <translation>デコードした PCM を FLAC に変換しています...</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <location filename="../ldac_gui.py" line="543" />
        <source>Base bands count; controls how many frequency bands are encoded. At 48 kHz LDAC clamps this internally, and too high a value may fail initialization.</source>
        <translation>Base bands count; controls how many frequency bands are encoded. At 48 kHz LDAC clamps this internally, and too high a value may fail initialization.</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="544" />
        <source>Gradient mode; controls how the bit allocation gradient curve is interpreted. Mode 0 uses the full qu/offset range and is useful for manual experiments.</source>
        <translation>Gradient mode; controls how the bit allocation gradient curve is interpreted. Mode 0 uses the full qu/offset range and is useful for manual experiments.</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="545" />
        <source>Gradient start quantization unit; lower values make the allocation curve affect lower and mid frequencies earlier.</source>
        <translation>Gradient start quantization unit; lower values make the allocation curve affect lower and mid frequencies earlier.</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="546" />
        <source>Gradient end quantization unit; higher values extend the allocation curve into higher-frequency units.</source>
        <translation>Gradient end quantization unit; higher values extend the allocation curve into higher-frequency units.</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="547" />
        <source>Start offset; affects bit retention near the beginning of the gradient. Lower values usually preserve more bits there.</source>
        <translation>Start offset; affects bit retention near the beginning of the gradient. Lower values usually preserve more bits there.</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="548" />
        <source>End offset; affects high-frequency bit retention. Lower values usually preserve more high-frequency bits but consume budget from other bands.</source>
        <translation>End offset; affects high-frequency bit retention. Lower values usually preserve more high-frequency bits but consume budget from other bands.</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="549" />
        <source>Advanced bit allocation control flag. Original tables mostly use 0; enabling it may change allocation behavior and should be verified by testing.</source>
        <translation>Advanced bit allocation control flag. Original tables mostly use 0; enabling it may change allocation behavior and should be verified by testing.</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="523" />
        <source>LDAC Codec Lab</source>
        <translation>LDAC Codec Lab</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="524" />
        <source>Language</source>
        <translation>言語</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="525" />
        <source>System Default</source>
        <translation>システム既定</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="528" />
        <location filename="../ldac_gui.py" line="580" />
        <source>Select Audio</source>
        <translation>音声ファイルを選択</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="529" />
        <source>Select Output</source>
        <translation>出力を選択</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="533" />
        <source>Custom</source>
        <translation>カスタム</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="534" />
        <source>Auto / keep source</source>
        <translation>自動 / ソースを維持</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="535" />
        <source>Bitrate</source>
        <translation>ビットレート</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="536" />
        <source>Custom bitrate</source>
        <translation>カスタムビットレート</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="537" />
        <source>PCM sample rate</source>
        <translation>PCM サンプルレート</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="538" />
        <source>Output format</source>
        <translation>出力形式</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="539" />
        <source>Encode Settings</source>
        <translation>エンコード設定</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="540" />
        <source>Decode Settings</source>
        <translation>デコード設定</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="541" />
        <source>Custom LDAC Gradient</source>
        <translation>カスタム LDAC Gradient</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="554" />
        <source>Start</source>
        <translation>開始</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="555" />
        <source>LDAC Round-Trip Test</source>
        <translation>LDAC 往復テスト</translation>
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
        <translation>LDAC 標準プリセットパラメータ
項目: nbands, mode, quL, quH, ofstL, ofstH, abc

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
        <translation>44.1/48 kHz は 1FS で、LDAC は最大 12 bands までです。88.2/96 kHz は 2FS で、最大 16 bands までです。他の gradient 項目は同じです。</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="582" />
        <source>Audio Files (*.ldac *.wav *.flac *.m4a *.aac *.mp3 *.ogg *.opus);;All Files (*)</source>
        <translation>音声ファイル (*.ldac *.wav *.flac *.m4a *.aac *.mp3 *.ogg *.opus);;すべてのファイル (*)</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="602" />
        <source>Select Output Path</source>
        <translation>出力先を選択</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="615" />
        <source>No audio file selected</source>
        <translation>音声ファイルが選択されていません</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="618" />
        <source>Input is LDAC: it can be decoded to WAV/FLAC</source>
        <translation>入力は LDAC です: WAV/FLAC にデコードできます</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="620" />
        <source>Input is regular audio: it will be converted to PCM before LDAC encoding</source>
        <translation>入力は通常の音声です: LDAC エンコード前に PCM に変換されます</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="680" />
        <source>Input type mismatch</source>
        <translation>入力形式が一致しません</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="681" />
        <source>LDAC round-trip test requires a regular audio file and does not accept .ldac input.</source>
        <translation>LDAC 往復テストには通常の音声ファイルが必要です。.ldac 入力は使用できません。</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="692" />
        <source>File not found</source>
        <translation>ファイルが見つかりません</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="692" />
        <source>Please select an existing audio file first.</source>
        <translation>先に存在する音声ファイルを選択してください。</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="701" />
        <source>Missing output path</source>
        <translation>出力先がありません</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="701" />
        <source>Please select an output path first.</source>
        <translation>先に出力先を選択してください。</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="745" />
        <source>Done: {path}</source>
        <translation>完了: {path}</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="746" />
        <source>Done</source>
        <translation>完了</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="746" />
        <source>Output completed:
{path}</source>
        <translation>出力が完了しました:
{path}</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="751" />
        <source>Failed</source>
        <translation>失敗</translation>
    </message>
</context>
</TS>