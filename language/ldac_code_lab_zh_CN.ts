<?xml version='1.0' encoding='utf-8'?>
<TS version="2.1" language="zh_CN">
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
        <translation>找不到 LDAC 編码器：{path}</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="155" />
        <location filename="../ldac_gui.py" line="202" />
        <source>Decode input to 32-bit float stereo PCM...</source>
        <translation>将输入解码为 32-bit float 立体声 PCM...</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="158" />
        <location filename="../ldac_gui.py" line="205" />
        <source>ffmpeg did not produce PCM data; input may be unreadable or corrupted.</source>
        <translation>ffmpeg 沒有產生 PCM 資料；输入可能無法读取或已损坏。</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="161" />
        <source>Encode LDAC at {bitrate} kbps...</source>
        <translation>以 {bitrate} kbps 編码 LDAC...</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="172" />
        <location filename="../ldac_gui.py" line="254" />
        <source>LDAC decoder not found: {path}</source>
        <translation>找不到 LDAC 解码器：{path}</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="207" />
        <source>Encode temporary LDAC at {bitrate} kbps...</source>
        <translation>以 {bitrate} kbps 編码暂存 LDAC...</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="210" />
        <source>Decode temporary LDAC to 24-bit PCM WAV...</source>
        <translation>将暂存 LDAC 解码为 24-bit PCM WAV...</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="228" />
        <source>Save round-trip output as FLAC...</source>
        <translation>将往返測試输出储存为 FLAC...</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="260" />
        <source>Decode LDAC to 24-bit PCM WAV...</source>
        <translation>将 LDAC 解码为 24-bit PCM WAV...</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="278" />
        <source>Convert decoded PCM to FLAC...</source>
        <translation>将解码後 PCM 转为 FLAC...</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <location filename="../ldac_gui.py" line="543" />
        <source>Base bands count; controls how many frequency bands are encoded. At 48 kHz LDAC clamps this internally, and too high a value may fail initialization.</source>
        <translation>Base bands 数量；决定编码涵盖到多少频带。48 kHz 会被 LDAC 内部上限限制，过高可能初始化失败。</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="544" />
        <source>Gradient mode; controls how the bit allocation gradient curve is interpreted. Mode 0 uses the full qu/offset range and is useful for manual experiments.</source>
        <translation>Gradient 模式；控制 bit allocation 梯度曲线的解读方式。mode 0 使用完整 qu/offset 范围，较适合手动实验。</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="545" />
        <source>Gradient start quantization unit; lower values make the allocation curve affect lower and mid frequencies earlier.</source>
        <translation>Gradient 起始 quantization unit；数值越低，分配曲线越早影响低/中频。</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="546" />
        <source>Gradient end quantization unit; higher values extend the allocation curve into higher-frequency units.</source>
        <translation>Gradient 结束 quantization unit；数值越高，分配曲线会延伸到更高频的量化单元。</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="547" />
        <source>Start offset; affects bit retention near the beginning of the gradient. Lower values usually preserve more bits there.</source>
        <translation>起始 offset；影响梯度前段的 bit 保留倾向。较小通常让该区域惩罚较少、保留较多。</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="548" />
        <source>End offset; affects high-frequency bit retention. Lower values usually preserve more high-frequency bits but consume budget from other bands.</source>
        <translation>结束 offset；影响高频端 bit 保留倾向。较小通常让高频保留更多，但会消耗其他频段的 bit budget。</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="549" />
        <source>Advanced bit allocation control flag. Original tables mostly use 0; enabling it may change allocation behavior and should be verified by testing.</source>
        <translation>Advanced bit allocation control 标志；原始表多为 0。开启可能改变 bit allocation 行为，需用实测确认。</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="523" />
        <source>LDAC Codec Lab</source>
        <translation>LDAC Codec Lab</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="524" />
        <source>Language</source>
        <translation>语言</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="525" />
        <source>System Default</source>
        <translation>系统默认</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="528" />
        <location filename="../ldac_gui.py" line="580" />
        <source>Select Audio</source>
        <translation>选择音频</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="529" />
        <source>Select Output</source>
        <translation>选择输出</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="533" />
        <source>Custom</source>
        <translation>自定义</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="534" />
        <source>Auto / keep source</source>
        <translation>自动 / 保持来源</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="535" />
        <source>Bitrate</source>
        <translation>码率</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="536" />
        <source>Custom bitrate</source>
        <translation>自定义码率</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="537" />
        <source>PCM sample rate</source>
        <translation>PCM 采样率</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="538" />
        <source>Output format</source>
        <translation>输出格式</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="539" />
        <source>Encode Settings</source>
        <translation>编码设置</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="540" />
        <source>Decode Settings</source>
        <translation>解码设置</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="541" />
        <source>Custom LDAC Gradient</source>
        <translation>自定义 LDAC Gradient</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="554" />
        <source>Start</source>
        <translation>开始</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="555" />
        <source>LDAC Round-Trip Test</source>
        <translation>LDAC 往返测试</translation>
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
        <translation>原始 LDAC 預设参数
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
        <translation>音讯档 (*.ldac *.wav *.flac *.m4a *.aac *.mp3 *.ogg *.opus);;所有档案 (*)</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="602" />
        <source>Select Output Path</source>
        <translation>选擇输出路径</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="615" />
        <source>No audio file selected</source>
        <translation>尚未选擇音档</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="618" />
        <source>Input is LDAC: it can be decoded to WAV/FLAC</source>
        <translation>输入为 LDAC：可解码为 WAV/FLAC</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="620" />
        <source>Input is regular audio: it will be converted to PCM before LDAC encoding</source>
        <translation>输入为一般音讯：会先转 PCM，再編码为 LDAC</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="680" />
        <source>Input type mismatch</source>
        <translation>输入類型不符</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="681" />
        <source>LDAC round-trip test requires a regular audio file and does not accept .ldac input.</source>
        <translation>LDAC 往返測試需要一般音讯档，不接受 .ldac。</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="692" />
        <source>File not found</source>
        <translation>找不到档案</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="692" />
        <source>Please select an existing audio file first.</source>
        <translation>請先选擇存在的音档。</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="701" />
        <source>Missing output path</source>
        <translation>缺少输出路径</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="701" />
        <source>Please select an output path first.</source>
        <translation>請先选擇输出路径。</translation>
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
        <translation>输出完成：
{path}</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="751" />
        <source>Failed</source>
        <translation>失敗</translation>
    </message>
</context>
</TS>