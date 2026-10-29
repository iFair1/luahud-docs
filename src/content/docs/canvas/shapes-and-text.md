---
title: Shapes and Text
description: Draw rectangles, gradients, lines, circles, and arcs; measure and transform canvas text.
sidebar:
  order: 20
---

Select a [canvas](/canvas/getting-started/) before calling any shape function. All positions and sizes below use its local GUI units. Colors accept `"#RRGGBB"`, `"#AARRGGBB"`, or ARGB integers.

## Shape functions

| Function | Options and defaults |
| --- | --- |
| `lh.drawRect(x, y, width, height, options)` | `color` and `borderColor` default to white; `radius` and inset `borderWidth` default to `0`. |
| `lh.drawGradient(x, y, width, height, options)` | Required `fromColor` and `toColor`; `direction` defaults to `"vertical"` (top to bottom), or use `"horizontal"` (left to right). |
| `lh.drawLine(x1, y1, x2, y2, options)` | White `color`, `thickness = 1`. |
| `lh.drawCircle(cx, cy, radius, options)` | White `color`; filled by default. Set `thickness` for an outline. |
| `lh.drawArc(cx, cy, radius, startAngle, sweepAngle, options)` | White `color`, `thickness = 1`. Angles are degrees, starting at the right; positive sweeps go clockwise. |

Only gradient options are required. Dimensions, radii, and stroke widths must be non-negative. Canvas dimensions themselves must be greater than zero. Shape coordinates and numeric options must be finite and within `-1000000` to `1000000`.

```lua
lh.on("tick", function()
    lh.canvas({ width = 180, height = 70, offsetX = 8, offsetY = 8 })
    lh.drawGradient(0, 0, 180, 70, {
        fromColor = "#DD243048",
        toColor = "#DD101820",
    })
    lh.drawLine(8, 30, 172, 30, { color = "#607080" })
    lh.drawCircle(20, 50, 10, { color = "#80CBC4", thickness = 2 })
    lh.drawArc(50, 50, 10, -90, 270, { color = "#FFCC80", thickness = 3 })
    lh.endCanvas()
end)
```

## Measure before drawing

`lh.measureText(value, options)` returns a [TextDimensions](/api/types/TextDimensions/) table with `width` and `height`. It works without selecting a canvas, converts the value to text, and excludes shadow. Its optional `scale` defaults to `1` and must be positive.

Use the same scale when measuring and drawing:

```lua
lh.on("tick", function()
    local label = "FPS: " .. lh.perf.fps
    local size = lh.measureText(label, { scale = 1.5 })
    lh.canvas({ width = 180, height = 32 })
    lh.draw(label, {
        x = (180 - size.width) / 2,
        y = (32 - size.height) / 2,
        scale = 1.5,
        shadow = false,
    })
    lh.endCanvas()
end)
```

## Transform text, icons, and textures

Inside a canvas, `lh.draw`, `lh.drawItem`, `lh.drawStack`, `lh.drawEntity`, and `lh.drawTexture` accept `x`, `y`, `scale`, `rotation`, `originX`, and `originY`. Rotation is clockwise in degrees around an element-local pivot, defaulting to `(0, 0)`. `offsetX` and `offsetY` add to the position. Options apply only to that draw call; they do not transform later shape calls.

For example, a normal item icon is 12 by 12 units. `{ x = 40, y = 20, rotation = 45, originX = 6, originY = 6 }` rotates it around its center. Canvas `scale` then scales the whole result.

Outside a canvas, position and rotation fields are errors. Per-call text `scale` also requires a canvas; scale an ordinary section through its section options instead.
