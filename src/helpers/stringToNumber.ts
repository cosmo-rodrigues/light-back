export function stringToFloat(str: string) {
  const replaceCommaWithDot = str.replace(/,/g, '.');
  const parsed = parseFloat(replaceCommaWithDot).toFixed(10);
  return Number(parsed);
}

export function stringToInteger(str: string) {
  const replaceCommaWithDot = str.replace(/,/g, '.');
  return parseInt(replaceCommaWithDot);
}
