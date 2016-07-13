System.register(["angular2/core"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var core_1;
    var MiniView;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            MiniView = (function () {
                function MiniView(paper) {
                    this.paper = paper;
                    var outline = paper.rect(0, 0, 100, 800);
                    var miniViewWindow = paper.rect(0, 0, 100, 100);
                    $(miniViewWindow.node).attr("class", "mediumBold");
                    var dragging = false;
                    miniViewWindow.drag(function () {
                        console.log("Moving");
                        console.log("Event: " + event.movementY);
                        if (dragging && event.movementY != 0) {
                            console.log("miniViewWindow.x: " + miniViewWindow.y + ". event.movementY: " + event.movementY);
                            miniViewWindow.attr('y', miniViewWindow.attr('y') + event.movementY);
                        }
                    }, function () {
                        console.log("Starting");
                        dragging = true;
                    }, function () {
                        console.log("Stopping");
                        dragging = false;
                    });
                }
                MiniView = __decorate([
                    core_1.Component({
                        selector: 'mini-view',
                        template: ''
                    })
                ], MiniView);
                return MiniView;
            })();
        }
    }
});
//# sourceMappingURL=MiniView.js.map