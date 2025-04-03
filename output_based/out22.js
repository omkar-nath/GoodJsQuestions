const a = {};
const b = { key: "b" };
const c = { key: "c" };

a[b] = 123;
a[c] = 455;

console.log(a);
