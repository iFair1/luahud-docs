---
title: Death
description: Local-player death payload, with location, server death message, and client-observed source.
---

The payload passed to `lh.on("death", callback)`, also available as `lh.player.lastDeath` (`nil` before a recorded death). The event follows the server’s local-player death notification, including when immediate respawn disables the death screen.

`lastDeath` survives respawns, dimension changes, and profile reloads within the current connection. It resets on reconnect.

## Fields

| Field | Type | Description |
| --- | --- | --- |
| `x` | `number` | Player X coordinate at death. |
| `y` | `number` | Player Y coordinate at death. |
| `z` | `number` | Player Z coordinate at death. |
| `dimension` | `string` | Namespaced dimension ID at death. |
| `message` | `string` | Server-provided death message as plain text. |
| `damageType` | `string` | Latest client-observed damage type ID; `minecraft:generic` when unavailable. May differ from the server’s fatal source. |
| `attacker` | [Entity](/models/entity/) or `nil` | Attacker from the latest client-observed source, or `nil` when unavailable. |
| `weapon` | [ItemStack](/models/item-stack/) or `nil` | Weapon copied from the available damage source at death; `nil` for an empty hand or unavailable weapon. |

## Example

```lua
lh.on("death", function(death)
    lh.sendMessage(death.message)
    lh.sendMessage(string.format("Died at %.1f %.1f %.1f in %s",
        death.x, death.y, death.z, death.dimension))
end)
```
