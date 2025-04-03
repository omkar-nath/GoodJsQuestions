function f1() {
  console.log("f1");
}

console.log("Let's do it !");

setTimeout(() => {
  console.log("In settimeout");
}, 0);

f1();
f1();
f1();
f1();
