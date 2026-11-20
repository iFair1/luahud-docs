---
title: Items, Blocks, Textures, and Entities
description: Add item icons, inventory stacks, 3D blocks, resource pack textures, and loaded entities to your LuaHUD. Customize stack details, scale, and entity viewing angles.
sidebar:
  order: 40
---

Text is useful, but icons are cooler. These new draw calls join the current row just like `lh.draw()`.

:::tip
IDs such as `ItemId`, `EntityTypeId` are dynamically generated with modded and vanilla registries, so you can get personalized suggestions for your modpack if you set up your code editor with a Lua language server.
:::
## Icons
`lh.drawItem()` draws an item's icon by ID:
```lua
lh.drawItem("minecraft:netherite_block")
lh.drawln("I'm rich!")
```

IDs use the `namespace:name` format. The namespace is usually `minecraft` for vanilla content and the mod's namespace for modded content. The item or block must exist in your game. A translated display name like `"Netherite Block"` isn't an ID.

 Use `lh.drawStack()` when you want an actual stack, including its count, durability bar, and enchantment glint:
 ```lua
 lh.on("tick", function()
     lh.section({
         anchor = "bottomRight",
         offsetX = 4,
         offsetY = 4,
     })

     local stack = lh.slots.mainHand

     lh.drawStack(stack)
     lh.drawln(stack.name)
 end)
 ```
 `drawItem(stack)` is also accepted, but draws only the item icon. `drawStack(stack)` keeps the stack's details. You can hide specific details with options such as `showCount = false` or `showDurabilityBar = false`. You can also override the glint with `showGlint = true`. The default for this varies depending on the item and its enchantments.

 `drawItem()` is better if you want to draw static items or blocks (yes, blocks are items too).

 To preview a stack without taking it from your inventory:
```lua
lh.drawStack({
    id = "minecraft:diamond_sword",
    count = 64
})
```
This only affects the drawing. And yeah you can draw 64 diamond swords.

## Keep empty slots in a row
Empty stacks are normally skipped. Pass `drawAir = true` when you want an empty slot to reserve space, for example in a custom hotbar:
```lua
lh.on("tick", function()
    lh.section({
        anchor = "bottomCenter",
        offsetY = 50,
        inlineSpacing = 2,
    })

    for _, stack in ipairs(lh.slots.hotbar) do
        lh.drawStack(stack, { drawAir = true })
    end
end)
```

## 3D blocks

`lh.drawBlock()` draws a block at full brightness. Pass a block ID for its default state, a [Block](/models/placed-block/) from the world to keep its state, or a [BlockInput](/models/placed-block/#blockinput) table to specify state properties.

```lua
lh.on("tick", function()
    local block = lh.facing.getTargetBlock()
    if block then
        lh.drawBlock(block, { scale = 2, showBreakOverlay = true })
        lh.drawln(block.name)
    end
end)
```

The breaking overlay follows your mining progress on the selected block. Use [BlockOptions](/options/block-options/) to adjust the viewing angles or place the model on a canvas.

## Textures
`lh.drawTexture()` takes a resource identifier, not a filesystem path or URL:
```lua
lh.drawTexture("minecraft:textures/item/compass_00.png", {
    scale = 2,
    newLine = true,
})
```

Resources can come from Minecraft, installed mods, or resource packs. When you pass `luahud:icon.png` it translates into `assets/luahud/icon.png`. For your own image, put it in a resourcepack as `assets/namespace/textures/logo.png`, enable the pack, then use `namespace:textures/logo.png`. Putting a png beside your Lua profiles doesn't make it a Minecraft resource.

Textures use the icon layout and scale system. A texture of an item is also just that image (unless it's something like shield). Use `drawItem()` for the game's rendered item model.


## Entities
`lh.drawEntity()` draws an entity that is currently loaded on your client. You can pass a UUID, an entity model, or a table with a `uuid` field. `lh.player` works too:
```lua
lh.on("render", function()
    lh.section({
        anchor = "topRight",
        offsetX = 8,
        offsetY = 8,
    })
    lh.drawEntity(lh.player, {
        scale = 4,
        yaw = 25,
        pitch = 10,
        fullBright = true,
        newLine = true,
    })
    lh.drawln(lh.player.name)
end)
```
The UUID identifies a particular entity, not an entity type. `"minecraft:zombie"` won't spawn or draw a zombie here. A UUID for an entity that has unloaded will produce an error.

`yaw` and `pitch` adjust the viewing angle in degrees. With `useEntityRotation = true`, those angles are offsets from the entity's current rotation.

For the difference between `tick` and `render`, continue to [Events](/guides/events/).
