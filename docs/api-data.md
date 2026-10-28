# API reference data

`src/data/api.json` is the Java export used by the reference pages. Replace this
file with a new export and rebuild. The exporter is independent of this website.

## Schema version 3

The top-level object contains:

- `schemaVersion`: `3`.
- `root`: the `lh` namespace tree, containing namespaces, properties, and functions.
- `types`: named `model`, `input`, and `alias` definitions, referenced by ID.
- `events`: event names, descriptions, and payload types (`nil` means no payload).

Namespace members have `kind`, `name`, `path`, and `description`. A namespace has
`children`; a property has `type`; a function has ordered `parameters` and a
`returnType`. Each parameter has `name`, `description`, `optional`, and `type`.
Child paths must equal the parent path plus `.` and the child's name.

Every named type has `id`, `name`, `kind`, and an optional `description`.
Models and inputs have `fields`; aliases have an underlying `type`. An input
may also have a `model` reference identifying its corresponding output model.
Fields have `name`, `description`, `optional`, and `type`.

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

Reference IDs have no provider prefix, for example `PlacedBlock`, `PlayingRecord`,
or `TextOptions`. Self references and references between types are supported.
The build validates the schema, unique member paths, type IDs, field names,
parameter names, event names, and that every type reference resolves. An input's
`model` reference must point to a model definition.

## Optional values

These flags have distinct meanings:

- A parameter's `optional` flag means the argument may be omitted.
- An input field's `optional` flag means the field may be omitted.
- A model field's `optional` flag means its output value can be `nil`.
- A `TypeRef` with `kind: 'optional'` means that value can be `nil`.

Field tables use separate “Required” (inputs) and “Can be nil” (models) columns.
The renderer does not infer defaults from an optional flag or parse them out of
prose. Defaults and behavioral notes absent from the export remain editorial content.

## Generated data and editorial content

`/api/` presents nested namespaces, properties, and functions in the API tree. Descriptions,
parameter order, and types come directly from JSON. Existing member anchors such
as `/api/#api-lh-sound-record` are preserved. `/api/events/` lists exported events;
`/api/types/` indexes every exported type. The rendered content is available
without JavaScript and indexed by Starlight's Pagefind during production builds.
Search, expand/collapse controls, and deep-link expansion progressively enhance
this tree. Model, option, and event references use ordinary sections and tables.

Model and option articles live in `src/content/docs/models/` and
`src/content/docs/options/` as MDX. Keep introductions, examples, defaults, and
usage notes in those files. Render the field definition from JSON with:

```mdx
import TypeFields from '../../../components/api/TypeFields.astro';

A handwritten introduction explaining how this model is used.

## Fields

<TypeFields id="ItemStack" />

## Example

A handwritten Lua example.
```

`TypeFields` handles models, inputs, and aliases. Updating `api.json` automatically
updates these definitions without overwriting editorial text. If a type's behavior
changes, update its introduction and examples as well. Do not copy field tables
back into MDX.

`editorialTypePages` in `src/lib/api.ts` maps types to their existing articles or
sections within shared articles (registry IDs and chat helper types). Labels come
from the export. A type without an editorial mapping automatically gets a page at
`/api/types/<id>/`, containing its exported definition. It appears in the type
index and reference links immediately, so new exports do not require a manual
article for every new type. To add editorial content, create an MDX article and
register its route in `editorialTypePages`.
