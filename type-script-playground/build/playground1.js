"use strict";
var Test = /** @class */ (function () {
    //instanceVariable: number = 10;
    function Test(instanceVariable) {
        if (instanceVariable === void 0) { instanceVariable = 10; }
        this.instanceVariable = instanceVariable;
        console.log('Test object created');
    }
    return Test;
}());
var t = new Test();
console.log(t.instanceVariable);
