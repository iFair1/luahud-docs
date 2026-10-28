import { z } from 'astro/zod';
import rawApi from '../data/api.json';

export type TypeRef =
  | { kind: 'primitive'; name: 'nil' | 'any' | 'string' | 'integer' | 'number' | 'boolean' | 'function' }
  | { kind: 'reference'; id: string }
  | { kind: 'optional' | 'list'; element: TypeRef }
  | { kind: 'map'; key: TypeRef; value: TypeRef }
  | { kind: 'union'; alternatives: TypeRef[] }
  | { kind: 'literal'; value: string | number | boolean };

const typeSchema: z.ZodType<TypeRef> = z.lazy(() => z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('primitive'), name: z.enum(['nil', 'any', 'string', 'integer', 'number', 'boolean', 'function']) }),
  z.object({ kind: z.literal('reference'), id: z.string().min(1) }),
  z.object({ kind: z.literal('optional'), element: typeSchema }),
  z.object({ kind: z.literal('list'), element: typeSchema }),
  z.object({ kind: z.literal('map'), key: typeSchema, value: typeSchema }),
  z.object({ kind: z.literal('union'), alternatives: z.array(typeSchema).min(2) }),
  z.object({ kind: z.literal('literal'), value: z.union([z.string(), z.number(), z.boolean()]) }),
]));

const parameterSchema = z.object({
  name: z.string().min(1), description: z.string(), optional: z.boolean(), type: typeSchema,
});
export type Parameter = z.infer<typeof parameterSchema>;
type BaseNode = { name: string; path: string; description: string };
export type NamespaceNode = BaseNode & { kind: 'namespace'; children: ApiNode[] };
export type ApiNode = NamespaceNode
  | (BaseNode & { kind: 'property'; type: TypeRef })
  | (BaseNode & { kind: 'function'; parameters: Parameter[]; returnType: TypeRef });

const base = { name: z.string().min(1), path: z.string().min(1), description: z.string() };
const nodeSchema: z.ZodType<ApiNode> = z.lazy(() => z.discriminatedUnion('kind', [
  z.object({ ...base, kind: z.literal('namespace'), children: z.array(nodeSchema) }),
  z.object({ ...base, kind: z.literal('property'), type: typeSchema }),
  z.object({ ...base, kind: z.literal('function'), parameters: z.array(parameterSchema), returnType: typeSchema }),
]));

const fieldSchema = z.object({
  name: z.string().min(1), description: z.string(), optional: z.boolean(), type: typeSchema,
});
const typeBase = { id: z.string().min(1), name: z.string().min(1), description: z.string().optional() };
const definitionSchema = z.discriminatedUnion('kind', [
  z.object({ ...typeBase, kind: z.literal('model'), fields: z.array(fieldSchema) }),
  z.object({ ...typeBase, kind: z.literal('input'), fields: z.array(fieldSchema),
    model: z.object({ kind: z.literal('reference'), id: z.string().min(1) }).optional() }),
  z.object({ ...typeBase, kind: z.literal('alias'), type: typeSchema }),
]);
export type TypeDefinition = z.infer<typeof definitionSchema>;

// Validate the complete export before any reference pages are rendered.
export const api = z.object({
  schemaVersion: z.literal(3),
  root: z.object({ ...base, kind: z.literal('namespace'), children: z.array(nodeSchema) }),
  types: z.array(definitionSchema),
  events: z.array(z.object({ name: z.string().min(1), description: z.string(), payloadType: typeSchema })),
}).parse(rawApi);

export const typesById = new Map(api.types.map(type => [type.id, type]));

