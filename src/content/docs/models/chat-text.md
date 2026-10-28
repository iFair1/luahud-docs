---
title: ChatText
description: Minecraft text component input for local chat, including styles, translations, click and hover events.
---

A Minecraft text component table accepted by `lh.sendMessage()`. A plain string is also accepted and is treated as literal text. Messages appear only in local chat.

All fields below are optional in the Lua schema, but the resulting table must describe valid Minecraft text content. Usually choose `text`, `translate`, or `keybind`. Nested components use this same schema.

## Fields

| Field | Type | Description |
| --- | --- | --- |
| `text` | `string` | Literal text content. |
| `type` | `string` | Explicit content type: `"text"`, `"translatable"`, `"keybind"`, or `"object"`. |
| `translate` | `string` | Translation key. |
| `fallback` | `string` | Fallback translation format. |
| `with` | `(string or ChatText or number or boolean)[]` | Translation arguments, indexed from 1. |
| `keybind` | `string` | Key binding translation key. |
| `object` | `"atlas"` or `"player"` | Object content type; requires Minecraft 1.21.9+. |
| `atlas` | `string` | Sprite atlas ID for atlas content; defaults to `minecraft:blocks`. |
| `sprite` | `string` | Namespaced sprite ID for atlas content. |
| `player` | `string` or `ChatPlayerProfile` | Player profile for player-head content; see [Player profiles](#player-profiles). |
| `hat` | `boolean` | Include the player head’s hat layer; defaults to `true`. |
| `extra` | `(string or ChatText)[]` | Appended components, inheriting this component’s style. |
| `color` | `string` | Minecraft named color or `#RRGGBB`; unlike rendering options, this is not an ARGB integer. |
| `shadow_color` | `integer` or `number[]` | ARGB integer or RGBA float array; requires Minecraft 1.21.2+. |
| `bold` | `boolean` | Bold text. |
| `italic` | `boolean` | Italic text. |
| `underlined` | `boolean` | Underlined text. |
| `strikethrough` | `boolean` | Strikethrough text. |
| `obfuscated` | `boolean` | Randomized glyphs. |
| `font` | `string` | Namespaced font ID. |
| `insertion` | `string` | Text inserted into chat on shift-click. |
| `click_event` | `ChatClickEvent` | Click action; see [Click events](#click-events). |
| `hover_event` | `ChatHoverEvent` | Tooltip action; see [Hover events](#hover-events). |

## Example

```lua
lh.sendMessage({
    text = "LuaHUD documentation",
    color = "aqua",
    underlined = true,
    click_event = {
        action = "open_url",
        url = "https://luahud.ifair.dev",
    },
    hover_event = {
        action = "show_text",
        value = { text = "Open the docs", color = "gray" },
    },
    extra = { { text = " (local message)", color = "white", underlined = false } },
})
```

Use `click_event` and `hover_event` on every supported Minecraft version. LuaHUD adapts them for older versions. The legacy `clickEvent` and `hoverEvent` names are rejected. Unknown schema fields also produce an error.

## Click events

`ChatClickEvent` is one of these tables. `action` and the action-specific payload are required.

| Type | `action` | Payload |
| --- | --- | --- |
| `ChatOpenUrl` | `"open_url"` | `url: string` — HTTP or HTTPS URL. |
| `ChatSuggestCommand` | `"suggest_command"` | `command: string` — fills the chat input. |
| `ChatChangePage` | `"change_page"` | `page: integer` — one-based book page number. |
| `ChatCopyToClipboard` | `"copy_to_clipboard"` | `value: string` — text to copy. |

## Hover events

`ChatHoverEvent` is one of these tables:

| Type | Required fields | Optional fields |
| --- | --- | --- |
| `ChatShowText` | `action = "show_text"`, `value: string or ChatText` | None. |
| `ChatShowItem` | `action = "show_item"`, `id: string` (namespaced item ID) | `count: integer` (default `1`), `components: table<string, any>` keyed by namespaced component ID. |
| `ChatShowEntity` | `action = "show_entity"`, `id: string` (namespaced entity type ID), `uuid: string` | `name: string or ChatText`. |

## Player profiles

`player` accepts a string or a `ChatPlayerProfile` table. Profile table fields are all optional:

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` | Player name. |
| `id` | `string` | Player UUID. |
| `properties` | `ChatProfileProperty[]` | Skin profile properties. |

Each `ChatProfileProperty` requires `name: string` and `value: string`, with an optional `signature: string` for signed properties. Object content requires Minecraft 1.21.9+; it is unavailable on older versions.
