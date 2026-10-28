---
title: IconOptions
description: Options for drawing an item icon or texture, including scale, background, and line breaks.
---

Options for `lh.drawItem(idOrStack, options)` and `lh.drawTexture(path, options)`. Every field is optional. Colors use RGB/ARGB hex strings or ARGB integers. An option override applies only to this call.

## Fields

| Field | Type | Description |
| --- | --- | --- |
| `backgroundColor` | `string` or `integer` | Default: section `backgroundColor`. Background for this element. |
| `offsetX` | `integer` | Default: `0`. Local horizontal offset. |
| `offsetY` | `integer` | Default: `0`. Local vertical offset. |
| `scale` | `number` | Default: section `iconScale`. Relative to the section’s scale; overrides `iconScale` for this call. Must be finite and greater than zero. |
| `newLine` | `boolean` | Default: `false`. Advance to the next line after drawing. |

## Example

```lua
lh.drawItem("minecraft:diamond", { scale = 2, newLine = true })
lh.drawTexture("minecraft:textures/item/compass_00.png", {
    backgroundColor = 0,
    scale = 2,
})
```

`drawItem()` renders only the item icon even when passed a stack. To show count, durability, or stack glint, use `lh.drawStack()` with [StackOptions](/options/stack-options/). See [Items, Texture, and Entities](/guides/icons-and-models/) for texture resources.
