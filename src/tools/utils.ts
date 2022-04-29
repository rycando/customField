export function isDate(dateStr: string) {
  return !isNaN(new Date(dateStr).getDate())
}
