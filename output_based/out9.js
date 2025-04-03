const shape = {
  radius: 19,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius,
};

console.log(shape.diameter());
console.log(shape.perimeter());

console.log(+true);
console.log(!"Omkar");
