---
title: Entity
description: Entity model fields, including position, health, status effects, UUID, and horse properties.
---

An entity loaded on the client. Available from `lh.facing.targetEntity` and event payloads such as [Damage](/models/damage/). Check optional entity values before reading their fields. `lh.player` also has a `uuid` and can be passed to `lh.drawEntity()`; its player-specific fields are listed in the [API](/api/#api-lh-player).

## Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | [EntityTypeId](/models/registry-ids/) | Namespaced entity type, such as `minecraft:zombie`. |
| `x` | `number` | X world coordinate. |
| `y` | `number` | Y world coordinate. |
| `z` | `number` | Z world coordinate. |
| `name` | `string` | Localized display name; empty if unavailable. |
| `uuid` | `string` | UUID identifying this particular world entity. |
| `health` | `integer` | Current health, truncated to a whole number; `0` for non-living entities. Two health points equal one heart. |
| `maxHealth` | `integer` | Maximum health, truncated to a whole number; `0` for non-living entities. |
| `effects` | table&lt;[StatusEffectId](/models/registry-ids/), [StatusEffect](/models/status-effect/)&gt; | Active effects keyed by namespaced ID; empty for non-living entities. |
| `isLiving` | `boolean` | Whether the entity is a living entity. |
| `isBaby` | `boolean` | Whether it is a baby living entity; otherwise `false`. |
| `horse` | [Horse](/models/horse/) or `nil` | Horse-family properties; `nil` for other entities. |

## Drawing an entity

```lua
lh.on("render", function()
    local entity = lh.facing.targetEntity
    if entity then
        lh.drawEntity(entity, { scale = 3 })
        lh.drawln(entity.name)
    end
end)
```

Drawing accepts this model or an [EntityInput](/models/entity-input/) table. The entity must still be loaded.
