---
title: Sections and Layout
description: Arrange your LuaHUD layout with sections, screen anchors, offsets, and rows. Control text and icon alignment, spacing, and drawing direction.
sidebar:
  order: 10
---

A section is a group of rows with its own position and drawing defaults. Call `lh.section(options)` to start one. All following calls belong to it unless you satrt anoter section or the callback ends.

```lua
lh.section({
    anchor = "topLeft",
    offsetX = 100,
    offsetY = 50,
})
lh.drawln("Hiii")
lh.drawln("Text 2")

-- An independent section starts here
lh.section({
    anchor = "topRight",
    rowAlign = "center",
    scale = 2
})
lh.drawln("Hii!")
lh.drawln("Text 2 but on ToPrİgHt")
```

These are two independent blocks. They don't care about each other and may overlap. You don't need to close one to start the other, but you can use `lh.section()` to return the defaults.

### Anchors and Offsets
The anchor decides which screen edge the section sits against:
|Top|Bottom|
|-|-|
|`topLeft`|`bottomLeft`|
|`topCenter`|`bottomCenter`|
|`topRight`|`bottomRight`|

For left and right anchors, a positive `offsetX` moves the section **inward** from that edge. For center anchors, positive `offsetX` moves it right and negative moves it left. A positive `offsetY` moves it inward from the top or bottom edge.

A `bottomRight` section with `offsetX = 8, offsetY = 8` sits eight GUI units from the right and bottom. You don't have to subtract its width from the screen width yourself. Minecraft's GUI scale affects the apparent size of these units.
:::tip
Get the actual GUI scale with `lh.display.scale` instead of trying to get it from settings.
:::

## Rows and elements
Sections contains **rows**, and rows contains **elements** such as text and icons.

```lua
lh.section({
    inlineSpacing = 3
})
lh.drawItem("minecraft:compass")
lh.drawln("Home is this way, Probably.")
lh.drawln("Another row")
```
The icon and the first text share a row. `lh.drawln()` finishes that row. For icons, you should pass `{ newLine = true }` instead of trying to do `lh.drawSomethingln()`.

By default, rows are tall enough for their tallest element (`rowHeight = "auto"`). `lineSpacing` adds vertical space around rows, and `inlineSpacing` adds space between visible elements.

A fixed `rowHeight` is only good, if you want to manage the rows manually.

## Alignment and direction
`rowAlign` aligns shorter rows within the section's widest row. Its default follows the anchor: left, center, or right. `inlineAlign` aligns elements vertically within a row, and defaults to `"center"`.
```lua
lh.on("tick", function()
    lh.section({
        anchor = "topRight",
        offsetX = 4,
        rowAlign = "right",
        inlineAlign = "center",
        inlineSpacing = 3,
    })
    lh.drawItem("minecraft:diamond")
    lh.drawln("A longer first row")
    lh.drawln("Short row")
end)
```
Alignment doesn't reverse the draw order. To change that, use `inlineDirection = "rightToLeft"` or `rowDirection = "bottomToTop"`. The defaults are `"leftToRight"` and `"topToBottom"`, even with a right or bottom anchor.

Each profile load and each callback invocation begins with default settings. Put your `lh.section()` call inside the callback that draws the content. Setting it once at the top level won't style future callbacks.

## Theming
Let's say you want your text to use the color `#FF7DA2DE` and shadowless.

```lua
lh.section({
    textColor = "#FF7DA2DE", -- "#7DA2DE" and 0xFF7DA2DE also work.
    shadow = false
})
```
Following text draws in the same section inherit these settings. This avoids repeating the options on each call, as in the equivalent example below.
```lua
lh.drawln("text", { textColor = "#FF7DA2DE", shadow = false })
lh.drawln("second text", { textColor = "#FF7DA2DE", shadow = false })
```

## Canvas drawing

For fixed-size panels with explicit coordinates, see [Drawing with Canvases](/canvas/getting-started/).
