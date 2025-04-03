function* generator(x) {
  yield x;
  yield x * 2;
}

const gen = generator(10);

console.log(gen.next().value);
console.log(gen.next().value);
