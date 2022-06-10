export function isNumber(val: any): val is number {
  return Number.isFinite(val);
}