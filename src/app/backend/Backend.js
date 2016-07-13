"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("angular2/core");
var DummyBackend_1 = require("./DummyBackend");
var Backend = (function () {
    function Backend() {
        this.backend = new DummyBackend_1.DummyBackend();
        this.websocketConnection = new SocketHandler();
    }
    Backend.prototype.getBlockLengthfunction = function () {
        return this.backend.getBlockLength();
    };
    Backend.prototype.getRangeStart = function () {
        return this.backend.getRangeStart();
    };
    Backend.prototype.getBlockIndices = function (rangeStart, rangeEnd) {
        return this.backend.getBlockIndices(rangeStart, rangeEnd);
    };
    Backend.prototype.getRangeEnd = function () {
        return this.backend.getRangeEnd();
    };
    Backend.prototype.getMin = function (parameter) {
        return this.backend.getMax(parameter);
    };
    Backend.prototype.getMax = function (parameter) {
        return this.backend.getMax(parameter);
    };
    Backend.prototype.getValue = function (parameter, start, stop) {
        return this.backend.getValue(parameter, start, stop);
    };
    Backend.prototype.getParameters = function () {
        return this.backend.getParameters();
    };
    Backend.prototype.getBlockLength = function () {
        return undefined;
    };
    Backend.prototype.attachParameterUpdateCallback = function (parameterUpdateListener) {
    };
    Backend.prototype.removeParameterUpdateCallback = function (parameterUpdateListner) {
    };
    Backend = __decorate([
        core_1.Injectable()
    ], Backend);
    return Backend;
}());
exports.Backend = Backend;
//# sourceMappingURL=Backend.js.map