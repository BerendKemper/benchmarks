function performance(name, callback, ...params) {
    console.time(name);
    for (var i = 0; i < 1000000; i++)
        callback(...params);
    console.timeEnd(name);
}

class ClassCar {
    drive() {
        return 'Vroom!';
    }
};
function testCar1() {
    const car = new ClassCar();
    car.drive();
};

function ConstructorCar() { };
ConstructorCar.prototype.drive = function () {
    return 'Vroom!';
};
function testCar2() {
    const car = new ConstructorCar();
    car.drive();
};

const proto = {
    drive() {
        return 'Vroom!';
    }
};
const factoryCar = () => Object.create(proto);
function testCar3() {
    const car = factoryCar();
    car.drive();
};

function race() {
    performance("getStarted", () => { });
    performance("testCar1", testCar1);
    performance("testCar2", testCar2);
    performance("testCar3", testCar3);
    performance("testCar1", testCar1);
    performance("testCar2", testCar2);
    performance("testCar3", testCar3);
    console.log('------');
}