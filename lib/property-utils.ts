/**
 * Get a stable string id from a Payload/MongoDB property document.
 * Supports both `id` (Payload) and `_id` (raw MongoDB) for compatibility.
 */
export function getPropertyId(
  property: { id?: string | number; _id?: unknown } | null | undefined
): string {
  if (!property) return ''
  if (property.id != null && property.id !== '') {
    return String(property.id)
  }
  const raw = property._id
  if (raw != null) {
    if (typeof raw === 'string') return raw
    if (typeof raw === 'object' && raw !== null && 'toString' in raw) {
      return (raw as { toString: () => string }).toString()
    }
  }
  return ''
}

/** Returns true if the value is a non-empty, valid-looking property id (not "undefined"). */
export function isValidPropertyId(id: string | undefined | null): boolean {
  if (id == null || id === '' || id === 'undefined') return false
  return true
}
