System.register(["angular2/core"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var core_1;
    var ParameterTrack;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ParameterTrack = (function () {
                function ParameterTrack(parameterTrackModel, paper, xOffset, yOffset, width, height) {
                    this.parameterTrackModel = parameterTrackModel;
                    this.paper = paper;
                    this.xOffset = xOffset;
                    this.yOffset = yOffset;
                    this.width = width;
                    this.height = height;
                    this.colour = '#000000';
                    this.raphaelPath = undefined;
                    this.boundingBox = undefined;
                    this.parameterTrackModel.addListener(this);
                }
                ParameterTrack.prototype.addBoundingBox = function () {
                    this.boundingBox = this.paper.rect(this.xOffset, this.yOffset, this.width, this.height);
                    this.boundingBox.attr('stroke', this.colour);
                };
                ParameterTrack.prototype.onDrop = function ($event) {
                };
                ParameterTrack.prototype.markerLineUpdated = function () {
                    if (this.line !== undefined) {
                        this.line.remove();
                    }
                    if (yCoord < 0) {
                        return;
                    }
                    this.line = this.paper.path('M' + this.xOffset + ',' + yCoord + "h" + this.width);
                    this.line.attr('stroke', 'blue');
                };
                ParameterTrack.prototype.getModel = function () {
                    return this.parameterTrackModel;
                };
                ParameterTrack.prototype.setColour = function (colour) {
                    this.colour = colour;
                };
                ParameterTrack.prototype.render = function () {
                    if (this.raphaelPath !== undefined) {
                        this.raphaelPath.remove();
                        this.boundingBox.remove();
                    }
                    this.addBoundingBox();
                    var coordinates = this.parameterTrackModel.getParameterPath();
                    var path = this.generateFullSvgPath(coordinates);
                    this.raphaelPath = this.paper.path(path);
                    this.raphaelPath.attr('stroke', this.colour);
                };
                ParameterTrack.prototype.setHeight = function (newHeight) {
                    console.log("Setting height for track: " + newHeight);
                    this.paper.setSize(this.width, newHeight);
                    this.height = newHeight;
                };
                ParameterTrack.prototype.setWidth = function (newWidth) {
                    this.paper.setSize(newWidth, this.height);
                    this.width = newWidth;
                };
                ParameterTrack.prototype.setXOffset = function (xOffset) {
                    this.xOffset = xOffset;
                };
                ParameterTrack.prototype.scaleValue = function (value, min, max) {
                    return (value - min) * this.width / (max - min);
                };
                ParameterTrack.prototype.generateFullSvgPath = function (coordinates) {
                    var svgPath = "M " + this.xOffset + " " + this.yOffset;
                    var skipRows = 0;
                    var parameterRangeMin = this.parameterTrackModel.getMin();
                    var parameterRangeMax = this.parameterTrackModel.getMax();
                    for (var row = 0; row < this.height; ++row) {
                        if (coordinates[row]) {
                            var scaledAverage = this.scaleValue(coordinates[row].average, parameterRangeMin, parameterRangeMax);
                            svgPath += "L" + (this.xOffset + scaledAverage) + ', ' + (this.yOffset + row);
                            skipRows = 0;
                        }
                        else {
                            skipRows++;
                        }
                    }
                    return svgPath;
                };
                ParameterTrack = __decorate([
                    core_1.Component({
                        selector: "parameter-track",
                        template: "<div (drop)='addParameter'</div>"
                    })
                ], ParameterTrack);
                return ParameterTrack;
            })();
        }
    }
});
//# sourceMappingURL=ParameterTrack.js.map