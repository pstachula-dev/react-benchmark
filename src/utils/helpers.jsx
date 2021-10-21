const baseState = {};
for (let j = 0; j < 100; j++) {
  baseState[`arg${j}`] = j;
}

export function round(arg) {
  return Math.round(arg * 100) / 100;
}

export function getNodes(number) {
  return (
    <>
      {Array(parseInt(number, 10))
        .fill(0)
        .map((e, i) => (
          <span key={i}>Span1 {i} </span>
        ))}
    </>
  );
}

export function sum(args) {
  return round(args.reduce((el, acc) => (acc += el), 0));
}

export function getRandomArgs(size, deepCompare) {
  const args = {};
  for (let i = 0; i < size; i++) {
    args[`arg${i}`] = deepCompare ? baseState : i;
  }
  return args;
}

export const benchmarkName = {
  bigTree: "bigTree",
  bigTreeMemo: "bigTreeMemo"
};

export let results = {
  [benchmarkName.bigTree]: [],
  [benchmarkName.bigTreeMemo]: []
};
