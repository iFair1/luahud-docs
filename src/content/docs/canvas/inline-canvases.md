---
title: Canvases Inside Sections
description: Insert a custom drawing into an automatic section row with inline canvases.
sidebar:
  order: 40
---

Set `inline = true` to insert a canvas as an element in the current section row. The section handles its placement, alignment, and spacing; you draw freely inside its fixed bounds.

```lua
lh.on("tick", function()
    lh.section({ anchor = "topLeft", inlineSpacing = 6 })
    lh.draw("Load: ")
    lh.canvas({ inline = true, width = 80, height = 10 })
    lh.drawRect(0, 0, 80, 10, { color = "#303840", radius = 3 })
    lh.drawRect(0, 0, 56, 10, { color = "#80CBC4", radius = 3 })
    lh.endCanvas()
    lh.drawln(" 70%")
end)
```

After `lh.endCanvas()`, drawing continues in the same row. The canvas reserves its width and height in that row, even if its contents use less space. Its own `scale` scales this reserved size, and the enclosing section's scale applies as well. Normal section alignment and direction rules still apply.

Inline canvases inherit their lifetime and visibility from the parent section. They reject `anchor`, `offsetX`, `offsetY`, `id`, `duration`, and `visible`; put those options on `lh.section()` instead. They support `clip`, `scale`, `textColor`, and `shadow` alongside the required dimensions.

A canvas cannot contain another canvas. Close the current canvas before continuing the section or starting another drawing area.
