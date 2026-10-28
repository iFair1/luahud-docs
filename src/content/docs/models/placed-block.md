---
title: PlacedBlock
description: A block at a position in the client world, with its ID, name, and coordinates.
---

A block at a world position. Returned by `lh.getBlockAt()`, `lh.pos.highestBlock`, and `lh.facing.targetBlock`. The target is `nil` when the crosshair is not pointing at a block; `getBlockAt()` can also return `nil` if coordinates cannot be resolved.

## Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | [BlockId](/models/registry-ids/) | Namespaced block ID. |
| `name` | `string` | Localized block name. |
| `x` | `integer` | Block X coordinate. |
| `y` | `integer` | Block Y coordinate. |
| `z` | `integer` | Block Z coordinate. |

## Example

```lua
lh.on("tick", function()
    local block = lh.facing.targetBlock
    if block then
        lh.drawln(block.name .. " (" .. block.id .. ")")
    end
end)
```

Models expose fields through metatables. See [Working with Game Data](/guides/working-with-game-data/#models) for reading and copying model values.
