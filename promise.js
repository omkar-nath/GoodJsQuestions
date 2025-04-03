function wait(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

const timeoutPromise = wait(1000);

timeoutPromise.then(() => {
  console.log("1 second later");
});

const p1 = new Promise((resolve, reject) => {
  resolve("Hello from other side!");
});

p1.then((result) => {
  console.log("Result", result);
}).then((result) => console.log("Hello", result));
