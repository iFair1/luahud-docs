---
title: Items, Texture, and Entities
sidebar:
  order: 40
---

Text is useful, but sometimes a little picture does the job better. These draw calls join the current row just like `lh.draw()`.

:::tip
IDs such as `ItemId`, `EntityTypeId` are dynamically generated with modded and vanilla registries, so you can get personalized suggestions for your modpack if you setup your code editor right.
:::
## Icons
`lh.drawItem()` draws and item's icon by ID:
```lua
lh.drawItem("minecraft:netherite_block")
lh.drawln("I'm rich!")
```

IDs use the `namespace:name` format. The namespace is usually `minecraft` for vanilla content and the mod's namespace for modded content. Item/Block must exist in your game. A translated display name like `"Netherite Block"` isn't an ID.

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

 To preview a stack without taking it from your inventory:
```lua
lh.drawStack({
    id = "minecraft:diamond_sword",
    count = 64
})
```
This only affects the drawing. And yeah you can draw 64 diamond swords.

## Keep empty slots in a row
Empty stacks are normally skipped. Pass `drawAir = true` when you want an empty slot to reserve space, for example in an custom hotbar:
```lua
lh.on("tick", function()
    lh.section({
        anchor = "bottomCenter",
        offsetY = 50,
        inlineSpacing = 2,
    })

    for _, stack in ipairs(lh.slots.slots) do
        lh.drawStack(stack, { drawAir = true })
    end
end)
```

## Textures
`lh.drawTexture()` takes a resource identifier, not afilesystem path or URL:
```lua
lh.drawTexture("minecraft:textures/item/compass_00.png", {
    scale = 2,
    newLine = true,
})
```

Resources can come from Minecraft, installed mods, or resource packs. For your own image, put it in a resource pack as `assets/myhud/textures/logo.png`, enable the pack, then use `"myhud:textures/logo.png"`. Putting a png beside your Lua profile doesn't make it a Minecraft resource.

Textures use the icon layout and scale system. A texture of an item is also just that image. Use `drawItem()` for the game's rendered item model.


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

For the difference between `tick` and `render`, continue to [Events and Timers](todo).
