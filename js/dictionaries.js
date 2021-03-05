function race() {
	setTimeout(async () => {

		const aSecond = function () {
			return new Promise(resolve => {
				setTimeout(() => {
					resolve();
				}, 500);
			});
		};

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

		// class TestClassBig {
		// 	constructor(id) {
		// 		this.id = id;
		// 		this.arr = [1, 2, 3, 4, 5];
		// 		this.obj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
		// 		this.null = null;
		// 		this.u = "mongol";
		// 		this.a = "monkey";
		// 		this.func = () => console.log("some function...")
		// 		this.x = true;
		// 		this.y = false;
		// 		this.z = NaN;
		// 		this.undefined = undefined;
		// 		this.is = [false, true];
		// 	}
		// };
		function TestClassBig(id) {
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

		};
		let classesBig = new Array(n);
		for (let i = 0; i < n; i++)
			classesBig[i] = new TestClassBig(n - i);

		// class TestClassSmall {
		// 	constructor(id) {
		// 		this.id = id;
		// 	}
		// };
		function TestClassSmall(id) {
			this.id = id;
		};
		let classesSmall = new Array(n);
		for (let i = 0; i < n; i++)
			classesSmall[i] = new TestClassSmall(n - i);

		let object = {};
		let benchmark;










		//*
		benchmark = new BenchmarkNum(1);
		await aSecond();

		benchmark.section("Object primitive keys > primitive values:");
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
		// const testVar = 15;
		// let getVar = function () {
		// 	let value;
		// 	for (let i = 0; i < n; i++)
		// 		value = testVar;
		// };
		let object_modPrim = function () {
			for (let i = 0; i < n; i++)
				object[i]++;
		};
		let object_deletePrim = function () {
			for (let i = 0; i < n; i++)
				delete (object[i]);
		};
		await benchmark.measure("object setPrim", object_setPrim);
		await benchmark.measure("object getPrim", object_getPrim);
		// await benchmark.measure("getVar", getVars);
		await benchmark.measure("object modPrim", object_modPrim);
		await benchmark.measure("object deletePrim", object_deletePrim);
		console.log("");

		await aSecond();

		benchmark.section("Object primitive keys > big object values:");
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
		await benchmark.measure("object setObjBig", object_setObjBig);
		await benchmark.measure("object getObjBig", object_getObjBig);
		await benchmark.measure("object modObjBig", object_modObjBig);
		await benchmark.measure("object deleteObjBig", object_deleteObjBig);
		console.log("");

		await aSecond();

		benchmark.section("Object primitive keys > small object values");
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
		await benchmark.measure("object setObjSmall", object_setObjSmall);
		await benchmark.measure("object getObjSmall", object_getObjSmall);
		await benchmark.measure("object modObjSmall", object_modObjSmall);
		await benchmark.measure("object deleteObjSmall", object_deleteObjSmall);
		//*/











		//*
		benchmark = new BenchmarkNum(1);
		await aSecond();

		benchmark.section("_______________empty_______________");

		benchmark.section("Object primitive keys > big class values");
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
		await benchmark.measure("object setClassBig", object_setClassBig);
		await benchmark.measure("object getClassBig", object_getClassBig);
		await benchmark.measure("object modClassBig", object_modClassBig);
		await benchmark.measure("object deleteClassBig", object_deleteClassBig);

		await aSecond();

		benchmark.section("Object primitive keys > small class values");
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
		await benchmark.measure("object setClassSmall", object_setClassSmall);
		await benchmark.measure("object getClassSmall", object_getClassSmall);
		await benchmark.measure("object modClassSmall", object_modClassSmall);
		await benchmark.measure("object deleteClassSmall", object_deleteClassSmall);
		//*/










		//*
		benchmark = new BenchmarkNum(1);
		await aSecond();

		benchmark.section("Object.defineSuckerty primitive keys > primitive values:");
		object = {};
		let defineSuck_setPrim = function () {
			for (let i = 0; i < n; i++)
				Object.defineProperty(object, i, { value: i });
		};
		let defineSuck_getPrim = function () {
			let value;
			for (let i = 0; i < n; i++)
				value = object[i];
		};
		let defineSuck_modPrim = function () {
			for (let i = 0; i < n; i++)
				object[i]++;
		};
		let defineSuck_deletePrim = function () {
			for (let i = 0; i < n; i++)
				delete (object[i]);
		};
		await benchmark.measure("defineSuck setPrim", defineSuck_setPrim);
		await benchmark.measure("defineSuck getPrim", defineSuck_getPrim);
		// await benchmark.measure("define modPrim", define_modPrim);
		// await benchmark.measure("define deletePrim", define_deletePrim);
		console.log("");

		await aSecond();

		benchmark.section("Object.defineGetterty primitive keys > primitive values:");
		object = {};
		let defineGet_setPrim = function () {
			for (let i = 0; i < n; i++)
				Object.defineProperty(object, i, {
					get() {
						return i;
					}
				});
		};
		let defineGet_getPrim = function () {
			let value;
			for (let i = 0; i < n; i++)
				value = object[i];
		};
		let defineGet_modPrim = function () {
			for (let i = 0; i < n; i++)
				object[i]++;
		};
		let defineGet_deletePrim = function () {
			for (let i = 0; i < n; i++)
				delete (object[i]);
		};
		await benchmark.measure("defineGet setPrim", defineGet_setPrim);
		await benchmark.measure("defineGet getPrim", defineGet_getPrim);
		// await benchmark.measure("define modPrim", define_modPrim);
		// await benchmark.measure("define deletePrim", define_deletePrim);
		console.log("");

		await aSecond();

		benchmark.section("Object.defineFuncerty primitive keys > primitive values:");
		object = {};
		let defineFunc_setPrim = function () {
			for (let i = 0; i < n; i++)
				Object.defineProperty(object, i, {
					value() {
						return i;
					}
				});
		};
		let defineFunc_getPrim = function () {
			let value;
			for (let i = 0; i < n; i++)
				value = object[i]();
		};
		// let defineFunc_modPrim = function () {
		// 	for (let i = 0; i < n; i++)
		// 		object[i]++;
		// };
		// let defineFunc_deletePrim = function () {
		// 	for (let i = 0; i < n; i++)
		// 		delete (object[i]);
		// };
		await benchmark.measure("defineFunc setPrim", defineFunc_setPrim);
		await benchmark.measure("defineFunc getPrim", defineFunc_getPrim);
		// await benchmark.measure("defineFunc modPrim", defineFunc_modPrim);
		// await benchmark.measure("defineFunc deletePrim", defineFunc_deletePrim);
		console.log("");
		//*/










		//*
		benchmark = new BenchmarkNum(1);
		await aSecond();
		let symboldata;

		benchmark.section("symboldata primitive keys > big object values:");
		object = {};
		symboldata = {};
		let symboldata_setObjBig = function () {
			for (let i = 0; i < n; i++) {
				object[i] = Symbol("key");
				symboldata[object[i]] = objsBig[i];
			}
		};
		let symboldata_getObjBig = function () {
			let value;
			for (let i = 0; i < n; i++)
				value = symboldata[object[i]].id;
		};
		let symboldata_modObjBig = function () {
			for (let i = 0; i < n; i++)
				symboldata[object[i]].id++;
		};
		let symboldata_deleteObjBig = function () {
			for (let i = 0; i < n; i++)
				delete (symboldata[object[i]]);
		};
		await benchmark.measure("symboldata setObjBig", symboldata_setObjBig);
		await benchmark.measure("symboldata getObjBig", symboldata_getObjBig);
		await benchmark.measure("symboldata modObjBig", symboldata_modObjBig);
		await benchmark.measure("symboldata deleteObjBig", symboldata_deleteObjBig);
		console.log("");

		await aSecond();

		benchmark.section("symboldata primitive keys > small object values");
		object = {};
		symboldata = {};
		let symboldata_setObjSmall = function () {
			for (let i = 0; i < n; i++) {
				object[i] = Symbol("key");
				symboldata[object[i]] = objsBig[i];
			}
		};
		let symboldata_getObjSmall = function () {
			let value;
			for (let i = 0; i < n; i++)
				value = symboldata[object[i]].id;
		};
		let symboldata_modObjSmall = function () {
			for (let i = 0; i < n; i++)
				symboldata[object[i]].id++;
		};
		let symboldata_deleteObjSmall = function () {
			for (let i = 0; i < n; i++)
				delete (symboldata[object[i]]);
		};
		await benchmark.measure("symboldata setObjSmall", symboldata_setObjSmall);
		await benchmark.measure("symboldata getObjSmall", symboldata_getObjSmall);
		await benchmark.measure("symboldata modObjSmall", symboldata_modObjSmall);
		await benchmark.measure("symboldata deleteObjSmall", symboldata_deleteObjSmall);
		//*/









		//*
		benchmark = new BenchmarkNum(1);
		await aSecond();

		benchmark.section("function primitive keys > primitive values:");
		object = {};
		let function_setPrim = function () {
			for (let i = 0; i < n; i++)
				object[i] = function () { return i; };
			// Object.assign(object, i, {
			// 	[i]() {
			// 		return i;
			// 	}
			// });
			// object[i] = value => {
			// 	if (value)
			// 		return i = value;
			// 	return i;
			// };
		};
		let function_getPrim = function () {
			let value;
			for (let i = 0; i < n; i++)
				value = object[i]();
		};
		let function_modPrim = function () {
			for (let i = 0; i < n; i++)
				object[i](object[i]() + 1);
		};
		await benchmark.measure("function setPrim", function_setPrim);
		await benchmark.measure("function getPrim", function_getPrim);
		// await benchmark.measure("function modPrim", function_modPrim);
		console.log("");

		await aSecond();

		benchmark.section("function primitive keys > big object values:");
		object = {};
		let function_setObjBig = function () {
			for (let i = 0; i < n; i++)
				object[i] = function () { return objsBig[i]; };
			// Object.assign(object, i, {
			// 	[i]() {
			// 		return objsBig[i];
			// 	}
			// });
			// object[i] = value => {
			// 	if (value)
			// 		return objsBig[i] = value;
			// 	return objsBig[i];
			// };
		};
		let function_getObjBig = function () {
			let value;
			for (let i = 0; i < n; i++)
				value = object[i]().id;
		};
		let function_modObjBig = function () {
			for (let i = 0; i < n; i++)
				object[i]().id++;
		};
		await benchmark.measure("function setObjBig", function_setObjBig);
		await benchmark.measure("function getObjBig", function_getObjBig);
		// await benchmark.measure("function modObjBig", function_modObjBig);
		console.log("");

		await aSecond();

		benchmark.section("function primitive keys > small object values");
		object = {};
		let function_setObjSmall = function () {
			for (let i = 0; i < n; i++)
				object[i] = function () { return objsSmall[i]; };
			// Object.assign(object, i, {
			// 	[i]() {
			// 		return objsSmall[i];
			// 	}
			// });
			// object[i] = value => {
			// 	if (value)
			// 		return objsSmall[i] = value;
			// 	return objsSmall[i];
			// };
		};
		let function_getObjSmall = function () {
			let value;
			for (let i = 0; i < n; i++)
				value = object[i]().id;
		};
		let function_modObjSmall = function () {
			for (let i = 0; i < n; i++)
				object[i]().id++;;
		};
		await benchmark.measure("function setObjSmall", function_setObjSmall);
		await benchmark.measure("function getObjSmall", function_getObjSmall);
		// await benchmark.measure("function modObjSmall", function_modObjSmall);
		//*/









		//*
		benchmark = new BenchmarkNum(1);
		await aSecond();

		benchmark.section("funcAccess symKey primitive keys > primitive values:");
		object = {};
		const accessKey = Symbol("Access Key");
		let funcAccess_symKey_setPrim = function () {
			for (let i = 0; i < n; i++)
				object[i] = key => key === accessKey ? i : null;
		};
		let funcAccess_symKey_getPrim = function () {
			let value;
			for (let i = 0; i < n; i++)
				value = object[i](accessKey);
		};
		await benchmark.measure("funcAccess_symKey setPrim", funcAccess_symKey_setPrim);
		await benchmark.measure("funcAccess_symKey getPrim", funcAccess_symKey_getPrim);
		console.log("");

		await aSecond();

		benchmark.section("funcAccess_symKey primitive keys > big object values:");
		object = {};
		let funcAccess_symKey_setObjBig = function () {
			for (let i = 0; i < n; i++)
				object[i] = key => key === accessKey ? objsBig[i] : null;
		};
		let funcAccess_symKey_getObjBig = function () {
			let value;
			for (let i = 0; i < n; i++)
				value = object[i](accessKey).id;
		};
		await benchmark.measure("funcAccess_symKey setObjBig", funcAccess_symKey_setObjBig);
		await benchmark.measure("funcAccess_symKey getObjBig", funcAccess_symKey_getObjBig);
		console.log("");

		await aSecond();

		benchmark.section("funcAccess_symKey primitive keys > small object values");
		object = {};
		let funcAccess_symKey_setObjSmall = function () {
			for (let i = 0; i < n; i++)
				object[i] = key => key === accessKey ? objsSmall[i] : null;
		};
		let funcAccess_symKey_getObjSmall = function () {
			let value;
			for (let i = 0; i < n; i++)
				value = object[i](accessKey).id;
		};
		await benchmark.measure("funcAccess_symKey setObjSmall", funcAccess_symKey_setObjSmall);
		await benchmark.measure("funcAccess_symKey getObjSmall", funcAccess_symKey_getObjSmall);
		//*/









		//*
		benchmark = new BenchmarkNum(1);
		await aSecond();

		benchmark.section("assign method primitive keys > primitive values:");
		object = {};
		let assign_method_setPrim = function () {
			for (let i = 0; i < n; i++)
				Object.assign(object, {
					[i]() {
						return i;
					}
				});
		};
		let assign_method_getPrim = function () {
			let value;
			for (let i = 0; i < n; i++)
				value = object[i]();
		};
		// let assign_method_modPrim = function () {
		// 	for (let i = 0; i < n; i++)
		// 		object[i]()++;
		// };
		// let assign_method_deletePrim = function () {
		// 	for (let i = 0; i < n; i++)
		// 		delete (object[i]);
		// };
		await benchmark.measure("assign method setPrim", assign_method_setPrim);
		await benchmark.measure("assign method getPrim", assign_method_getPrim);
		// await benchmark.measure("assign method modPrim", assign_method_modPrim);
		// await benchmark.measure("assign method deletePrim", assign_method_deleteObjBig);
		console.log("");

		await aSecond();

		benchmark.section("assign method primitive keys > big object values:");
		object = {};
		let assign_method_setObjBig = function () {
			for (let i = 0; i < n; i++)
				Object.assign(object, {
					[i]() {
						return objsBig[i];
					}
				});
		};
		let assign_method_getObjBig = function () {
			let value;
			for (let i = 0; i < n; i++)
				value = object[i]().id;
		};
		let assign_method_modObjBig = function () {
			for (let i = 0; i < n; i++)
				object[i]().id++;
		};
		let assign_method_deleteObjBig = function () {
			for (let i = 0; i < n; i++)
				delete (object[i]);
		};
		await benchmark.measure("assign method setObjBig", assign_method_setObjBig);
		await benchmark.measure("assign method getObjBig", assign_method_getObjBig);
		// await benchmark.measure("assign method modObjBig", assign_method_modObjBig);
		// await benchmark.measure("assign method deleteObjBig", assign_method_deleteObjBig);
		console.log("");

		await aSecond();

		benchmark.section("assign method primitive keys > small object values");
		object = {};
		let assign_method_setObjSmall = function () {
			for (let i = 0; i < n; i++)
				Object.assign(object, {
					[i]() {
						return objsSmall[i];
					}
				});
		};
		let assign_method_getObjSmall = function () {
			let value;
			for (let i = 0; i < n; i++)
				value = object[i]().id;
		};
		let assign_method_modObjSmall = function () {
			for (let i = 0; i < n; i++)
				object[i]().id++;;
		};
		let assign_method_deleteObjSmall = function () {
			for (let i = 0; i < n; i++)
				delete (object[i]);
		};
		await benchmark.measure("assign method setObjSmall", assign_method_setObjSmall);
		await benchmark.measure("assign method getObjSmall", assign_method_getObjSmall);
		// await benchmark.measure("assign method modObjSmall", assign_method_modObjSmall);
		// await benchmark.measure("assign method deleteObjSmall", assign_method_deleteObjSmall);
		//*/









		//*
		benchmark = new BenchmarkNum(1);
		await aSecond();

		benchmark.section("assign get/set primitive keys > primitive values:");
		object = {};
		let assign_getNset_setPrim = function () {
			for (let i = 0; i < n; i++)
				Object.assign(object, {
					get [i]() {
						return i;
					}
				});
		};
		let assign_getNset_getPrim = function () {
			let value;
			for (let i = 0; i < n; i++)
				value = object[i];
		};
		let assign_getNset_modPrim = function () {
			for (let i = 0; i < n; i++)
				object[i]++;
		};
		let assign_getNset_deletePrim = function () {
			for (let i = 0; i < n; i++)
				delete (object[i]);
		};
		await benchmark.measure("assign get/set setPrim", assign_getNset_setPrim);
		await benchmark.measure("assign get/set getPrim", assign_getNset_getPrim);
		// await benchmark.measure("assign get/set modPrim", assign_getNset_modPrim);
		// await benchmark.measure("assign get/set deletePrim", assign_getNset_deleteObjBig);
		console.log("");

		await aSecond();

		benchmark.section("assign get/set primitive keys > big object values:");
		object = {};
		let assign_getNset_setObjBig = function () {
			for (let i = 0; i < n; i++)
				Object.assign(object, {
					get [i]() {
						return objsBig[i];
					}
				});
		};
		let assign_getNset_getObjBig = function () {
			let value;
			for (let i = 0; i < n; i++)
				value = object[i].id;
		};
		let assign_getNset_modObjBig = function () {
			for (let i = 0; i < n; i++)
				object[i].id++;
		};
		let assign_getNset_deleteObjBig = function () {
			for (let i = 0; i < n; i++)
				delete (object[i]);
		};
		await benchmark.measure("assign get/set setObjBig", assign_getNset_setObjBig);
		await benchmark.measure("assign get/set getObjBig", assign_getNset_getObjBig);
		// await benchmark.measure("assign get/set modObjBig", assign_getNset_modObjBig);
		// await benchmark.measure("assign get/set deleteObjBig", assign_getNset_deleteObjBig);
		console.log("");

		await aSecond();

		benchmark.section("assign get/set primitive keys > small object values");
		object = {};
		let assign_getNset_setObjSmall = function () {
			for (let i = 0; i < n; i++)
				Object.assign(object, {
					get [i]() {
						return objsSmall[i];
					}
				});
		};
		let assign_getNset_getObjSmall = function () {
			let value;
			for (let i = 0; i < n; i++)
				value = object[i].id;
		};
		let assign_getNset_modObjSmall = function () {
			for (let i = 0; i < n; i++)
				object[i].id++;;
		};
		let assign_getNset_deleteObjSmall = function () {
			for (let i = 0; i < n; i++)
				delete (object[i]);
		};
		await benchmark.measure("assign get/set setObjSmall", assign_getNset_setObjSmall);
		await benchmark.measure("assign get/set getObjSmall", assign_getNset_getObjSmall);
		// await benchmark.measure("assign get/set modObjSmall", assign_getNset_modObjSmall);
		// await benchmark.measure("assign get/set deleteObjSmall", assign_getNset_deleteObjSmall);
		//*/









		//*
		benchmark = new BenchmarkNum(1);
		await aSecond();

		benchmark.section("lit prop get/set primitive keys > primitive values:");
		object = {};
		let litProp_getNset_setPrim = function () {
			for (let i = 0; i < n; i++)
				object[i] = {
					get prop() {
						return i;
					}
				};
		};
		let litProp_getNset_getPrim = function () {
			let value;
			for (let i = 0; i < n; i++)
				value = object[i].prop;
		};
		let litProp_getNset_modPrim = function () {
			for (let i = 0; i < n; i++)
				object[i].prop++;
		};
		let litProp_getNset_deletePrim = function () {
			for (let i = 0; i < n; i++)
				delete (object[i].prop);
		};
		await benchmark.measure("lit prop get/set setPrim", litProp_getNset_setPrim);
		await benchmark.measure("lit prop get/set getPrim", litProp_getNset_getPrim);
		// await benchmark.measure("lit prop get/set modPrim", litProp_getNset_modPrim);
		// await benchmark.measure("lit prop get/set deletePrim", litProp_getNset_deleteObjBig);
		console.log("");

		await aSecond();

		benchmark.section("lit prop get/set primitive keys > big object values:");
		object = {};
		let litProp_getNset_setObjBig = function () {
			for (let i = 0; i < n; i++)
				object[i] = {
					get prop() {
						return objsBig[i];
					}
				};
		};
		let litProp_getNset_getObjBig = function () {
			let value;
			for (let i = 0; i < n; i++)
				value = object[i].prop.id;
		};
		let litProp_getNset_modObjBig = function () {
			for (let i = 0; i < n; i++)
				object[i].prop.id++;
		};
		let litProp_getNset_deleteObjBig = function () {
			for (let i = 0; i < n; i++)
				delete (object[i].prop);
		};
		await benchmark.measure("lit prop get/set setObjBig", litProp_getNset_setObjBig);
		await benchmark.measure("lit prop get/set getObjBig", litProp_getNset_getObjBig);
		// await benchmark.measure("lit prop get/set modObjBig", litProp_getNset_modObjBig);
		// await benchmark.measure("lit prop get/set deleteObjBig", litProp_getNset_deleteObjBig);
		console.log("");

		await aSecond();

		benchmark.section("lit prop get/set primitive keys > small object values");
		object = {};
		let litProp_getNset_setObjSmall = function () {
			for (let i = 0; i < n; i++)
				object[i] = {
					get prop() {
						return objsSmall[i];
					}
				};
		};
		let litProp_getNset_getObjSmall = function () {
			let value;
			for (let i = 0; i < n; i++)
				value = object[i].prop.id;
		};
		let litProp_getNset_modObjSmall = function () {
			for (let i = 0; i < n; i++)
				object[i].prop.id++;;
		};
		let litProp_getNset_deleteObjSmall = function () {
			for (let i = 0; i < n; i++)
				delete (object[i].prop);
		};
		await benchmark.measure("lit prop get/set setObjSmall", litProp_getNset_setObjSmall);
		await benchmark.measure("lit prop get/set getObjSmall", litProp_getNset_getObjSmall);
		// await benchmark.measure("lit prop get/set modObjSmall", litProp_getNset_modObjSmall);
		// await benchmark.measure("lit prop get/set deleteObjSmall", litProp_getNset_deleteObjSmall);
		//*/









		//*
		benchmark = new BenchmarkNum(1);
		await aSecond();

		benchmark.section("assign propject get/set primitive keys > primitive values:");
		object = {};
		let assignPropject_getNset_setPrim = function () {
			for (let i = 0; i < n; i++)
				object[i] = Object.assign({}, {
					get prop() {
						return i;
					}
				});
		};
		let assignPropject_getNset_getPrim = function () {
			let value;
			for (let i = 0; i < n; i++)
				value = object[i].prop;
		};
		let assignPropject_getNset_modPrim = function () {
			for (let i = 0; i < n; i++)
				object[i].prop++;
		};
		let assignPropject_getNset_deletePrim = function () {
			for (let i = 0; i < n; i++)
				delete (object[i].prop);
		};
		await benchmark.measure("assign propject get/set setPrim", assignPropject_getNset_setPrim);
		await benchmark.measure("assign propject get/set getPrim", assignPropject_getNset_getPrim);
		// await benchmark.measure("assign propject get/set modPrim", assignPropject_getNset_modPrim);
		// await benchmark.measure("assign propject get/set deletePrim", assignPropject_getNset_deleteObjBig);
		console.log("");

		await aSecond();

		benchmark.section("assign propject get/set primitive keys > big object values:");
		object = {};
		let assignPropject_getNset_setObjBig = function () {
			for (let i = 0; i < n; i++)
				object[i] = Object.assign({}, {
					get prop() {
						return objsBig[i];
					}
				});
		};
		let assignPropject_getNset_getObjBig = function () {
			let value;
			for (let i = 0; i < n; i++)
				value = object[i].prop.id;
		};
		let assignPropject_getNset_modObjBig = function () {
			for (let i = 0; i < n; i++)
				object[i].prop.id++;
		};
		let assignPropject_getNset_deleteObjBig = function () {
			for (let i = 0; i < n; i++)
				delete (object[i].prop);
		};
		await benchmark.measure("assign propject get/set setObjBig", assignPropject_getNset_setObjBig);
		await benchmark.measure("assign propject get/set getObjBig", assignPropject_getNset_getObjBig);
		// await benchmark.measure("assign propject get/set modObjBig", assignPropject_getNset_modObjBig);
		// await benchmark.measure("assign propject get/set deleteObjBig", assignPropject_getNset_deleteObjBig);
		console.log("");

		await aSecond();

		benchmark.section("assign propject get/set primitive keys > small object values");
		object = {};
		let assignPropject_getNset_setObjSmall = function () {
			for (let i = 0; i < n; i++)
				object[i] = Object.assign({}, {
					get prop() {
						return objsSmall[i];
					}
				});
		};
		let assignPropject_getNset_getObjSmall = function () {
			let value;
			for (let i = 0; i < n; i++)
				value = object[i].prop.id;
		};
		let assignPropject_getNset_modObjSmall = function () {
			for (let i = 0; i < n; i++)
				object[i].prop.id++;;
		};
		let assignPropject_getNset_deleteObjSmall = function () {
			for (let i = 0; i < n; i++)
				delete (object[i].prop);
		};
		await benchmark.measure("assign propject get/set setObjSmall", assignPropject_getNset_setObjSmall);
		await benchmark.measure("assign propject get/set getObjSmall", assignPropject_getNset_getObjSmall);
		// await benchmark.measure("assign propject get/set modObjSmall", assignPropject_getNset_modObjSmall);
		// await benchmark.measure("assign propject get/set deleteObjSmall", assignPropject_getNset_deleteObjSmall);
		//*/












		//*
		benchmark = new BenchmarkNum(1);
		await aSecond();

		benchmark.section("Map primitive keys > primitive values:");
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
		await benchmark.measure("map primSetPrim", map_primSetPrim);
		await benchmark.measure("map primGetPrim", map_primGetPrim);
		await benchmark.measure("map primModPrim", map_primModPrim);
		await benchmark.measure("map primDeletePrim", map_primDeletePrim);
		console.log("\n\n");

		await aSecond();

		benchmark.section("Map primitive keys > big object values:");
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
		await benchmark.measure("map primSetObjBig", map_primSetObjBig);
		await benchmark.measure("map primGetObjBig", map_primGetObjBig);
		await benchmark.measure("map primModObjBig", map_primModObjBig);
		await benchmark.measure("map primDeleteObjBig", map_primDeleteObjBig);

		await aSecond();

		benchmark.section("Map primitive keys > small object values:");
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
		await benchmark.measure("map primSetObjSmall", map_primSetObjSmall);
		await benchmark.measure("map primGetObjSmall", map_primGetObjSmall);
		await benchmark.measure("map primModObjSmall", map_primModObjSmall);
		await benchmark.measure("map primDeleteObjSmall", map_primDeleteObjSmall);
		//*/










		//*
		benchmark = new BenchmarkNum(1);
		await aSecond();

		benchmark.section("Small object keys > primitive values");
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
		await benchmark.measure("map objSmallSetPrim", map_objSmallSetPrim);
		await benchmark.measure("map objSmallGetPrim", map_objSmallGetPrim);
		await benchmark.measure("map objSmallModPrim", map_objSmallModPrim);
		await benchmark.measure("map objSmallDeletePrim", map_objSmallDeletePrim);

		await aSecond();

		benchmark.section("Small object keys > small object values");
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
		await benchmark.measure("map objSmallSetObj", map_objSmallSetObj);
		await benchmark.measure("map objSmallGetObj", map_objSmallGetObj);
		await benchmark.measure("map objSmallModObj", map_objSmallModObj);
		await benchmark.measure("map objSmallDeleteObj", map_objSmallDeleteObj);

		await aSecond();

		benchmark.section("Big object keys > primitive values");
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
		await benchmark.measure("map objBigSetPrim", map_objBigSetPrim);
		await benchmark.measure("map objBigGetPrim", map_objBigGetPrim);
		await benchmark.measure("map objBigModPrim", map_objBigModPrim);
		await benchmark.measure("map objBigDeletePrim", map_objBigDeletePrim);
		console.log("\n\n");

		await aSecond();

		benchmark.section("Big object keys > big object values");
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
		await benchmark.measure("map objBigSetObjBig", map_objBigSetObjBig);
		await benchmark.measure("map objBigGetObjBig", map_objBigGetObjBig);
		await benchmark.measure("map objBigModObjBig", map_objBigModObjBig);
		await benchmark.measure("map objBigDeleteObjBig", map_objBigDeleteObjBig);
		console.log("\n\n");
		//*/











		//*
		benchmark = new BenchmarkTime(500);
		await aSecond();

		benchmark.section("read properties");
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
		await benchmark.measure("object readPrim1", object_readPrim1);
		await benchmark.measure("object readObjBig1", object_readObjBig1);
		await benchmark.measure("object readPrim2", object_readPrim2);
		//*/








		//*
		let n5 = 10000;
		benchmark = new BenchmarkCallback();
		await aSecond();

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
		benchmark.section("test ManyTimesWithCalback");
		await benchmark.measure("test1", test_ManyTimesWithCalback);
		await benchmark.measure("test2", test_ManyTimesWithCalback);
		await benchmark.measure("test3", test_ManyTimesWithCalback);
		await benchmark.measure("test1", test_ManyTimesWithCalback);
		await benchmark.measure("test2", test_ManyTimesWithCalback);
		await benchmark.measure("test3", test_ManyTimesWithCalback);

		benchmark.section("test ManyTimesNoCallback");
		await benchmark.measure("test1", test_ManyTimesNoCallback);
		await benchmark.measure("test2", test_ManyTimesNoCallback);
		await benchmark.measure("test3", test_ManyTimesNoCallback);
		await benchmark.measure("test1", test_ManyTimesNoCallback);
		await benchmark.measure("test2", test_ManyTimesNoCallback);
		await benchmark.measure("test3", test_ManyTimesNoCallback);

		benchmark.section("test ManyTimesWithObjectCalback");
		await benchmark.measure("test1", test_ManyTimesWithObjectCalback);
		await benchmark.measure("test2", test_ManyTimesWithObjectCalback);
		await benchmark.measure("test3", test_ManyTimesWithObjectCalback);
		await benchmark.measure("test1", test_ManyTimesWithObjectCalback);
		await benchmark.measure("test2", test_ManyTimesWithObjectCalback);
		await benchmark.measure("test3", test_ManyTimesWithObjectCalback);
		//*/









		//*
		benchmark = new BenchmarkNum(1);
		await aSecond();

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
		benchmark.section("test anonymously created vs prototype function ");
		await benchmark.measure("test anonymousCallback", test_anonymousCallback);
		await benchmark.measure("test anonymousCallback", test_anonymousCallback);
		await benchmark.measure("test anonymousCallback", test_anonymousCallback);
		await benchmark.measure("test anonymousCallback", test_anonymousCallback);
		await benchmark.measure("test anonymousCallback", test_anonymousCallback);
		await benchmark.measure("test protoCallback", test_protoCallback);
		await benchmark.measure("test protoCallback", test_protoCallback);
		await benchmark.measure("test protoCallback", test_protoCallback);
		await benchmark.measure("test protoCallback", test_protoCallback);
		await benchmark.measure("test protoCallback", test_protoCallback);
		//*/
	}, 250);
};