---
title: EntityOptions
description: Entity rendering scale, viewing angles, rotation, lighting, and layout options.
---

Options for `lh.drawEntity(uuidOrModel, options)`. Every field is optional. Includes the same layout fields as [IconOptions](/options/icon-options/). Colors use RGB/ARGB hex strings or ARGB integers.

## Fields

| Field | Type | Description |
| --- | --- | --- |
| `backgroundColor` | `string` or `integer` | Default: section `backgroundColor`. Background for this element. |
| `offsetX` | `integer` | Default: `0`. Local horizontal offset. |
| `offsetY` | `integer` | Default: `0`. Local vertical offset. |
| `scale` | `number` | Default: section `iconScale`. Relative to the section’s scale; overrides `iconScale` for this call. Must be finite and greater than zero. |
| `newLine` | `boolean` | Default: `false`. Advance to the next line after drawing. |
| `yaw` | `number` | Default: `0`. Horizontal viewing angle offset in degrees. |
| `pitch` | `number` | Default: `0`. Vertical viewing angle offset in degrees. |
| `fullBright` | `boolean` | Default: `true`. Render with maximum lighting. |
| `useEntityRotation` | `boolean` | Default: `false`. Use the entity’s current rotation as the base for yaw and pitch offsets. |

## Example

```lua
lh.on("render", function()
    lh.drawEntity(lh.player, {
        scale = 4,
        yaw = 25,
        pitch = 10,
        fullBright = true,
        newLine = true,
    })
end)
```

The entity must be loaded on the client. See [EntityInput](/models/entity-input/) for accepted input tables.
