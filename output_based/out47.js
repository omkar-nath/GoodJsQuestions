function cachedFunction(fn) {
  let cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log("Returning from cache", cache.get(key));
      return cache.get(key);
    } else {
      const result = fn(...args);
      cache.set(key, result);
      return result;
    }
  };
}

const addFunction = (a, b) => {
  return a + b;
};

const cachedAddition = cachedFunction(addFunction);

console.log(cachedAddition(10, 20));
console.log(cachedAddition(10, 20));
