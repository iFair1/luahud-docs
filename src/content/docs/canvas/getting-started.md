---
title: Drawing with Canvases
description: Build a HUD panel with shapes, text, and explicit coordinates in LuaHUD.
sidebar:
  order: 10
---

Sections arrange rows automatically. A **canvas** gives you a fixed-size drawing area where you position every element yourself. Use one for panels, meters, charts, or overlapping graphics. Both systems can coexist in the same profile.

## Your first panel

```lua
lh.on("tick", function()
    lh.canvas({
        width = 160,
        height = 44,
        anchor = "topRight",
        offsetX = 8,
        offsetY = 8,
    })
    lh.drawRect(0, 0, 160, 44, {
        color = "#CC18202C",
        radius = 6,
        borderWidth = 1,
        borderColor = "#607080",
    })
    lh.drawItem("minecraft:compass", { x = 8, y = 14 })
    lh.draw("My HUD", { x = 30, y = 8, shadow = false })
    lh.draw("FPS: " .. lh.perf.fps, { x = 30, y = 24 })
    lh.endCanvas()
end)
```

`width` and `height` are required positive dimensions in local GUI units. Inside the canvas, `(0, 0)` is the top-left corner; X increases rightward and Y downward. These are GUI coordinates, so Minecraft's GUI scale affects their apparent size.

Commands paint in the order you call them. Draw a panel background first, then its text and icons. Nothing advances a cursor: two `lh.draw()` calls without coordinates overlap at `(0, 0)`.

## Selecting and closing a canvas

`lh.canvas(options)` selects a new canvas. `lh.endCanvas()` closes it and resumes the previous section, including its row and defaults. Starting another canvas or calling `lh.section()` also closes the selected canvas. Canvases cannot nest; a second `lh.canvas()` starts a sibling. Calling `lh.endCanvas()` without a selected canvas raises an error.

Inside a canvas, use `lh.draw()` for text. `lh.drawln()`, `lh.newline()`, and `{ newLine = true }` are errors because there are no automatic rows.

Text starts with the canvas's `textColor` and `shadow` defaults. Canvas content has a transparent default background and no inherited section icon scale. Set individual element sizes explicitly.

## Position, clipping, and lifetime

A standalone canvas uses the same `anchor`, `offsetX`, and `offsetY` rules as [sections](/guides/sections/). Positive offsets move inward from screen edges. The fixed canvas dimensions determine its anchored size; drawing outside them does not resize it.

`clip` defaults to `true`, hiding anything outside the bounds. Use `clip = false` to allow overflow. `scale` defaults to `1` and scales the whole canvas, including its bounds and contents.

Standalone canvases support `id`, `duration`, and `visible`. Without a duration, output is replaced when its callback next runs. A positive duration keeps it for that many seconds. IDs share the same replacement namespace as sections, so use distinct names for unrelated panels. `visible = false` with an ID removes the previous output with that ID. See [Drawing Lifetime](/guides/drawing-lifetime/) for callback ownership and clocks.

Continue with [shapes and text](/canvas/shapes-and-text/), [textures](/canvas/textures/), or [canvases inside sections](/canvas/inline-canvases/). The full placement fields are listed in [CanvasOptions](/options/canvas-options/).
