export function round(arg) {
    return Math.round(arg * 100) / 100;
}

export function onNextFrame(callback) {
    setTimeout(function () {
        requestAnimationFrame(callback)
    })
}

export function getNodes(number) {    
    return <span>
        {Array(parseInt(number)).fill(0).map((e, i) => (
            <span key={i}>Span1 {i} </span>
        ))}
  </span>
}

export function avg(args) {
    const result = args.reduce((a, b) => a + b, 0) / args.length || 0;
    return round(result);
}

export function sum(args) {
    return round(args.reduce((el, acc) => acc += el, 0));
}

export function getRandomArgs(size) {
    const args = {};
    for (let i = 0; i < size; i++) {
        args[`arg-${i}`] = i;
    }
    return args;
}

export const benchmarkName = {
    bigTree: 'bigTree',
    bigTreeMemo: 'bigTreeMemo'
}

export let results = {
    [benchmarkName.bigTree]: [],
    [benchmarkName.bigTreeMemo]: [],
};