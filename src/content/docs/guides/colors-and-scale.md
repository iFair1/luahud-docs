---
title: Colors and Scale
sidebar:
  order: 20
---

Section options give all its elements a common style. An element's own options can overide the parts it needs.
```lua
lh.on("tick", function()
    lh.section({
        anchor = "topLeft",
        offsetX = 4,
        offsetY = 4,
        textColor = "#FFFFFF",
        backgroundColor = "#80000000",
        shadow = true,
        scale = 2,
        inlineSpacing = 3,
    })

    lh.drawln("Player: " .. lh.player.name)
    lh.draw("Health: ")
    lh.drawln(lh.player.health, {
        textColor = lh.player.health <= 6 and "#FF5555" or "#55FF55",
    })
end)
```
The health value has its own text color. The next element still uses the section's default. An override doesn't change the options for later draw calls.

## Colors
You can use a hex string or an integer. String are often easier to read, but you can always use integers for math.

| Value | Meaning |
|-|-|
|`"#55FF55"`| Opaque green, in `RRGGBB` format |
|`"#80000000"`| Partly transparent black, in `AARRGGBB` format |
|`"#00000000"` or `0`| Fully transparent |
|`0xFFFFFFFF`| Opaque white as an ARGB integer |

With eight digits, **alpha comes first**: `00` is transparent and `FF` is opaque. Six-digit strings automatically get full opacity. Numeric values are ARGB integers, so use `0xFF55FF55` if you want opaque green as a number.

:::caution
You won't see anything if you use `0x55FF55`. Because `0x55FF55` is equal to `0x0055FF55`, which is fully transparent.
:::

You can also use `backgroundColor = 0`, because it is the same thing as `0x00000000` anyways.

## Scale
The section's `scale` scales the entire section, including text and its layout. `iconScale` sets the default relative scale for its items, item stacks, and entities.
```lua
lh.section({
    scale = 1.5,
    iconScale = 2
})

lh.drawItem("minecraft:diamond_block")
lh.drawItem("minecraft:emerald_block", { scale = 1 })
lh.drawln("Different icon sizes.")
```
Here the diamond block uses the section's `iconScale` of 2. The emerald's own `scale = 1` overrides that default. Both are still affected by the section scale of 1.5.

Text options don't have a separate `scale` field.

## Local offsets
`offsetX` and `offsetY` on an individual draw call shift that element within the layout. They are useful for small visual adjustments. Section offset position the whole block relative to its anchor. Use those when moving your HUD around.
