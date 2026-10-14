const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

export const shortDate = (timestamp: number) => {
  const date = new Date(timestamp)
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}
