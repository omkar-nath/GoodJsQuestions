export default function deepEqual(valueA: unknown, valueB: unknown): boolean {
  // If types are different, return false
  if (typeof valueA !== typeof valueB) {
    return false;
  }

  // If both are null or not objects, perform a strict equality check
  if (
    valueA === null ||
    typeof valueA !== "object" ||
    valueB === null ||
    typeof valueB !== "object"
  ) {
    return valueA === valueB;
  }

  // If one is an array and the other is not, return false
  if (Array.isArray(valueA) !== Array.isArray(valueB)) {
    return false;
  }

  // If both are arrays, compare their elements
  if (Array.isArray(valueA) && Array.isArray(valueB)) {
    if (valueA.length !== valueB.length) {
      return false;
    }
    for (let i = 0; i < valueA.length; i++) {
      // Recursively compare each element
      if (!deepEqual(valueA[i], valueB[i])) {
        return false;
      }
    }
    return true;
  }

  // If both are objects, compare their properties
  const keysA = Object.keys(valueA as object);
  const keysB = Object.keys(valueB as object);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (
      !keysB.includes(key) ||
      !deepEqual((valueA as any)[key], (valueB as any)[key])
    ) {
      return false;
    }
  }

  return true;
}