// Editorial pages keep stable routes; other exported types get a generated page.
const editorialTypePages: Record<string, string> = {
  PlacedBlock: '/models/placed-block/',
  Entity: '/models/entity/',
  EntityInput: '/models/entity-input/',
  Horse: '/models/horse/',
  ItemStack: '/models/item-stack/',
  ItemStackInput: '/models/item-stack-input/',
  StatusEffect: '/models/status-effect/',
  StatusEffectInput: '/models/status-effect/#statuseffectinput',
  PlayingRecord: '/models/playing-record/',
  Damage: '/models/damage/',
  Death: '/models/death/',
  Error: '/models/error/',
  ItemId: '/models/registry-ids/#itemid',
  BlockId: '/models/registry-ids/#blockid',
  EntityTypeId: '/models/registry-ids/#entitytypeid',
  StatusEffectId: '/models/registry-ids/#statuseffectid',
  EnchantmentId: '/models/registry-ids/#enchantmentid',
  ChatText: '/models/chat-text/',
  ChatClickEvent: '/models/chat-text/#click-events',
  ChatOpenUrl: '/models/chat-text/#chatopenurl',
  ChatSuggestCommand: '/models/chat-text/#chatsuggestcommand',
  ChatChangePage: '/models/chat-text/#chatchangepage',
  ChatCopyToClipboard: '/models/chat-text/#chatcopytoclipboard',
  ChatHoverEvent: '/models/chat-text/#hover-events',
  ChatShowText: '/models/chat-text/#chatshowtext',
  ChatShowItem: '/models/chat-text/#chatshowitem',
  ChatShowEntity: '/models/chat-text/#chatshowentity',
  ChatPlayerProfile: '/models/chat-text/#player-profiles',
  ChatProfileProperty: '/models/chat-text/#chatprofileproperty',
  SectionOptions: '/options/section-options/',
  TextOptions: '/options/text-options/',
  IconOptions: '/options/icon-options/',
  StackOptions: '/options/stack-options/',
  EntityOptions: '/options/entity-options/',
};

export const typePages: Record<string, { label: string; href: string }> = Object.fromEntries(
  api.types.map(type => [type.id, {
    label: type.name, href: editorialTypePages[type.id] ?? `/api/types/${encodeURIComponent(type.id)}/`,
  }]),
);
export const generatedTypes = api.types.filter(type => !editorialTypePages[type.id]);

export function getType(id: string): TypeDefinition {
  const type = typesById.get(id);
  if (!type) throw new Error(`Unknown documentation type: ${id}`);
  return type;
}

export const anchorId = (path: string) => `api-${path.replaceAll('.', '-')}`;
export const withBase = (href: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${href}`;

// Group members for display while preserving export order within each kind.
export function sortMembers(members: ApiNode[]): ApiNode[] {
  const priority = { namespace: 0, property: 1, function: 2 };
  return [...members].sort((a, b) => priority[a.kind] - priority[b.kind]);
}

export function typeLabel(type: TypeRef): string {
  switch (type.kind) {
    case 'primitive': return type.name;
    case 'reference': return typePages[type.id]?.label ?? type.id;
    case 'optional': return `${groupLabel(type.element)}?`;
    case 'list': return `${groupLabel(type.element)}[]`;
    case 'map': return `table<${typeLabel(type.key)}, ${typeLabel(type.value)}>`;
    case 'union': return type.alternatives.map(typeLabel).join(' | ');
    case 'literal': return JSON.stringify(type.value);
  }
}

function groupLabel(type: TypeRef): string {
  return type.kind === 'union' ? `(${typeLabel(type)})` : typeLabel(type);
}

export function searchText(node: ApiNode): string {
  const types = node.kind === 'property' ? typeLabel(node.type)
    : node.kind === 'function' ? [typeLabel(node.returnType), ...node.parameters.map(p => `${p.name} ${p.description} ${typeLabel(p.type)}`)].join(' ')
    : '';
  return `${node.path} ${node.description} ${types}`.toLowerCase();
}

// Duplicate paths would produce ambiguous deep links.
const paths = new Set<string>();
function validateTree(node: ApiNode, parent?: string) {
  if (paths.has(node.path)) throw new Error(`Duplicate API path: ${node.path}`);
  if (parent && node.path !== `${parent}.${node.name}`) throw new Error(`Invalid API path: ${node.path}`);
  paths.add(node.path);
  if (node.kind === 'function') unique(node.parameters.map(parameter => parameter.name), `parameter in ${node.path}`);
  if (node.kind === 'namespace') node.children.forEach(child => validateTree(child, node.path));
}
validateTree(api.root);

function unique(values: string[], context: string) {
  if (new Set(values).size !== values.length) throw new Error(`Duplicate ${context}`);
}
unique(api.types.map(type => type.id), 'type ID');
unique(api.events.map(event => event.name), 'event name');
for (const type of api.types) {
  if (type.kind !== 'alias') unique(type.fields.map(field => field.name), `field in ${type.id}`);
  if (type.kind === 'input' && type.model && getType(type.model.id).kind !== 'model') {
    throw new Error(`Input ${type.id} must reference a model`);
  }
}
function validateReferences(value: unknown): void {
  if (Array.isArray(value)) value.forEach(validateReferences);
  else if (value && typeof value === 'object') {
    const node = value as Record<string, unknown>;
    if (node.kind === 'reference' && !typesById.has(node.id as string)) {
      throw new Error(`Unresolved API type: ${node.id}`);
    }
    Object.values(node).forEach(validateReferences);
  }
}
validateReferences(api);
