export function removeDuplicatesByProp<T>(arr: T[], prop: keyof T) {
  return arr.filter((entry, index, array) => array.findIndex(e => (e[prop] === entry[prop])) === index);
}

export function isArrayOfType<T>(value: any, validityFn: (val: any) => val is T): value is T[] {
  return Array.isArray(value) && value.every((str: any) => validityFn(str))
}