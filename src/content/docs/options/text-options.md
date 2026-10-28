---
title: TextOptions
description: Per-call text colors, background, shadow, and local offsets for draw and drawln.
---

Options for `lh.draw(value, options)` and `lh.drawln(value, options)`. Every field is optional. Color and shadow overrides apply only to this call; later calls keep the section defaults. Colors use RGB/ARGB hex strings or ARGB integers.

## Fields

| Field | Type | Description |
| --- | --- | --- |
| `backgroundColor` | `string` or `integer` | Default: section `backgroundColor`. Background for this element. |
| `offsetX` | `integer` | Default: `0`. Local horizontal offset. |
| `offsetY` | `integer` | Default: `0`. Local vertical offset. |
| `textColor` | `string` or `integer` | Default: section `textColor`. Text color. |
| `shadow` | `boolean` | Default: section `shadow`. Whether to draw a text shadow. |

## Example

```lua
lh.draw("Warning: ", { textColor = "#FF5555", shadow = true })
lh.drawln("Low health")
```

Use `lh.drawln()` for a line break. Text options have no `newLine` or `scale` field; set text scale on [SectionOptions](/options/section-options/). Unknown option fields produce an error.
