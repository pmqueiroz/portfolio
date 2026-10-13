export const entryNumber = (total: number, index: number) =>
  String(total - index).padStart(3, '0')
