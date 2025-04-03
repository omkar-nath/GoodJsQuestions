console.log(
  [
    [1, 2],
    [2, 4],
  ].reduce(
    (acc, current) => {
      return acc.concat(current);
    },
    [3, 4],
  ),
);
