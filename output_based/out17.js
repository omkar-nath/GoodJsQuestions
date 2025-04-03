function abc(a, b, c, d) {
  console.log(a);
  console.log(b);
  console.log(c);
  console.log(d);
}

let name = "omkar";
let age = "30";
let title = "looser";

abc`${name} is ${age} years old and is a ${title}`;

//[" ", " is ", "years old and is" , "a " , " "]
//omkar
//30
// looser
