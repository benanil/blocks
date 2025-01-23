# Blocks

![](image.png)

Tiny Minecraft clone in C and GLSL using the new SDL3 GPU API

### Features

- Procedural world generation
- Blocks and plants
- Transparent blocks
- Directional shadows
- SSAO approximation
- Persistent worlds

### Building

#### Windows

Install the [Vulkan SDK](https://www.lunarg.com/vulkan-sdk/) for glslc

```bash
git clone https://github.com/jsoulier/blocks --recurse-submodules
cd blocks
mkdir build
cd build
cmake ..
cmake --build . --parallel 8 --config Release
cd bin
./blocks.exe
```

#### Linux

```bash
sudo apt install glslc
```

```bash
git clone https://github.com/jsoulier/blocks --recurse-submodules
cd blocks
mkdir build
cd build
cmake .. -DCMAKE_BUILD_TYPE=Release
cmake --build . --parallel 8
cd bin
./blocks
```

### Controls
- `WASDEQ` to move
- `Escape` to unfocus
- `LClick` to break a block
- `RClick` to place a block
- `B` to toggle blocks
- `F11` to toggle fullscreen
- `LControl` to move quickly
- `LShift` to move slowly