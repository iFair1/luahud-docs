---
title: ItemStack
description: Item stack fields, durability, enchantments, and drawing inputs.
---

An item stack from `lh.slots`, an `item-pickup` event, or an available event weapon. Empty slots are still stacks; check `count` before displaying their contents.

## Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | [ItemId](/models/registry-ids/) | Namespaced item ID. |
| `name` | `string` | Localized stack display name. |
| `count` | `integer` | Number of items in the stack; `0` for an empty slot. |
| `damage` | `integer` or `nil` | Current durability damage; `nil` if the item is not damageable. |
| `damageLeft` | `integer` or `nil` | Remaining durability (`maxDamage - damage`); `nil` if not damageable. |
| `maxDamage` | `integer` or `nil` | Maximum durability; `nil` if not damageable. |
| `enchantments` | table&lt;[EnchantmentId](/models/registry-ids/), integer&gt; or `nil` | Enchantment levels keyed by namespaced ID; `nil` when no enchantments are present. |

## Example

```lua
lh.on("tick", function()
    local stack = lh.slots.mainHand
    if stack.count == 0 then return end
    lh.drawStack(stack)
    lh.drawln(stack.name)
    if stack.damageLeft ~= nil then
        lh.drawln(stack.damageLeft .. " / " .. stack.maxDamage)
    end
end)
```

`lh.drawStack()` and `lh.drawItem()` also accept an [ItemStackInput](/models/item-stack-input/) table. Stack display flags are documented in [StackOptions](/options/stack-options/).
