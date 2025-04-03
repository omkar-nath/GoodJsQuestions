Promise.myAll = function (iterable) {
  var C = this;

  if (iterable === null || typeof iterable[Symbol.iterator] !== "function") {
    throw new TypeError("Promise.all requires an iterable argument");
  }

  let arr = Array.from(iterable);

  let remainingCount = arr.length;
  let results = new Array(remainingCount);

  return new C((resolve, reject) => {
    if (remainingCount === 0) {
      resolve([]);
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      const promise = C.resolve(arr[i]);

      promise.then(
        function (value) {
          results[i] = value;
          remainingCount--;
          if (remainingCount === 0) {
            resolve(results);
          }
        },
        function (reason) {
          reject(reason);
        },
      );
    }
  });
};
// Mixed with numbers and Promises
Promise.myAll([1, Promise.resolve(2), 3]).then((value) => console.log(value));
// Empty Array

Promise.myAll([]).then((value) => console.log(value));
// Rejection handling

Promise.myAll([
  Promise.resolve(1),
  Promise.reject(new Error("Test rejection")),
  Promise.resolve(3),
]).catch((error) => {
  if (error.message === "Test rejection") {
    console.log("Failed");
  }
});

// Preserve order regardless of howmuch time the promises take

const p1 = new Promise((resolve) => setTimeout(() => resolve(1), 3000));
const p2 = new Promise((resolve) => setTimeout(() => resolve(2), 100));
const p3 = new Promise((resolve) => setTimeout(() => resolve(3), 20));

Promise.myAll([p1, p2, p3]).then((value) => {
  console.log("MyPromiseAll: Final value", value);
});

Promise.all([p1, p2, p3]).then((value) => {
  console.log("Native promise all:", value);
});

// Other iterables not just arrays

const set = new Set([1, Promise.resolve(20), 33]);

Promise.myAll(set).then(
  (value) => {
    console.log(value);
  },
  (error) => {
    console.log("Error", error);
  },
);

// Promise subclass support

class MyPromise extends Promise {}

MyPromise.myAll([1, 2, 3]).then((value) => {
  console.log("MyPromise subclass of Promise", value);
});

// Bad iterator example

const badIterable = {
  [Symbol.iterator]() {
    return {
      next() {
        throw new Error("Iteraror error");
      },
    };
  },
};

Promise.myAll(badIterable).then(_, (error) => {
  console.log("Error occurred bad iterable", error);
});
