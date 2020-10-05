"use strict";
let TypeMap = function load() {
    const ix = Symbol("TypeMap ix");
    function TypeMap() {
        this.objectKeys = [];
        this.objectValues = [];
        this.primes = {};
        this._set = {
            object: this.setObject.bind(this),
            array: this.setObject.bind(this),
            function: this.setObject.bind(this),
            string: this.setPrime.bind(this),
            number: this.setPrime.bind(this),
            boolean: this.setPrime.bind(this)
        };
        this._delete = {
            object: this.deleteObject.bind(this),
            array: this.deleteObject.bind(this),
            function: this.deleteObject.bind(this),
            string: this.deletePrime.bind(this),
            number: this.deletePrime.bind(this),
            boolean: this.deletePrime.bind(this)
        };
        this._get = {
            object: this.getObject.bind(this),
            array: this.getObject.bind(this),
            function: this.getObject.bind(this),
            string: this.getPrime.bind(this),
            number: this.getPrime.bind(this),
            boolean: this.getPrime.bind(this)
        };
    };
    TypeMap.prototype.set = function (key, value) {
        return this._set[typeof key](key, value);
    };
    TypeMap.prototype.delete = function (key) {
        return this._delete[typeof key](key);
    };
    TypeMap.prototype.get = function (key) {
        return this._get[typeof key](key);
    };
    TypeMap.prototype.setObject = function (key, value) {
        key[ix] = this.objectKeys.push(key) - 1;
        this.objectValues.push(value);
    };
    TypeMap.prototype.deleteObject = function (key) {
        delete (this.objectKeys[key[ix]]);
        delete (this.objectValues[key[ix]]);
        delete key[ix];
    };
    TypeMap.prototype.getObject = function (key) {
        return this.objectValues[key[ix]];
    };
    TypeMap.prototype.setPrime = function (key, value) {
        this.primes[key] = value;
    };
    TypeMap.prototype.deletePrime = function (key) {
        delete (this.primes[key]);
    };
    TypeMap.prototype.getPrime = function (key) {
        return this.primes[key];
    };
    return TypeMap;
}();