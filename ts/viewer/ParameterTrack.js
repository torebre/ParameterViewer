System.register(["angular2/angular2"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var angular2_1;
    var ParameterTrack;
    return {
        setters:[
            function (angular2_1_1) {
                angular2_1 = angular2_1_1;
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
                    this.parameterTrackModel.setParameterTrack(this);
                }
                ParameterTrack.prototype.addBoundingBox = function () {
                    boundingBox = paper.rect(xOffset, yOffset, width, height);
                    boundingBox.attr('stroke', this.colour);
                };
                ParameterTrack.prototype.drawMarkerLine = function (yCoord) {
                    if (line !== undefined) {
                        line.remove();
                    }
                    if (yCoord < 0) {
                        return;
                    }
                    line = paper.path('M' + xOffset + ',' + yCoord + "h" + width);
                    line.attr('stroke', 'blue');
                };
                ParameterTrack.prototype.getModel = function () {
                    return this.parameterTrackModel;
                };
                ParameterTrack.prototype.setColour = function (colour) {
                    this.colour = colour;
                };
                ParameterTrack.prototype.render = function () {
                    if (raphaelPath !== undefined) {
                        raphaelPath.remove();
                        boundingBox.remove();
                    }
                    addBoundingBox();
                    var coordinates = parameterTrackModel.getParameterPath();
                    path = generateFullSvgPath(coordinates);
                    raphaelPath = this.paper.path(path);
                    raphaelPath.attr('stroke', this.colour);
                };
                ParameterTrack.prototype.setHeight = function (newHeight) {
                    console.log("Setting height for track: " + newHeight);
                    paper.setSize(width, newHeight);
                    height = newHeight;
                };
                ParameterTrack.prototype.setWidth = function (newWidth) {
                    paper.setSize(newWidth, height);
                    width = newWidth;
                };
                ParameterTrack.prototype.setXOffset = function (xOffset2) {
                    xOffset = xOffset2;
                };
                ParameterTrack.prototype.scaleValue = function (value, min, max) {
                    return (value - min) * width / (max - min);
                };
                ParameterTrack.prototype.generateFullSvgPath = function (coordinates) {
                    var svgPath = "M " + xOffset + " " + yOffset;
                    var skipRows = 0;
                    var parameterRange = parameterTrackModel.getRange();
                    for (var row = 0; row < height; ++row) {
                        if (coordinates[row]) {
                            var scaledAverage = scaleValue(coordinates[row].average, parameterRange.min, parameterRange.max);
                            svgPath += "L" + (xOffset + scaledAverage) + ', ' + (yOffset + row);
                            skipRows = 0;
                        }
                        else {
                            skipRows++;
                        }
                    }
                    return svgPath;
                };
                ParameterTrack = __decorate([
                    angular2_1.Component()
                ], ParameterTrack);
                return ParameterTrack;
            })();
        }
    }
});
//# sourceMappingURL=ParameterTrack.js.map