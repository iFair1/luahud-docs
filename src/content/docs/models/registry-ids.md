---
title: Registry IDs
description: Namespaced item, block, entity type, status effect, and enchantment identifiers.
---

Registry IDs are strings in `namespace:path` form. Vanilla IDs usually use the `minecraft` namespace; installed mods can add their own. The Lua language-server suggestions are generated from registries, so the available values depend on your game and modpack.

## Fields

| Type | Lua type | Meaning |
| --- | --- | --- |
| `ItemId` | `string` | Item ID, such as `minecraft:diamond`. |
| `BlockId` | `string` | Block ID, such as `minecraft:stone`. |
| `EntityTypeId` | `string` | Entity type ID, such as `minecraft:zombie`; distinct from an individual entity’s UUID. |
| `StatusEffectId` | `string` | Status effect ID, such as `minecraft:speed`. |
| `EnchantmentId` | `string` | Enchantment ID, such as `minecraft:sharpness`. Suggestions use world registries when available and vanilla fallback values otherwise. |

## Example

```lua
lh.drawItem("minecraft:diamond")
local speed = lh.player.effects["minecraft:speed"]
```

A localized display name is not a registry ID. A texture path, such as `minecraft:textures/item/diamond.png`, is a resource identifier rather than an `ItemId`.
