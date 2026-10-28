---
title: Error
description: Error event snapshot fields, stable IDs, occurrence counts, and source details.
---

An immutable error snapshot passed to `lh.on("error", callback)`. Each recorded occurrence is delivered on the next client lifecycle tick after profiles load. Repeated active errors keep their ID and increase their count. Errors raised by error handlers are recorded without triggering another error event.

## Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number` | Stable ID while this error remains active. |
| `group` | `string` | Profile name, or `LuaHUD` for system errors. |
| `system` | `boolean` | Whether this is a LuaHUD system error. |
| `phase` | `string` | Originating event, load phase, timer, or system component. |
| `line` | `integer` | Source line number; `-1` when unavailable. |
| `message` | `string` | Error message without the source location prefix. |
| `count` | `integer` | Occurrence count at the time of this snapshot. |
| `isNew` | `boolean` | Whether this is the first occurrence of the active error. |

## Example

```lua
lh.on("error", function(err)
    if err.isNew then
        lh.sendMessage(err.group .. ": " .. err.message)
    end
end)
```
