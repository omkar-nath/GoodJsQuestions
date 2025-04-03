const firstPromise = new Promise((res, reject) => {
  setTimeout(res, 500, "one");
});

firstPromise.then((val) => {
  console.log(val);
});
