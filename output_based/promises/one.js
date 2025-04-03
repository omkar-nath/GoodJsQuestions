Promise.resolve().then(() => console.log(1));

setTimeout(() => console.log(2), 10);

queueMicrotask(() => {
  console.log(3);

  queueMicrotask(() => console.log(4));
});

console.log(5);

////////////

let pr = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Done!"), 1000);
});

pr.then(
  (result) => console.log(result),
  (error) => console.log(error),
);

/// Understanding finally

new Promise((resolve, reject) => {
  setTimeout(() => resolve("Value"), 2000);
})
  .finally(() => console.log("Promise ready"))
  .then((result) => console.log("Result", result));

new Promise((_, reject) => {
  throw new Error("Error occured");
})
  .finally(() => console.log("Promise ready"))
  .catch((error) => console.log("Error occured", error));
