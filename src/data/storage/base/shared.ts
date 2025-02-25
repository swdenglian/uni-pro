export function createExpireDate(diff: number = 7): Date {
  const date = new Date()
  date.setDate(date.getDate() + diff)
  return date
}
