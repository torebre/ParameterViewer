System.register(["angular2/core"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var core_1;
    var ParameterList;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ParameterList = (function () {
                function ParameterList(backend) {
                    this.backend = backend;
                }
                ParameterList = __decorate([
                    core_1.Component({
                        selector: "parameter-list",
                        templateUrl: "templates/parameterList.html",
                        providers: [Backend]
                    })
                ], ParameterList);
                return ParameterList;
            })();
        }
    }
});
//# sourceMappingURL=ParameterList.js.map