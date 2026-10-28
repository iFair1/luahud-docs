---
title: Sections and Layout
description: Arrange your LuaHUD layout with sections, screen anchors, offsets, and rows. Control text and icon alignment, spacing, and drawing direction.
sidebar:
  order: 10
---

A section is a group of rows with its own position and drawing defaults. Call `lh.section(options)` to start one. All following draw calls belong to it until you start another section or the [event callback](todo) ends.
```lua
lh.section({
    anchor = "topLeft",
    offsetX = 100,
    offsetY = 50,
})
lh.drawln("Hiii")
lh.drawln("Text 2")

lh.section({
    anchor = "topRight",
    rowAlign = "center",
    scale = 2
})
lh.drawln("Hii!")
lh.drawln("Text 2 but on ToPrİgHt")
```

These are two independent blocks. You don't need to close a section, and `lh.section()` starts with fresh defaults and doesn't inherit the options of the previous section.

### Anchors and Offsets
The anchor decides which screen edge the sectoin sits against:
|Top|Bottom|
|-|-|
|`topLeft`|`bottomLeft`|
|`topCenter`|`bottomCenter`|
|`topRight`|`bottomRight`|

For left and right anchors, a positive `offsetX` moves the section **inward** from that edge. For center anchors, positive `offsetX` moves it right and negative moves it left. A positive `offsetY` moves it inward from the top or bottom edge.

A `bottomRight` section with `offsetX = 8, offsetY = 8` sits eight GUI units from the right and bottom. You don't have to subtract its width from the screen width yourself. Minecraft's GUI scale affects the apperent size of these units.
:::tip
Get actual gui scale with `lh.display.scale` instead of trying to get it from settings.
:::

Sections don't automatically avoid each other or Minecraft's own HUD. They are rendered completely unaware of each other.

## Rows and elements
A section contains **rows**, and each row contains **elements** such as text and icons.
```lua
lh.section({
    inlineSpacing = 3
})
lh.drawItem("minecraft:compass")
lh.drawln("Home is this way. Probably.")
lh.drawln("Another row")
```
The icon and first text share a row. `drawln()` finishes that row. For icons, you should `{ newLine = true }` instead of calling the function with a `ln` suffix, in order to do the same thing.

By default, rows are tall enough for their tallest element (`rowHeight = "auto"`). `lineSpacing` adds vertical space around rows, and `inlineSpacing` adds space between visible elements.

Start with automatic height when mixing text and icons. A fixed `rowHeight` is useful when you want uniform rows, but can be too small for large icons.

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
Alignment doesn't reverse the draw order. To change that, use `inlineDirection = "rightToLeft` or `rowDirection = "bottomToTop"`. The default are `"leftToRight"` and `"topToBottom"`, even with a right or bottom anchor.

Each profile loads and each callback invocation begins with default settings. Put your lh.section() call inside the callback that draws the content. Setting it once at the top level won't style future callbacks.

## Theming
Let's say you want your texts be in color `#FF7DA2DE` and shadowless.

```lua
lh.section({
    textColor = "#FF7DA2DE", -- "7DA2DE" and 0xFF7DA2DE is ok.
    shadow = false
})
```
Texts after this will inherit this traits even if you don't write the options to every single one of them like below.
```lua
lh.drawln("text", { textColor = "#FF7DA2DE", shadow = false })
lh.drawln("second text", { textColor = "#FF7DA2DE", shadow = false })
```
