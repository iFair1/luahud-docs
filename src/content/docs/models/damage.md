---
title: Damage
description: Local-player damage event payload, with observed health loss and available source information.
---

The payload passed to `lh.on("damage", callback)`. Health loss includes absorption and is observed on the client. Nearby updates can be combined using the latest damage source; matching can wait up to two client ticks. This is not a precise per-hit server damage log.

## Fields

| Field | Type | Description |
| --- | --- | --- |
| `type` | `string` | Namespaced damage type ID, such as `minecraft:fall` or `minecraft:player_attack`. Unmatched health loss uses `minecraft:generic`. |
| `attacker` | [Entity](/models/entity/) or `nil` | Attacking entity; `nil` for environmental damage or an unavailable attacker. |
| `weapon` | [ItemStack](/models/item-stack/) or `nil` | Weapon observed at damage notification time; `nil` for an empty hand or unavailable weapon. |
| `amount` | `number` | Observed health loss including absorption, in health points (two per heart); `0` if no loss was observed. May combine multiple hits. Absorption loss requires a damage notification. |

## Example

```lua
lh.on("damage", function(damage)
    lh.section({ id = "damage", duration = 3 })
    lh.drawln(string.format("Lost %.1f HP (%s)", damage.amount, damage.type))
end)
```
