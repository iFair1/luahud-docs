---
title: StackOptions
description: Item stack rendering options for count, durability, glint, empty slots, and scale.
---

Options for `lh.drawStack(stack, options)`. Every field is optional. Includes the same layout fields as [IconOptions](/options/icon-options/). Color values use RGB/ARGB hex strings or ARGB integers.

## Fields

| Field | Type | Description |
| --- | --- | --- |
| `backgroundColor` | `string` or `integer` | Default: section `backgroundColor`. Background for this element. |
| `offsetX` | `integer` | Default: `0`. Local horizontal offset. |
| `offsetY` | `integer` | Default: `0`. Local vertical offset. |
| `scale` | `number` | Default: section `iconScale`. Relative to the section’s scale; overrides `iconScale` for this call. Must be finite and greater than zero. |
| `newLine` | `boolean` | Default: `false`. Advance to the next line after drawing. |
| `showDurabilityBar` | `boolean` | Default: `true`. Allow the stack’s durability bar to appear. The item must have durability damage for a bar to be visible. |
| `showCount` | `boolean` | Default: `true`. Allow the normal stack count overlay; a count of `1` normally has no label. |
| `showGlint` | `boolean` | Default: the stack’s own glint behavior. Set explicitly to force glint on or off. |
| `drawAir` | `boolean` | Default: `false`. Reserve one item width for an empty stack instead of skipping it. |

## Example

```lua
lh.on("tick", function()
    for _, stack in ipairs(lh.slots.hotbar) do
        lh.drawStack(stack, {
            drawAir = true,
            showCount = false,
            showDurabilityBar = false,
        })
    end
end)
```

Drawing uses a copy of the stack. These options do not change inventory contents. See [ItemStackInput](/models/item-stack-input/) to construct a preview stack.
