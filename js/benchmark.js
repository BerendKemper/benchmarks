"use strict";
const main = document.body.querySelector("main");
class BenchRow {
	constructor() {
		this.vanilla = document.createElement("div");
		this.vanilla.classList.add("benchRow");
		main.appendChild(this.vanilla);
	}
}
class BenchCol {
	constructor(parent, name) {
		this.vanilla = document.createElement("section");
		const title = document.createElement("strong");
		title.appendChild(document.createTextNode(name));
		this.vanilla.appendChild(title);
		parent.appendChild(this.vanilla);
	}
}
class BenchDiv {
	constructor(parent, name) {
		this.vanilla = document.createElement("div");
		const title = document.createElement("span");
		title.append(document.createTextNode(name));
		this.vanilla.appendChild(title);
		parent.appendChild(this.vanilla);
	}
	addTime(value) {
		const id = document.createElement("span");
		id.appendChild(document.createTextNode("Time: "));
		this.vanilla.appendChild(id);
		const time = document.createElement("time");
		const time2Decimals = Math.round(value * 100) / 100;
		time.appendChild(document.createTextNode(time2Decimals));
		this.vanilla.appendChild(time);
	}
	addData(key, value) {
		const id = document.createElement("span");
		id.appendChild(document.createTextNode(key));
		this.vanilla.appendChild(id);
		const data = document.createElement("data");
		data.appendChild(document.createTextNode(value));
		this.vanilla.appendChild(data);
	}
}
class BenchmarkNum {
	constructor(numTests) {
		this.numTests = numTests;
		this.row = new BenchRow();
	}
	section(name) {
		this.col = new BenchCol(this.row.vanilla, name);
		console.log("\n\n");
		console.log(name);
		console.log("");
	}
	measure(name, callback) {
		const div = new BenchDiv(this.col.vanilla, name);
		setTimeout(() => {
			const start = performance.now();
			for (let i = 0; i < this.numTests; i++)
				callback();
			const time = performance.now() - start;
			div.addTime(time);
			console.log(name, time);
		}, 0);
	}
};
class BenchmarkTime {
	constructor(time) {
		this.time = time;
		this.row = new BenchRow();
	}
	section(name) {
		this.col = new BenchCol(this.row.vanilla, name);
		console.log("\n\n");
		console.log(name);
		console.log("");
	}
	measure(name, callback) {
		const div = new BenchDiv(this.col.vanilla, name);
		setTimeout(() => {
			const start = performance.now();
			let counter = 0; performance.now()
			while (performance.now() - start < this.time) {
				callback();
				counter++;
			}
			div.addData("ops/sec", 1000 * counter / this.time);
			console.log(name, counter + "x");
		}, 0);
	}
};
class BenchmarkCallback {
	constructor() {
		this.row = new BenchRow();
	}
	section(name) {
		this.col = new BenchCol(this.row.vanilla, name);
		console.log("\n\n");
		console.log(name);
		console.log("");
	}
	measure(name, callback) {
		const div = new BenchDiv(this.col.vanilla, name);
		setTimeout(() => {
			const start = performance.now();
			callback(() => {
				const time = performance.now() - start;
				div.addTime(time);
				console.log(name, time);
			});
		}, 0);
	}
};