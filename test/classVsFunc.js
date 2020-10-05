class A {
    constructor(a) {
        this.a = a;
    }
    method() {
        return `${this.a}++`;
    }
};
class B extends A {
    constructor(a, b) {
        super(a);
        this.b = b;
    }
    method() {
        return `${super.method()} / ${this.b}--`;
    }
    cheat1() {
        return `${A.prototype.method.call(this)} / ${this.b}--`;
    }
}; //console.log(super.constructor === A.prototype.constructor);
let b = new B("monkey", "noob");
console.log("b.method:", b.method());
console.log("b.cheat1:", b.cheat1())

function C(c) {
    this.c = c;
};
function method() {
    return `${this.c}++`;
};
C.prototype.method = function method() {
    return `${this.c}++`;
};

function D(c, d) {
    this.d = d;
    C.call(this, c);
};
Object.setPrototypeOf(D.prototype, C.prototype);
D.prototype.method = function method() {
    return `${C.prototype.method.call(this)} / ${this.d}--`;
};
D.prototype._cheat = C.prototype.method;
D.prototype.cheat = function method() {
    return `${this._cheat()} / ${this.d}--`;
};
let d = new D("monkey", "noob");
console.log("d.method:", d.method());
console.log("d.cheat:", d.method());

let times = 1000000;
function benchmark(name, callback) {
    console.time(name);
    for (let i = 0; i < times; i++)
        callback();
    console.timeEnd(name);
};

let testNewClass = () => {
    new B("monkey", "noob");
};
let testNewConstructor = () => {
    new D("monkey", "noob");
};
let testClassMethod = () => {
    b.method();
};
let testConstructorMethod = () => {
    d.method();
};
let testConstructorCheat = () => {
    d.cheat();
}
let testClassCheat1 = () => {
    b.cheat1();
}

function race() {
    benchmark("get started", () => { });
    benchmark("testNewClass", testNewClass);
    benchmark("testNewConstructor", testNewConstructor);
    benchmark("testClassMethod", testClassMethod);
    benchmark("testConstructorMethod", testConstructorMethod);
    benchmark("testConstructorCheat", testConstructorCheat);
    benchmark("testClassCheat1", testClassCheat1);
};
race();