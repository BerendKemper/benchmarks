const MyFunction = function moduleWrapper() {
	const accessKey = Symbol("Access Key MyFunction");
	let priv_global = 1;
	const createAlternateThis = () => {
		const _this = () => console.log("alternate this: i am a function");
		const private = {
			instance_prop: 0,
			instance_method: () => {
				console.log("instance: nothing can call me withoud the access key -> this:", _this);
			},
		};
		_this.private = key => key === accessKey ? private : new Error("access not granted");
		return Object.setPrototypeOf(_this, MyFunction.prototype);
	};
	function MyFunction() {
		return createAlternateThis();
	};
	MyFunction.prototype = {
		someMethod() {
			console.log("i want private properties and methods! - this:", this);
		},
		show_private_capabilities() {
			const private = this.private(accessKey);
			console.log(private.instance_prop);
			private.instance_method();
			console.log(priv_global);
		}
	};
	// Object.setPrototypeOf(MyFunction, Function);
	// Object.setPrototypeOf(MyFunction.prototype, Function.prototype);
	return MyFunction;
}();
let func1 = new MyFunction();
func1(); // "alternate this: i am a function"
func1.someMethod(); // "i want private properties and methods! - this: () => console.log("i am a function")"
func1.show_private_capabilities();
// 0
// "instance: nothing can call me withoud the access key -> this: () => console.log("alternate this: i am a function")"
// 1

class A {
	#priv_instance_prop = 0;
	#priv_instance_method = () => {
		console.log("very nice", this);
	};
	#secretValue = 1;
	get #priv_prototype_propertyGetter() {
		return this.#secretValue;
		//bad example but it still works
	};
	#priv_prototype_method() {
		console.log("excellent", this);
	};
	static #priv_static_prop = 2;
	static #priv_static_method() {
		console.log("good", this === A);
	};

	constructor() {
		console.log(this.#priv_instance_prop);
		this.#priv_instance_method();
		console.log(this.#priv_prototype_propertyGetter);
		this.#priv_prototype_method();
		console.log(A.#priv_static_prop);
		A.#priv_static_method();
	};

	#privB;
	get b() {
		return this.#privB;
	};
	set b(value) {
		if (value != "bad")
			this.#privB = value;
	};
};
new A();