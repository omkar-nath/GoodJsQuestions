for (var i = 0; i < 3; i++) {
  setTimeout(function(x) {
    console.log(i);
  }, 1);
}

/// 3 3 3

// Solving it to get the correct result
// with iife

for (var i = 0; i < 3; i++) {
  ((x) => {
    setTimeout(() => console.log(x), 1);
  })(i);
}

// Passing third argument in setTimeout

for (var i = 0; i < 3; i++) {
  setTimeout((x) => console.log(x), 1, i);
}
