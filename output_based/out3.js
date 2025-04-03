new Promise((resolve, reject) => {
  resolve(1);
  resolve(2);
  reject("Error");
}).then(
  (value) => console.log(value),
  (error) => console.log("error"),
);
