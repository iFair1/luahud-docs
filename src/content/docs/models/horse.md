---
title: Horse
description: Horse-family attributes, saddle and chest state, and the first passenger.
---

Horse-family properties, including horses, donkeys, mules, and other horse-family species. Read them through `entity.horse` or `lh.player.horse`. These values are `nil` when the entity is not in the horse family or the player is not riding one.

## Fields

| Field | Type | Description |
| --- | --- | --- |
| `movementSpeed` | `number` | Effective movement-speed attribute; not blocks per second. |
| `jumpStrength` | `number` | Effective jump-strength attribute; not jump height. |
| `isSaddled` | `boolean` | Whether a saddle is equipped. |
| `isTamed` | `boolean` | Whether the animal is tamed. |
| `rider` | [Entity](/models/entity/) or `nil` | First passenger, or `nil` when unoccupied. |
| `hasChest` | `boolean` | Whether a chest is attached; `false` for species that cannot carry one. |

## Example

```lua
lh.on("tick", function()
    local horse = lh.player.horse
    if horse then
        lh.drawln(string.format("Speed attribute: %.3f", horse.movementSpeed))
    end
end)
```
