
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

	// for (let i = 0; i < n; i++)
	//     objsBig[i] = {
	//         a: { ab: { abc: { abcd: () => { } } } }, b: { bc: () => { } },
	//         c: { cd: { cde: () => { } }, ce: { cef: { cefg: () => { } } }, cf: { cfg: () => { } }, cg: { cgh: { cghi: () => { } } } },
	//         d: () => { }, e: () => { }, f: { fg: { fgh: () => { } } }, g: () => { }, h: () => { }, i: () => { }, j: () => { },
	//         x: () => { }, y: () => { }, z: { zz: { zzz: { zzzz: { zzzzz: { zzzzzz: { zzzzzzz: () => { } } } } } } }
	//     };

	let objsBig = new Array(n);
	for (let i = 0; i < n; i++)
		objsBig[i] = {
			id: n - i, arr: [1, 2, 3, 4, 5], obj: { a: 1, b: 2, c: 3, d: 4, e: 5 }, null: null, u: "mongol", a: "monkey",
			func: () => console.log("some function..."), x: true, y: false, z: NaN, undefined: undefined, is: [false, true]
		};

	let objsSmall = new Array(n);
	for (let i = 0; i < n; i++)
		objsSmall[i] = { id: n - i };

	class TestClassBig {
		constructor(id) {
			this.id = id;
			this.arr = [1, 2, 3, 4, 5];
			this.obj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
			this.null = null;
			this.u = "mongol";
			this.a = "monkey";
			this.func = () => console.log("some function...")
			this.x = true;
			this.y = false;
			this.z = NaN;
			this.undefined = undefined;
			this.is = [false, true];
		}
	};
	let classesBig = new Array(n);
	for (let i = 0; i < n; i++)
		classesBig[i] = new TestClassBig(n - i);

	class TestClassSmall {
		constructor(id) {
			this.id = id;
		}
	};
	let classesSmall = new Array(n);
	for (let i = 0; i < n; i++)
		classesSmall[i] = new TestClassSmall(n - i);

	let object = {};




	const benchmark1 = new BenchmarkNum(1);
	benchmark1.section("Object primitive keys > primitive values:");
	object = {};
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


	benchmark1.section("Object primitive keys > big object values:");
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


	benchmark1.section("Object primitive keys > small object values");
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


	// benchmark1.section("DefineProperty");
	// let objectDefineProperty1 = function () {
	// 	let callback = () => console.log("a");
	// 	for (let i = 0; i < n; i++) {
	// 		let obj = {};
	// 		Object.defineProperty(obj, 'GET', { enumerable: true, value: callback });
	// 	}
	// };
	// let objectDefineProperty2 = function () {
	// 	let callback = () => console.log("a");
	// 	let descriptor = { method: "GET", configurable: false, enumerable: true, value: callback, writable: false };
	// 	// the more properties on descriptor the slower the performance of defineProperty e.g. configurable and writable
	// 	for (let i = 0; i < n; i++) {
	// 		let obj = {};
	// 		Object.defineProperty(obj, descriptor.method, descriptor);
	// 	}
	// };
	// let objectDefineProperty3 = function () {
	// 	function GET(callback) {
	// 		this.value = callback;
	// 	};
	// 	GET.prototype.method = "GET";
	// 	GET.prototype.configurable = false;
	// 	GET.prototype.enumerable = true;
	// 	GET.prototype.writable = false;
	// 	let callback = () => console.log("a");
	// 	let method = new GET(callback);
	// 	for (let i = 0; i < n; i++) {
	// 		let obj = {};
	// 		Object.defineProperty(obj, method.method, method);
	// 	}
	// };
	// let objectDefineProperty4 = function () {
	// 	function GET(callback) {
	// 		this.method = "GET";
	// 		this.value = callback;
	// 		this.configurable = false;
	// 		this.enumerable = true;
	// 		this.writable = false;
	// 	};
	// 	let callback = () => console.log("a");
	// 	let method = new GET(callback);
	// 	for (let i = 0; i < n; i++) {
	// 		let obj = {};
	// 		Object.defineProperty(obj, method.method, method);
	// 	}
	// };
	// benchmark1.measure("objectLiteral", objectDefineProperty1);
	// benchmark1.measure("objectLiteralDescriptor", objectDefineProperty2);
	// benchmark1.measure("classPrototypeDescriptor", objectDefineProperty3);
	// benchmark1.measure("classPropertyDescriptor", objectDefineProperty4);





	const benchmark2 = new BenchmarkNum(1);
	benchmark2.section("_______________empty_______________");

	benchmark2.section("Object primitive keys > big class values");
	object = {};
	let object_setClassBig = function () {
		for (let i = 0; i < n; i++)
			object[i] = classesBig[i];
	};
	let object_getClassBig = function () {
		let value;
		for (let i = 0; i < n; i++)
			value = object[i].id;
	};
	let object_modClassBig = function () {
		for (let i = 0; i < n; i++)
			object[i].id++;;
	};
	let object_deleteClassBig = function () {
		for (let i = 0; i < n; i++)
			delete (object[i]);
	};
	benchmark2.measure("object_setClassBig", object_setClassBig);
	benchmark2.measure("object_getClassBig", object_getClassBig);
	benchmark2.measure("object_modClassBig", object_modClassBig);
	benchmark2.measure("object_deleteClassBig", object_deleteClassBig);


	benchmark2.section("Object primitive keys > small class values");
	object = {};
	let object_setClassSmall = function () {
		for (let i = 0; i < n; i++)
			object[i] = classesSmall[i];
	};
	let object_getClassSmall = function () {
		let value;
		for (let i = 0; i < n; i++)
			value = object[i].id;
	};
	let object_modClassSmall = function () {
		for (let i = 0; i < n; i++)
			object[i].id++;;
	};
	let object_deleteClassSmall = function () {
		for (let i = 0; i < n; i++)
			delete (object[i]);
	};
	benchmark2.measure("object_setClassSmall", object_setClassSmall);
	benchmark2.measure("object_getClassSmall", object_getClassSmall);
	benchmark2.measure("object_modClassSmall", object_modClassSmall);
	benchmark2.measure("object_deleteClassSmall", object_deleteClassSmall);





	const benchmark3 = new BenchmarkNum(1);
	benchmark3.section("Map primitive keys > primitive values:");
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
	benchmark3.measure("map_primSetPrim", map_primSetPrim);
	benchmark3.measure("map_primGetPrim", map_primGetPrim);
	benchmark3.measure("map_primModPrim", map_primModPrim);
	benchmark3.measure("map_primDeletePrim", map_primDeletePrim);
	console.log("\n\n");


	benchmark3.section("Map primitive keys > big object values:");
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
	benchmark3.measure("map_primSetObjBig", map_primSetObjBig);
	benchmark3.measure("map_primGetObjBig", map_primGetObjBig);
	benchmark3.measure("map_primModObjBig", map_primModObjBig);
	benchmark3.measure("map_primDeleteObjBig", map_primDeleteObjBig);


	benchmark3.section("Map primitive keys > small object values:");
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
	benchmark3.measure("map_primSetObjSmall", map_primSetObjSmall);
	benchmark3.measure("map_primGetObjSmall", map_primGetObjSmall);
	benchmark3.measure("map_primModObjSmall", map_primModObjSmall);
	benchmark3.measure("map_primDeleteObjSmall", map_primDeleteObjSmall);





	const benchmark4 = new BenchmarkNum(1);
	benchmark4.section("Small object keys > primitive values");
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
	benchmark4.measure("map_objSmallSetPrim", map_objSmallSetPrim);
	benchmark4.measure("map_objSmallGetPrim", map_objSmallGetPrim);
	benchmark4.measure("map_objSmallModPrim", map_objSmallModPrim);
	benchmark4.measure("map_objSmallDeletePrim", map_objSmallDeletePrim);


	benchmark4.section("Small object keys > small object values");
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
	benchmark4.measure("map_objSmallSetObj", map_objSmallSetObj);
	benchmark4.measure("map_objSmallGetObj", map_objSmallGetObj);
	benchmark4.measure("map_objSmallModObj", map_objSmallModObj);
	benchmark4.measure("map_objSmallDeleteObj", map_objSmallDeleteObj);


	benchmark4.section("Big object keys > primitive values");
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
	benchmark4.measure("map_objBigSetPrim", map_objBigSetPrim);
	benchmark4.measure("map_objBigGetPrim", map_objBigGetPrim);
	benchmark4.measure("map_objBigModPrim", map_objBigModPrim);
	benchmark4.measure("map_objBigDeletePrim", map_objBigDeletePrim);
	console.log("\n\n");


	benchmark4.section("Big object keys > big object values");
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
	benchmark4.measure("map_objBigSetObjBig", map_objBigSetObjBig);
	benchmark4.measure("map_objBigGetObjBig", map_objBigGetObjBig);
	benchmark4.measure("map_objBigModObjBig", map_objBigModObjBig);
	benchmark4.measure("map_objBigDeleteObjBig", map_objBigDeleteObjBig);
	console.log("\n\n");





	const benchmark5 = new BenchmarkTime(500);
	benchmark5.section("read properties");
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
	benchmark5.measure("object_readPrim1", object_readPrim1);
	benchmark5.measure("object_readObjBig1", object_readObjBig1);
	benchmark5.measure("object_readPrim2", object_readPrim2);




	let n5 = 10000;
	const benchmark6 = new BenchmarkCallback();
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
	benchmark6.section("test_ManyTimesWithCalback");
	benchmark6.measure("test1", test_ManyTimesWithCalback);
	benchmark6.measure("test2", test_ManyTimesWithCalback);
	benchmark6.measure("test3", test_ManyTimesWithCalback);
	benchmark6.measure("test1", test_ManyTimesWithCalback);
	benchmark6.measure("test2", test_ManyTimesWithCalback);
	benchmark6.measure("test3", test_ManyTimesWithCalback);

	benchmark6.section("test_ManyTimesNoCallback");
	benchmark6.measure("test1", test_ManyTimesNoCallback);
	benchmark6.measure("test2", test_ManyTimesNoCallback);
	benchmark6.measure("test3", test_ManyTimesNoCallback);
	benchmark6.measure("test1", test_ManyTimesNoCallback);
	benchmark6.measure("test2", test_ManyTimesNoCallback);
	benchmark6.measure("test3", test_ManyTimesNoCallback);

	benchmark6.section("test_ManyTimesWithObjectCalback");
	benchmark6.measure("test1", test_ManyTimesWithObjectCalback);
	benchmark6.measure("test2", test_ManyTimesWithObjectCalback);
	benchmark6.measure("test3", test_ManyTimesWithObjectCalback);
	benchmark6.measure("test1", test_ManyTimesWithObjectCalback);
	benchmark6.measure("test2", test_ManyTimesWithObjectCalback);
	benchmark6.measure("test3", test_ManyTimesWithObjectCalback);






	const benchmark7 = new BenchmarkNum(1);
	n6 = 1000000;
	let test_anonymousCallback = function () {
		let counter = 0;
		for (let ix = 0; ix < n6; ix++) {
			(() => {
				counter++;
			})();
		}
		console.log(counter); // should be 1000000
	};
	let test_protoCallback = function () {
		let counter = 0;
		let proto_callback = () => {
			counter++;
		};
		for (let ix = 0; ix < n6; ix++) {
			proto_callback();
		}
		console.log(counter); // should be 1000000
	};
	benchmark7.section("test anonymously created vs prototype function ");
	benchmark7.measure("test_anonymousCallback", test_anonymousCallback);
	benchmark7.measure("test_anonymousCallback", test_anonymousCallback);
	benchmark7.measure("test_anonymousCallback", test_anonymousCallback);
	benchmark7.measure("test_anonymousCallback", test_anonymousCallback);
	benchmark7.measure("test_anonymousCallback", test_anonymousCallback);
	benchmark7.measure("test_protoCallback", test_protoCallback);
	benchmark7.measure("test_protoCallback", test_protoCallback);
	benchmark7.measure("test_protoCallback", test_protoCallback);
	benchmark7.measure("test_protoCallback", test_protoCallback);
	benchmark7.measure("test_protoCallback", test_protoCallback);
};