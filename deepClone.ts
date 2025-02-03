export default function deepClone<T>(value: T): T {
  let cloneObj = {};
  if (value === null || typeof value !== "object") return value;

  if (Array.isArray(value)) {
    let cloneArray: any[] = [];
    for (let i = 0; i < value.length; i++) {
      cloneArray.push(deepClone(value[i]));
    }
    return cloneArray as T;
  } else {
    Object.keys(value).forEach((key) => {
      cloneObj[key] = deepClone(value[key]);
    });
  }
  return cloneObj as T;
}
