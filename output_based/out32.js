function greeting() {
  throw "Hello World!";
}

function sayHi() {
  try {
    const data = greeting();
    console.log("It worked", data);
  } catch (error) {
    console.log("Oh no an errorl", error);
  }
}

sayHi();
