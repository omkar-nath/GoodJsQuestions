function* startGame() {
  const answer = yield "Do you love javascript?";
  if (answer !== "yes") {
    return "Oh you fucker!";
  }
  return "Tussi great ho!";
}

const game = startGame();

console.log(game.next().value);
console.log(game.next("yes").value);
