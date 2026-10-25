# API reference data

`src/data/api.json` is sample data. Replace it with the Java export to populate `/api/`.
The site validates its shape and unique paths at build time. The Java exporter is independent of this website.

- `schemaVersion`: `2`.
- `root`: a namespace node, normally `lh`.
- All nodes have `kind`, `name`, `path`, and `description` (plain text; an empty string is allowed).
- A namespace has `children`, an ordered array of namespace, property, or function nodes.
- A property has `type`.
- A function has `parameters` (an ordered array) and `returnType`.
- Parameters have `name`, `description`, `optional`, and `type`.
- Paths include the root, for example `lh.sound.record`. A child's path must equal its parent's path plus `.` and its name.

The recursive type format is:

```ts
type TypeRef =
  | { kind: 'primitive'; name: 'nil' | 'any' | 'string' | 'integer' | 'number' | 'boolean' | 'function' }
  | { kind: 'reference'; id: string }
  | { kind: 'optional' | 'list'; element: TypeRef }
  | { kind: 'map'; key: TypeRef; value: TypeRef }
  | { kind: 'union'; alternatives: TypeRef[] }
  | { kind: 'literal'; value: string | number | boolean };
```

Reference IDs have **no provider prefix**: use `Block`, `PlayingRecord`, or `TextOptions`.
Register their manual documentation routes in `typePages` in `src/lib/api.ts`.
An unmapped reference is rendered as plain text, never a broken link.
Model and option pages live in `src/content/docs/models/` and `src/content/docs/options/`.

Parameter `optional` means an argument may be omitted. A type with `kind: 'optional'`
means the value may be `nil`; these are separate concepts. Represent an optional
options argument with `optional: true` and a reference type (no extra type wrapper
is needed unless you also want to explicitly document nullable values).

The renderer preserves array order, links each named part of compound types,
and exposes stable member anchors, e.g. `/api/#api-lh-sound-record`.
Deep links open collapsed ancestors and function details. The tree is rendered
at build time and remains readable without JavaScript; filtering and bulk controls
are progressive enhancements. Starlight's Pagefind indexes the rendered content
during a production build.
