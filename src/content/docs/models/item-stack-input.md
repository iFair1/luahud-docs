---
title: ItemStackInput
description: Describe an item stack to render, including count, durability, and enchantments.
---

An ordinary table accepted by `lh.drawStack()` and `lh.drawItem()`, alongside existing [ItemStack](/models/item-stack/) models. Input describes a rendered stack and does not change your inventory. Only `id` is required.

## Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | [ItemId](/models/registry-ids/) | Required. Namespaced item ID that exists in the game. |
| `count` | `integer` | Optional. Defaults to `1` for an ordinary input table. |
| `damage` | `integer` | Optional. Durability damage; takes precedence over `damageLeft` when both are supplied. |
| `damageLeft` | `integer` | Optional. Remaining durability, converted to damage using the item’s maximum durability. |
| `enchantments` | table&lt;[EnchantmentId](/models/registry-ids/), integer&gt; | Optional. Enchantment levels keyed by namespaced ID. Resolving these requires a loaded world. |

## Example

```lua
lh.drawStack({
    id = "minecraft:diamond_sword",
    count = 1,
    damageLeft = 100,
    enchantments = { ["minecraft:sharpness"] = 3 },
})
```

`name` and `maxDamage` are output fields, not configurable input fields. A new input table uses a fresh stack. Passing an existing model preserves its underlying components; explicit input overrides are applied to a copy. An explicit `enchantments` map replaces existing enchantments, so `{}` clears them for that drawing.
