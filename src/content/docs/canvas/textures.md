---
title: Canvas Textures
description: Resize textures, crop source regions, and draw nine-slice panels in a canvas.
sidebar:
  order: 30
---

`lh.drawTexture(path, options)` uses [TextureOptions](/options/texture-options/). Inside a canvas you can set a target `width` and `height`, crop a source `region`, or stretch a panel with `nineSlice`. Paths refer to existing resource textures, including textures supplied by resource packs.

## Resize and crop

```lua
lh.on("reload", function()
    lh.canvas({ width = 80, height = 40 })
    lh.drawTexture("minecraft:textures/block/stone.png", {
        x = 4, y = 4,
        width = 64, height = 32,
        region = { x = 0, y = 0, width = 8, height = 8 },
    })
    lh.endCanvas()
end)
```

Source region coordinates and dimensions are integer **image pixels**, while the target dimensions use local GUI units. A region must fit entirely inside the source image and have positive dimensions. Omitted target dimensions default to the source region's size, or the full image size when no region is given. The draw call's `scale` applies to the target size too.

## Nine-slice panels

Use `nineSlice = { left = 4, right = 4, top = 4, bottom = 4 }` to preserve the borders of a panel texture while stretching its center to the target size. Supply a texture designed for this purpose and set `width` and `height` to the desired panel dimensions.

Border sizes are non-negative source pixels. Left plus right must be less than the source width, and top plus bottom less than the source height, leaving a nonempty center. `region` and `nineSlice` cannot be combined.

`width`, `height`, `region`, and `nineSlice` require a canvas. For ordinary section textures, use the existing icon scale and row layout described in [Items, Textures, and Entities](/guides/icons-and-models/).
