Promise.myAllSettled = function (iterable) {
  let C = this;
  if (typeof C.resolve !== "function") {
    throw new TypeError("Promise constructor lacks resolve method");
  }

  if (iterable == null || typeof iterable[Symbol.iterator] !== "function") {
    throw new TypeError("Promise.allSettled requires an iterable argument");
  }

  let arr = Array.from(iterable);
  let remainingItems = arr.length;
  let results = new Array(remainingCount);
  return new C(function (resolve, reject) {
    if (remainingCount === 0) {
      resolve([]);
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      const promise = C.resolve(arr[i]);

      promise.then(
        (value) => {
          results[i] = {
            status: "fulfilled",
            value,
          };

          checkComplete();
        },
        (error) => {
          results[i] = {
            status: "fulfilled",
            reason: error,
          };

          checkComplete();
        },
      );
    }

    function checkComplete() {
      remainingItems--;
      if (remainingItems === 0) {
        resolve(results);
      }
    }
  });
};

const promises = [
  Promise.resolve(1),
  Promise.reject(new Error("Test rejection")),
  Promise.resolve(3),
];

Promise.allSettled(promises).then((value) => {
  console.log("Promise values", value);
});
