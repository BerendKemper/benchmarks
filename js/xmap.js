
function race() {
    let benchmark = new BenchmarkTime(500);
    benchmark.measure("getStarted", () => { });
    console.log("");


    console.log("Primitive keys > primitive values:");
    console.log("");

    let object_setPrim = function () {
        const object = {};
        let i = 0;
        return function () {
            object[i] = i++;
        };
    }();
    let object_getPrim = function () {
        const object = { a: 1 };
        let value;
        return function () {
            value = object.a;
        };
    }();
    let object_modPrim = function () {
        const object = { a: 1 };
        return function () {
            object.a++;
        };
    }();
    benchmark.measure("object_setPrim", object_setPrim);
    benchmark.measure("object_getPrim", object_getPrim);
    benchmark.measure("object_modPrim", object_modPrim);
    console.log("");

    let map_primSetPrim = function () {
        const map = new Map();
        let i = 0;
        return function () {
            map.set(i, i++);
        };
    }();
    let map_primGetPrim = function () {
        const map = new Map();
        map.set("a", 0);
        let value;
        return function () {
            value = map.get("a");
        };
    }();
    let map_primModPrim = function () {
        const map = new Map();
        map.set("a", 0);
        return function () {
            map.set("a", map.get("a") + 1);
        };
    }();
    benchmark.measure("map_primSetPrim", map_primSetPrim);
    benchmark.measure("map_primGetPrim", map_primGetPrim);
    benchmark.measure("map_primModPrim", map_primModPrim);
    console.log("\n\n");


    console.log("Primitive keys > big object values");
    console.log("");

    let object_setObjBig = function () {
        const object = {};
        const objBig = {
            i: 0, arr: [1, 2, 3, 4, 5], obj: { a: 1, b: 2, c: 3, d: 4, e: 5 }, null: null, u: "mongol", a: "monkey",
            func: () => console.log("some function..."), x: true, y: false, z: NaN, undefined: undefined, is: [false, true]
        };
        let i = 0;
        return function () {
            object[i++] = objBig;
        };
    }();
    let object_getObjBig = function () {
        const object = {
            objBig: {
                i: 0, arr: [1, 2, 3, 4, 5], obj: { a: 1, b: 2, c: 3, d: 4, e: 5 }, null: null, u: "mongol", a: "monkey",
                func: () => console.log("some function..."), x: true, y: false, z: NaN, undefined: undefined, is: [false, true]
            }
        };
        let value;
        return function () {
            value = object.objBig;
        };
    }();
    let object_modObjBig = function () {
        const object = {
            objBig: {
                i: 0, arr: [1, 2, 3, 4, 5], obj: { a: 1, b: 2, c: 3, d: 4, e: 5 }, null: null, u: "mongol", a: "monkey",
                func: () => console.log("some function..."), x: true, y: false, z: NaN, undefined: undefined, is: [false, true]
            }
        };
        return function () {
            object.objBig.i++;
        };
    }();
    benchmark.measure("object_setObjBig", object_setObjBig);
    benchmark.measure("object_getObjBig", object_getObjBig);
    benchmark.measure("object_modObjBig", object_modObjBig);
    console.log("");

    let map_primSetObjBig = function () {
        const map = new Map();
        const objBig = {
            i: 0, arr: [1, 2, 3, 4, 5], obj: { a: 1, b: 2, c: 3, d: 4, e: 5 }, null: null, u: "mongol", a: "monkey",
            func: () => console.log("some function..."), x: true, y: false, z: NaN, undefined: undefined, is: [false, true]
        };
        let i = 0;
        return function () {
            map.set(i++, objBig);
        };
    }();
    let map_primGetObjBig = function () {
        const map = new Map();
        map.set("a", objBig = {
            i: 0, arr: [1, 2, 3, 4, 5], obj: { a: 1, b: 2, c: 3, d: 4, e: 5 }, null: null, u: "mongol", a: "monkey",
            func: () => console.log("some function..."), x: true, y: false, z: NaN, undefined: undefined, is: [false, true]
        });
        let value;
        return function () {
            value = map.get("a");
        };
    }();
    let map_primModObjBig = function () {
        const map = new Map();
        map.set("a", objBig = {
            i: 0, arr: [1, 2, 3, 4, 5], obj: { a: 1, b: 2, c: 3, d: 4, e: 5 }, null: null, u: "mongol", a: "monkey",
            func: () => console.log("some function..."), x: true, y: false, z: NaN, undefined: undefined, is: [false, true]
        });
        return function () {
            value = map.get("a").i++;
        };
    }();
    benchmark.measure("map_primSetObjBig", map_primSetObjBig);
    benchmark.measure("map_primGetObjBig", map_primGetObjBig);
    benchmark.measure("map_primModObjBig", map_primModObjBig);
    console.log("\n\n");


    console.log("Big object keys > primitive values");
    console.log("");
    let map_objBigSetPrim = function () {
        const map = new Map();
        const objBig = {
            i: 0, arr: [1, 2, 3, 4, 5], obj: { a: 1, b: 2, c: 3, d: 4, e: 5 }, null: null, u: "mongol", a: "monkey",
            func: () => console.log("some function..."), x: true, y: false, z: NaN, undefined: undefined, is: [false, true]
        };
        let i = 0;
        return function () {
            map.set(objBig, i++);
        };
    }();
    let map_primGetPrim = function () {
        const map = new Map();
        map.set("a", 0);
        let value;
        return function () {
            value = map.get("a");
        };
    }();
    let map_primModPrim = function () {
        const map = new Map();
        map.set("a", 0);
        return function () {
            map.set("a", map.get("a") + 1);
        };
    }();
    let map_objBigSetPrim = function () {
        for (let i = 0; i < n; i++)
            map.set(objsBig[i], i);
    };
    let map_objBigGetPrim = function () {
        let value;
        for (let i = 0; i < n; i++)
            value = map.get(objsBig[i]);
    };
    let map_objBigModPrim = function () {
        for (let i = 0; i < n; i++)
            map.set(objsBig[i], map.get(objsBig[i]) + 1);
    };
    let map_objBigDeletePrim = function () {
        for (let i = 0; i < n; i++)
            map.delete(objsBig[i]);
    };
    benchmark.measure("map_objBigSetPrim", map_objBigSetPrim);
    benchmark.measure("map_objBigGetPrim", map_objBigGetPrim);
    benchmark.measure("map_objBigModPrim", map_objBigModPrim);
    benchmark.measure("map_objBigDeletePrim", map_objBigDeletePrim);
    console.log("\n\n");

    console.log("Big object keys > big object values");
    console.log("");
    let map_objBigSetObjBig = function () {
        for (let i = 0; i < n; i++)
            map.set(objsBig[i], objsBig[i]);
    };
    let map_objBigGetObjBig = function () {
        let value;
        for (let i = 0; i < n; i++)
            value = map.get(objsBig[i]);
    };
    let map_objBigModObjBig = function () {
        for (let i = 0; i < n; i++)
            map.get(objsBig[i]).id++;
    };
    let map_objBigDeleteObjBig = function () {
        for (let i = 0; i < n; i++)
            map.delete(objsBig[i]);
    };
    benchmark.measure("map_objBigSetObjBig", map_objBigSetObjBig);
    benchmark.measure("map_objBigGetObjBig", map_objBigGetObjBig);
    benchmark.measure("map_objBigModObjBig", map_objBigModObjBig);
    benchmark.measure("map_objBigDeleteObjBig", map_objBigDeleteObjBig);
    console.log("\n\n");

    console.log("Primitive keys > small object values");
    console.log("");
    let objsSmall = new Array(n);
    for (let i = 0; i < n; i++)
        objsSmall[i] = { id: 1000000 - i };

    let object_setObjSmall = function () {
        for (let i = 0; i < n; i++)
            object[i] = objsSmall[i];
    };
    let object_getObjSmall = function () {
        let value;
        for (let i = 0; i < n; i++)
            value = object[i];
    };
    let object_modObjSmall = function () {
        for (let i = 0; i < n; i++)
            object[i].id++;;
    };
    let object_deleteObjSmall = function () {
        for (let i = 0; i < n; i++)
            delete (object[i]);
    };
    benchmark.measure("object_setObjSmall", object_setObjSmall);
    benchmark.measure("object_getObjSmall", object_getObjSmall);
    benchmark.measure("object_modObjSmall", object_modObjSmall);
    benchmark.measure("object_deleteObjSmall", object_deleteObjSmall);
    console.log("");

    let map_primSetObjSmall = function () {
        for (let i = 0; i < n; i++)
            map.set(i, objsSmall[i]);
    };
    let map_primGetObjSmall = function () {
        let value;
        for (let i = 0; i < n; i++)
            value = map.get(i);
    };
    let map_primModObjSmall = function () {
        for (let i = 0; i < n; i++)
            map.get(i).id++;
    };
    let map_primDeleteObjSmall = function () {
        for (let i = 0; i < n; i++)
            map.delete(i);
    };
    benchmark.measure("map_primSetObjSmall", map_primSetObjSmall);
    benchmark.measure("map_primGetObjSmall", map_primGetObjSmall);
    benchmark.measure("map_primModObjSmall", map_primModObjSmall);
    benchmark.measure("map_primDeleteObjSmall", map_primDeleteObjSmall);
    console.log("\n\n");

    console.log("Small object keys > primitive values");
    console.log("");
    let map_objSmallSetPrim = function () {
        for (let i = 0; i < n; i++)
            map.set(objsSmall[i], i);
    };
    let map_objSmallGetPrim = function () {
        let value;
        for (let i = 0; i < n; i++)
            value = map.get(objsSmall[i]);
    };
    let map_objSmallModPrim = function () {
        for (let i = 0; i < n; i++)
            map.set(objsSmall[i], map.get(objsSmall[i]) + 1);
    };
    let map_objSmallDeletePrim = function () {
        for (let i = 0; i < n; i++)
            map.delete(objsSmall[i]);
    };
    benchmark.measure("map_objSmallSetPrim", map_objSmallSetPrim);
    benchmark.measure("map_objSmallGetPrim", map_objSmallGetPrim);
    benchmark.measure("map_objSmallModPrim", map_objSmallModPrim);
    benchmark.measure("map_objSmallDeletePrim", map_objSmallDeletePrim);
    console.log("\n\n");

    console.log("Small object keys > small object values");
    console.log("");
    let map_objSmallSetObj = function () {
        for (let i = 0; i < n; i++)
            map.set(objsSmall[i], objsSmall[i]);
    };
    let map_objSmallGetObj = function () {
        let value;
        for (let i = 0; i < n; i++)
            value = map.get(objsSmall[i]);
    };
    let map_objSmallModObj = function () {
        for (let i = 0; i < n; i++)
            map.get(objsSmall[i]).id++;
    };
    let map_objSmallDeleteObj = function () {
        for (let i = 0; i < n; i++)
            map.delete(objsSmall[i]);
    };
    benchmark.measure("map_objSmallSetObj", map_objSmallSetObj);
    benchmark.measure("map_objSmallGetObj", map_objSmallGetObj);
    benchmark.measure("map_objSmallModObj", map_objSmallModObj);
    benchmark.measure("map_objSmallDeleteObj", map_objSmallDeleteObj);
    console.log("\n\n");
};