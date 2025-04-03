function callMe(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Called");
      resolve();
    }, delay);
  });
}

const delays = [400, 1000, 1500];

(async () => {
  for (let delay of delays) {
    await callMe(delay);
  }

  console.log("Completed");
})();
