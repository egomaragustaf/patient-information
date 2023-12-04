import pluralize from "pluralize"

export function formatPluralItems(word: string, count: number) {
  return pluralize(word, count, true)
}