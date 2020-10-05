
function race() {
	let n = 1000000;
	const getStarted = function load() {
		const getStarted = () => { };
		return () => {
			for (let i = 0; i < n; i++)
				getStarted();
		}
	}();
	getStarted();
	console.log("");


	const benchmark1 = new BenchmarkNum(1);
	benchmark1.section("Primitive keys > primitive values:");
	let object = {};
	let object_setPrim = function () {
		for (let i = 0; i < n; i++)
			object[i] = i;
	};
	let object_getPrim = function () {
		let value;
		for (let i = 0; i < n; i++)
			value = object[i];
	};
	let object_modPrim = function () {
		for (let i = 0; i < n; i++)
			object[i]++;
	};
	let object_deletePrim = function () {
		for (let i = 0; i < n; i++)
			delete (object[i]);
	};
	benchmark1.measure("object_setPrim", object_setPrim);
	benchmark1.measure("object_getPrim", object_getPrim);
	benchmark1.measure("object_modPrim", object_modPrim);
	benchmark1.measure("object_deletePrim", object_deletePrim);
	console.log("");

	let map = new Map();
	let map_primSetPrim = function () {
		for (let i = 0; i < n; i++)
			map.set(1, i);
	};
	let map_primGetPrim = function () {
		let value;
		for (let i = 0; i < n; i++)
			value = map.get(i);
	};
	let map_primModPrim = function () {
		for (let i = 0; i < n; i++)
			map.set(i, map.get(i) + 1);
	};
	let map_primDeletePrim = function () {
		for (let i = 0; i < n; i++)
			map.delete(i);
	};
	benchmark1.measure("map_primSetPrim", map_primSetPrim);
	benchmark1.measure("map_primGetPrim", map_primGetPrim);
	benchmark1.measure("map_primModPrim", map_primModPrim);
	benchmark1.measure("map_primDeletePrim", map_primDeletePrim);
	console.log("\n\n");


	benchmark1.section("Primitive keys > big object values:");

	let objsBig = new Array(n);
	for (let i = 0; i < n; i++)
		objsBig[i] = {
			id: n - i, arr: [1, 2, 3, 4, 5], obj: { a: 1, b: 2, c: 3, d: 4, e: 5 }, null: null, u: "mongol", a: "monkey",
			func: () => console.log("some function..."), x: true, y: false, z: NaN, undefined: undefined, is: [false, true]
		};
	// for (let i = 0; i < n; i++)
	//     objsBig[i] = {
	//         a: { ab: { abc: { abcd: () => { } } } }, b: { bc: () => { } },
	//         c: { cd: { cde: () => { } }, ce: { cef: { cefg: () => { } } }, cf: { cfg: () => { } }, cg: { cgh: { cghi: () => { } } } },
	//         d: () => { }, e: () => { }, f: { fg: { fgh: () => { } } }, g: () => { }, h: () => { }, i: () => { }, j: () => { },
	//         x: () => { }, y: () => { }, z: { zz: { zzz: { zzzz: { zzzzz: { zzzzzz: { zzzzzzz: () => { } } } } } } }
	//     };

	object = {};
	let object_setObjBig = function () {
		for (let i = 0; i < n; i++)
			object[i] = objsBig[i];
	};
	let object_getObjBig = function () {
		let value;
		for (let i = 0; i < n; i++)
			value = object[i].id;
	};
	let object_modObjBig = function () {
		for (let i = 0; i < n; i++)
			object[i].id++;
	};
	let object_deleteObjBig = function () {
		for (let i = 0; i < n; i++)
			delete (object[i]);
	};
	benchmark1.measure("object_setObjBig", object_setObjBig);
	benchmark1.measure("object_getObjBig", object_getObjBig);
	benchmark1.measure("object_modObjBig", object_modObjBig);
	benchmark1.measure("object_deleteObjBig", object_deleteObjBig);
	console.log("");

	map = new Map();
	let map_primSetObjBig = function () {
		for (let i = 0; i < n; i++)
			map.set(i, objsBig[i]);
	};
	let map_primGetObjBig = function () {
		let value;
		for (let i = 0; i < n; i++)
			value = map.get(i).id;
	};
	let map_primModObjBig = function () {
		for (let i = 0; i < n; i++)
			map.get(i).id++;
	};
	let map_primDeleteObjBig = function () {
		for (let i = 0; i < n; i++)
			map.delete(i);
	};
	benchmark1.measure("map_primSetObjBig", map_primSetObjBig);
	benchmark1.measure("map_primGetObjBig", map_primGetObjBig);
	benchmark1.measure("map_primModObjBig", map_primModObjBig);
	benchmark1.measure("map_primDeleteObjBig", map_primDeleteObjBig);


	benchmark1.section("Primitive keys > small object values");

	let objsSmall = new Array(n);
	for (let i = 0; i < n; i++)
		objsSmall[i] = { id: n - i };

	object = {};
	let object_setObjSmall = function () {
		for (let i = 0; i < n; i++)
			object[i] = objsSmall[i];
	};
	let object_getObjSmall = function () {
		let value;
		for (let i = 0; i < n; i++)
			value = object[i].id;
	};
	let object_modObjSmall = function () {
		for (let i = 0; i < n; i++)
			object[i].id++;;
	};
	let object_deleteObjSmall = function () {
		for (let i = 0; i < n; i++)
			delete (object[i]);
	};
	benchmark1.measure("object_setObjSmall", object_setObjSmall);
	benchmark1.measure("object_getObjSmall", object_getObjSmall);
	benchmark1.measure("object_modObjSmall", object_modObjSmall);
	benchmark1.measure("object_deleteObjSmall", object_deleteObjSmall);

	map = new Map();
	let map_primSetObjSmall = function () {
		for (let i = 0; i < n; i++)
			map.set(i, objsSmall[i]);
	};
	let map_primGetObjSmall = function () {
		let value;
		for (let i = 0; i < n; i++)
			value = map.get(i).id;
	};
	let map_primModObjSmall = function () {
		for (let i = 0; i < n; i++)
			map.get(i).id++;
	};
	let map_primDeleteObjSmall = function () {
		for (let i = 0; i < n; i++)
			map.delete(i);
	};
	benchmark1.measure("map_primSetObjSmall", map_primSetObjSmall);
	benchmark1.measure("map_primGetObjSmall", map_primGetObjSmall);
	benchmark1.measure("map_primModObjSmall", map_primModObjSmall);
	benchmark1.measure("map_primDeleteObjSmall", map_primDeleteObjSmall);


	benchmark1.section("Primitive keys > small class values");
	class TestClass {
		constructor(id) {
			this.id = id;
		}
	};
	let classesSmall = new Array(n);
	for (let i = 0; i < n; i++)
		classesSmall[i] = new TestClass(n - i);

	object = {};
	let object_setClassSmall = function () {
		for (let i = 0; i < n; i++)
			object[i] = classesSmall[i];
	};
	let object_getClassSmall = function () {
		let value;
		for (let i = 0; i < n; i++)
			value = classesSmall[i].id;
	};
	let object_modClassSmall = function () {
		for (let i = 0; i < n; i++)
			classesSmall[i].id++;;
	};
	let object_deleteClassSmall = function () {
		for (let i = 0; i < n; i++)
			delete (classesSmall[i]);
	};
	benchmark1.measure("object_setClassSmall", object_setClassSmall);
	benchmark1.measure("object_getClassSmall", object_getClassSmall);
	benchmark1.measure("object_modClassSmall", object_modClassSmall);
	benchmark1.measure("object_deleteClassSmall", object_deleteClassSmall);

	let objectDefineProperty1 = function () {
		let callback = () => console.log("a");
		for (let i = 0; i < n; i++) {
			let obj = {};
			Object.defineProperty(obj, 'GET', { enumerable: true, value: callback });
		}
	};
	let objectDefineProperty2 = function () {
		let callback = () => console.log("a");
		let descriptor = { method: "GET", configurable: false, enumerable: true, value: callback, writable: false };
		// the more properties on descriptor the slower the performance of defineProperty e.g. configurable and writable
		for (let i = 0; i < n; i++) {
			let obj = {};
			Object.defineProperty(obj, descriptor.method, descriptor);
		}
	};
	let objectDefineProperty3 = function () {
		function GET(callback) {
			this.value = callback;
		};
		GET.prototype.method = "GET";
		GET.prototype.configurable = false;
		GET.prototype.enumerable = true;
		GET.prototype.writable = false;
		let callback = () => console.log("a");
		let method = new GET(callback);
		for (let i = 0; i < n; i++) {
			let obj = {};
			Object.defineProperty(obj, method.method, method);
		}
	};
	let objectDefineProperty4 = function () {
		function GET(callback) {
			this.method = "GET";
			this.value = callback;
			this.configurable = false;
			this.enumerable = true;
			this.writable = false;
		};
		let callback = () => console.log("a");
		let method = new GET(callback);
		for (let i = 0; i < n; i++) {
			let obj = {};
			Object.defineProperty(obj, method.method, method);
		}
	};
	benchmark1.measure("objectDefineProperty1", objectDefineProperty1);
	benchmark1.measure("objectDefineProperty2", objectDefineProperty2);
	benchmark1.measure("objectDefineProperty3", objectDefineProperty3);
	benchmark1.measure("objectDefineProperty4", objectDefineProperty4);


	const benchmark2 = new BenchmarkNum(1);
	benchmark2.section("Small object keys > primitive values");

	map = new Map();
	let map_objSmallSetPrim = function () {
		for (let i = 0; i < n; i++)
			map.set(objsSmall[i], i);
	};
	let map_objSmallGetPrim = function () {
		let value;
		for (let i = 0; i < n; i++)
			value = map.get(objsSmall[i]).id;
	};
	let map_objSmallModPrim = function () {
		for (let i = 0; i < n; i++)
			map.set(objsSmall[i], map.get(objsSmall[i]) + 1);
	};
	let map_objSmallDeletePrim = function () {
		for (let i = 0; i < n; i++)
			map.delete(objsSmall[i]);
	};
	benchmark2.measure("map_objSmallSetPrim", map_objSmallSetPrim);
	benchmark2.measure("map_objSmallGetPrim", map_objSmallGetPrim);
	benchmark2.measure("map_objSmallModPrim", map_objSmallModPrim);
	benchmark2.measure("map_objSmallDeletePrim", map_objSmallDeletePrim);


	benchmark2.section("Small object keys > small object values");

	map = new Map();
	let map_objSmallSetObj = function () {
		for (let i = 0; i < n; i++)
			map.set(objsSmall[i], objsSmall[i]);
	};
	let map_objSmallGetObj = function () {
		let value;
		for (let i = 0; i < n; i++)
			value = map.get(objsSmall[i]).id;
	};
	let map_objSmallModObj = function () {
		for (let i = 0; i < n; i++)
			map.get(objsSmall[i]).id++;
	};
	let map_objSmallDeleteObj = function () {
		for (let i = 0; i < n; i++)
			map.delete(objsSmall[i]);
	};
	benchmark2.measure("map_objSmallSetObj", map_objSmallSetObj);
	benchmark2.measure("map_objSmallGetObj", map_objSmallGetObj);
	benchmark2.measure("map_objSmallModObj", map_objSmallModObj);
	benchmark2.measure("map_objSmallDeleteObj", map_objSmallDeleteObj);


	benchmark2.section("Big object keys > primitive values");

	map = new Map();
	let map_objBigSetPrim = function () {
		for (let i = 0; i < n; i++)
			map.set(objsBig[i], i);
	};
	let map_objBigGetPrim = function () {
		let value;
		for (let i = 0; i < n; i++)
			value = map.get(objsBig[i]).id;
	};
	let map_objBigModPrim = function () {
		for (let i = 0; i < n; i++)
			map.set(objsBig[i], map.get(objsBig[i]) + 1);
	};
	let map_objBigDeletePrim = function () {
		for (let i = 0; i < n; i++)
			map.delete(objsBig[i]);
	};
	benchmark2.measure("map_objBigSetPrim", map_objBigSetPrim);
	benchmark2.measure("map_objBigGetPrim", map_objBigGetPrim);
	benchmark2.measure("map_objBigModPrim", map_objBigModPrim);
	benchmark2.measure("map_objBigDeletePrim", map_objBigDeletePrim);
	console.log("\n\n");


	benchmark2.section("Big object keys > big object values");

	map = new Map();
	let map_objBigSetObjBig = function () {
		for (let i = 0; i < n; i++)
			map.set(objsBig[i], objsBig[i]);
	};
	let map_objBigGetObjBig = function () {
		let value;
		for (let i = 0; i < n; i++)
			value = map.get(objsBig[i]).id;
	};
	let map_objBigModObjBig = function () {
		for (let i = 0; i < n; i++)
			map.get(objsBig[i]).id++;
	};
	let map_objBigDeleteObjBig = function () {
		for (let i = 0; i < n; i++)
			map.delete(objsBig[i]);
	};
	benchmark2.measure("map_objBigSetObjBig", map_objBigSetObjBig);
	benchmark2.measure("map_objBigGetObjBig", map_objBigGetObjBig);
	benchmark2.measure("map_objBigModObjBig", map_objBigModObjBig);
	benchmark2.measure("map_objBigDeleteObjBig", map_objBigDeleteObjBig);
	console.log("\n\n");


	const benchmark3 = new BenchmarkNum(1);
	benchmark3.section("passParameters");




	const benchmark4 = new BenchmarkTime(500);
	benchmark4.section("read properties");
	let object_readPrim1 = function () {
		object = { id: 9 };
		let value;
		return function () {
			value = object.id;
		};
	}();
	let object_readObjBig1 = function () {
		let objBig = {
			id: 9, arr: [1, 2, 3, 4, 5], obj: { a: 1, b: 2, c: 3, d: 4, e: 5 }, null: null, u: "mongol", a: "monkey",
			func: () => console.log("some function..."), x: true, y: false, z: NaN, undefined: undefined, is: [false, true]
		};
		let value;
		return function () {
			value = object.id;
		};
	}();
	let object_readPrim2 = function () {
		let objSmall = { id: 9 };
		const id = objSmall.id;
		let value;
		return function () {
			value = id;
		}
	}();
	benchmark4.measure("object_readPrim1", object_readPrim1);
	benchmark4.measure("object_readObjBig1", object_readObjBig1);
	benchmark4.measure("object_readPrim2", object_readPrim2);




	let n5 = 10000;
	const benchmark5 = new BenchmarkCallback();
	let test_ManyTimesWithCalback = function (onFinish) {
		let callback = () => {
			console.log("done with callback");
			onFinish();
		};
		let i = n5;
		let manyTimesWithCalback = function (callback) {
			if (--i === 0)
				callback();
			else
				manyTimesWithCalback(callback)
		};
		manyTimesWithCalback(callback);
	};
	let test_ManyTimesNoCallback = function (onFinish) {
		let i = n5;
		let manyTimesNoCalback = function () {
			if (--i === 0) {
				console.log("done no callback");
				onFinish();
			}
			else
				manyTimesNoCalback();
		};
		manyTimesNoCalback();
	};
	let test_ManyTimesWithObjectCalback = function (onFinish) {
		let object = {
			a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 9, cb: () => {
				console.log("done with callback in object");
				onFinish();
			}
		}
		let i = n5;
		let manyTimesWithCalbackinObject = function (object) {
			if (--i === 0)
				object.cb();
			else
				manyTimesWithCalbackinObject(object)
		};
		manyTimesWithCalbackinObject(object);
	};
	benchmark5.section("test_ManyTimesWithCalback");
	benchmark5.measure("test1", test_ManyTimesWithCalback);
	benchmark5.measure("test2", test_ManyTimesWithCalback);
	benchmark5.measure("test3", test_ManyTimesWithCalback);
	benchmark5.measure("test1", test_ManyTimesWithCalback);
	benchmark5.measure("test2", test_ManyTimesWithCalback);
	benchmark5.measure("test3", test_ManyTimesWithCalback);

	benchmark5.section("test_ManyTimesNoCallback");
	benchmark5.measure("test1", test_ManyTimesNoCallback);
	benchmark5.measure("test2", test_ManyTimesNoCallback);
	benchmark5.measure("test3", test_ManyTimesNoCallback);
	benchmark5.measure("test1", test_ManyTimesNoCallback);
	benchmark5.measure("test2", test_ManyTimesNoCallback);
	benchmark5.measure("test3", test_ManyTimesNoCallback);

	benchmark5.section("test_ManyTimesWithObjectCalback");
	benchmark5.measure("test1", test_ManyTimesWithObjectCalback);
	benchmark5.measure("test2", test_ManyTimesWithObjectCalback);
	benchmark5.measure("test3", test_ManyTimesWithObjectCalback);
	benchmark5.measure("test1", test_ManyTimesWithObjectCalback);
	benchmark5.measure("test2", test_ManyTimesWithObjectCalback);
	benchmark5.measure("test3", test_ManyTimesWithObjectCalback);





	const benchmark6 = new BenchmarkCallback();
};