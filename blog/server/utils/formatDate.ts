export function formatDate(date: string) {
  const tmp = new Date(date);
  return `${tmp.getFullYear()}-${tmp.getMonth() + 1}-${tmp.getDate()}`;
}
