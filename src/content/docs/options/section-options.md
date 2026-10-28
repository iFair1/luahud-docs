---
title: SectionOptions
description: Layout, lifetime, colors, and scale defaults for a LuaHUD drawing section.
---

Options for `lh.section(options)`. Every field is optional. Each call starts with fresh defaults; it does not inherit the previous section’s options. Calling `lh.section()` is equivalent to starting with an empty table.

Colors accept `"#RRGGBB"`, `"#AARRGGBB"`, or an ARGB integer. Six-digit strings are opaque; integers include alpha. See [Colors and Scale](/guides/colors-and-scale/).

## Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Default: omitted. Non-blank shared section ID; replaces an existing section with the same ID, including one created by another profile. |
| `visible` | `boolean` | Default: `true`. With `false`, removes the section with this ID without starting a new one. Stop drawing after this call when hiding output. |
| `duration` | `number` | Default: omitted. Finite, positive lifetime in seconds. Omitted sections last until the owning callback runs again. |
| `anchor` | `string` | Default: `"topLeft"`. One of `"topLeft"`, `"topCenter"`, `"topRight"`, `"bottomLeft"`, `"bottomCenter"`, `"bottomRight"`. |
| `offsetX` | `integer` | Default: `0`. Inward horizontal inset for left/right anchors; signed horizontal shift for center anchors. |
| `offsetY` | `integer` | Default: `2`. Inward vertical inset from the top or bottom edge. |
| `rowAlign` | `string` | Default: `"left"`, `"center"`, or `"right"`, matching the anchor. Aligns rows within the widest row. |
| `inlineAlign` | `string` | Default: `"center"`. Vertical alignment within a row: `"top"`, `"center"`, or `"bottom"`. |
| `inlineDirection` | `string` | Default: `"leftToRight"`. Visual element order: `"leftToRight"` or `"rightToLeft"`. |
| `rowDirection` | `string` | Default: `"topToBottom"`. Visual row order: `"topToBottom"` or `"bottomToTop"`. |
| `textColor` | `string` or `integer` | Default: `"#FFFFFFFF"` (white). Default text color for the section. |
| `backgroundColor` | `string` or `integer` | Default: `"#80000000"` (translucent black). Default element background color. |
| `shadow` | `boolean` | Default: `true`. Default text shadow. |
| `scale` | `number` | Default: `1`. Scales the whole section, including text and layout. Must be finite and greater than zero. |
| `iconScale` | `number` | Default: `1`. Default relative scale for items, stacks, entities, and textures. Must be finite and greater than zero. |
| `rowHeight` | `integer` or `"auto"` | Default: `"auto"`. Fits the tallest element, or uses a fixed positive unscaled row height. |
| `lineSpacing` | `integer` | Default: `2`. Non-negative unscaled background spacing around each row, favoring the top. |
| `inlineSpacing` | `integer` | Default: `0`. Non-negative unscaled background spacing between visible elements. |

## Example

```lua
lh.on("tick", function()
    lh.section({
        anchor = "topRight",
        offsetX = 4,
        offsetY = 4,
        scale = 1.5,
        backgroundColor = "#80000000",
    })
    lh.drawln(lh.player.name)
end)
```

Element options override section defaults for that draw call only. See [Sections](/guides/sections/) for layout and [Drawing Lifetime](/guides/drawing-lifetime/) for IDs, hiding, and timed output.
