function abc() {
  let error, y;
  try {
    throw new Error();
  } catch (error) {
    error = 1;
    console.log("Error", error);
  }
  console.log(x);
}

abc();
