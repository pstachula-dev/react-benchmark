export function onNextFrame(callback) {
    setTimeout(function () {
        requestAnimationFrame(callback)
    })
}

export function avg(args) {
    return args.reduce((a, b) => a + b, 0) / args.length || 0;
}