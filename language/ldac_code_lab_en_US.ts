<?xml version='1.0' encoding='utf-8'?>
<TS version="2.1" language="en_US">
<context>
    <name>LdacJob</name>
    <message>
        <location filename="../ldac_gui.py" line="126" />
        <location filename="../ldac_gui.py" line="168" />
        <location filename="../ldac_gui.py" line="252" />
        <source>ffmpeg not found: {path}</source>
        <translation>ffmpeg not found: {path}</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="128" />
        <location filename="../ldac_gui.py" line="170" />
        <source>LDAC encoder not found: {path}</source>
        <translation>LDAC encoder not found: {path}</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="155" />
        <location filename="../ldac_gui.py" line="202" />
        <source>Decode input to 32-bit float stereo PCM...</source>
        <translation>Decode input to 32-bit float stereo PCM...</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="158" />
        <location filename="../ldac_gui.py" line="205" />
        <source>ffmpeg did not produce PCM data; input may be unreadable or corrupted.</source>
        <translation>ffmpeg did not produce PCM data; input may be unreadable or corrupted.</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="161" />
        <source>Encode LDAC at {bitrate} kbps...</source>
        <translation>Encode LDAC at {bitrate} kbps...</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="172" />
        <location filename="../ldac_gui.py" line="254" />
        <source>LDAC decoder not found: {path}</source>
        <translation>LDAC decoder not found: {path}</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="207" />
        <source>Encode temporary LDAC at {bitrate} kbps...</source>
        <translation>Encode temporary LDAC at {bitrate} kbps...</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="210" />
        <source>Decode temporary LDAC to 24-bit PCM WAV...</source>
        <translation>Decode temporary LDAC to 24-bit PCM WAV...</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="228" />
        <source>Save round-trip output as FLAC...</source>
        <translation>Save round-trip output as FLAC...</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="260" />
        <source>Decode LDAC to 24-bit PCM WAV...</source>
        <translation>Decode LDAC to 24-bit PCM WAV...</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="278" />
        <source>Convert decoded PCM to FLAC...</source>
        <translation>Convert decoded PCM to FLAC...</translation>
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
        <translation>Language</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="525" />
        <source>System Default</source>
        <translation>System Default</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="528" />
        <location filename="../ldac_gui.py" line="580" />
        <source>Select Audio</source>
        <translation>Select Audio</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="529" />
        <source>Select Output</source>
        <translation>Select Output</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="533" />
        <source>Custom</source>
        <translation>Custom</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="534" />
        <source>Auto / keep source</source>
        <translation>Auto / keep source</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="535" />
        <source>Bitrate</source>
        <translation>Bitrate</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="536" />
        <source>Custom bitrate</source>
        <translation>Custom bitrate</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="537" />
        <source>PCM sample rate</source>
        <translation>PCM sample rate</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="538" />
        <source>Output format</source>
        <translation>Output format</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="539" />
        <source>Encode Settings</source>
        <translation>Encode Settings</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="540" />
        <source>Decode Settings</source>
        <translation>Decode Settings</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="541" />
        <source>Custom LDAC Gradient</source>
        <translation>Custom LDAC Gradient</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="554" />
        <source>Start</source>
        <translation>Start</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="555" />
        <source>LDAC Round-Trip Test</source>
        <translation>LDAC Round-Trip Test</translation>
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
        <translation>Original LDAC preset parameters
Fields: nbands, mode, quL, quH, ofstL, ofstH, abc

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
        <translation>44.1/48 kHz are 1FS and LDAC allows up to 12 bands; 88.2/96 kHz are 2FS and allow up to 16 bands. Other gradient fields are the same.</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="582" />
        <source>Audio Files (*.ldac *.wav *.flac *.m4a *.aac *.mp3 *.ogg *.opus);;All Files (*)</source>
        <translation>Audio Files (*.ldac *.wav *.flac *.m4a *.aac *.mp3 *.ogg *.opus);;All Files (*)</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="602" />
        <source>Select Output Path</source>
        <translation>Select Output Path</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="615" />
        <source>No audio file selected</source>
        <translation>No audio file selected</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="618" />
        <source>Input is LDAC: it can be decoded to WAV/FLAC</source>
        <translation>Input is LDAC: it can be decoded to WAV/FLAC</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="620" />
        <source>Input is regular audio: it will be converted to PCM before LDAC encoding</source>
        <translation>Input is regular audio: it will be converted to PCM before LDAC encoding</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="680" />
        <source>Input type mismatch</source>
        <translation>Input type mismatch</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="681" />
        <source>LDAC round-trip test requires a regular audio file and does not accept .ldac input.</source>
        <translation>LDAC round-trip test requires a regular audio file and does not accept .ldac input.</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="692" />
        <source>File not found</source>
        <translation>File not found</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="692" />
        <source>Please select an existing audio file first.</source>
        <translation>Please select an existing audio file first.</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="701" />
        <source>Missing output path</source>
        <translation>Missing output path</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="701" />
        <source>Please select an output path first.</source>
        <translation>Please select an output path first.</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="745" />
        <source>Done: {path}</source>
        <translation>Done: {path}</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="746" />
        <source>Done</source>
        <translation>Done</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="746" />
        <source>Output completed:
{path}</source>
        <translation>Output completed:
{path}</translation>
    </message>
    <message>
        <location filename="../ldac_gui.py" line="751" />
        <source>Failed</source>
        <translation>Failed</translation>
    </message>
</context>
</TS>