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

// Fail during the build if a replacement export has an invalid shape.
export const api = z.object({
  schemaVersion: z.literal(2),
  root: z.object({ ...base, kind: z.literal('namespace'), children: z.array(nodeSchema) }),
}).parse(rawApi);

// Register reference routes here only after their documentation pages exist.
// Unmapped types remain readable as plain text in the API explorer.
export const typePages: Record<string, { label: string; href: string }> = {};

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
  if (node.kind === 'namespace') node.children.forEach(child => validateTree(child, node.path));
}
validateTree(api.root);
