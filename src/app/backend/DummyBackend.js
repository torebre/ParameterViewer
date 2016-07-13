"use strict";
var ParameterInfo_1 = require("./ParameterInfo");
var DummyBackend = (function () {
    function DummyBackend() {
    }
    DummyBackend.prototype.getBlockLength = function () {
        return undefined;
    };
    DummyBackend.prototype.attachParameterUpdateCallback = function (parameterUpdateListener) {
    };
    DummyBackend.prototype.removeParameterUpdateCallback = function (parameterUpdateListner) {
    };
    DummyBackend.prototype.getValue = function (parameter, start, stop) {
        return undefined;
    };
    DummyBackend.prototype.getRangeStart = function () {
        return undefined;
    };
    DummyBackend.prototype.getBlockIndices = function (rangeStart, rangeEnd) {
        return undefined;
    };
    DummyBackend.prototype.getRangeEnd = function () {
        return undefined;
    };
    DummyBackend.prototype.getMin = function (parameter) {
        return undefined;
    };
    DummyBackend.prototype.getMax = function (parameter) {
        return undefined;
    };
    DummyBackend.prototype.getParameters = function () {
        return [new ParameterInfo_1.ParameterInfo("Test1", "unit1"), new ParameterInfo_1.ParameterInfo("Test2", "unit2"), new ParameterInfo_1.ParameterInfo("Test3", "unit3")];
    };
    return DummyBackend;
}());
exports.DummyBackend = DummyBackend;
//# sourceMappingURL=DummyBackend.js.map