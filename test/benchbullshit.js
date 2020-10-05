let times = 1000000;
function benchmark(name, callback, ...params) {
    console.time(name);
    for (let i = 0; i < times; i++)
        callback(...params);
    console.timeEnd(name);
};

function fArgs() {
    return arguments;
};
function fParams(...params) {
    return params;
};
console.log("fArgs", fArgs(1, 2, 3, "a", "b", "c", true, false, {}, [], () => { }));
console.log("fParams", fParams(1, 2, 3, "a", "b", "c", true, false, {}, [], () => { }));

function race() {
    benchmark("get started", () => { });
    benchmark("fArgs", fArgs, 1, 2, 3, "a", "b", "c", true, false, {}, [], () => { });
    benchmark("fParams", fParams, 1, 2, 3, "a", "b", "c", true, false, {}, [], () => { });
};
race();