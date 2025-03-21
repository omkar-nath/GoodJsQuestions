function calc(a: number) {
  return {
    add(b: number) {
      return calc(a + b);
    },
    sub(b: number) {
      return calc(a - b);
    },
    val() {
      return a;
    },
  };
}

const result = calc(1).add(5).sub(3).val();

console.log(result);
