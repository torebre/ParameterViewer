System.register(["angular2/core"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var core_1;
    var ParameterTable;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ParameterTable = (function () {
                function ParameterTable(colWidth, colHeight, backend) {
                    this.parameterTrackModels = [];
                    this.dataModel = new DataModel(colHeight, backend);
                    parameterTrackHeaders = [];
                    papers = [];
                    indexTrackMap = [];
                    numberOfParameters = 0;
                }
                ParameterTable.prototype.updateMarkerLineForAllParameterTracks = function (yCoord) {
                    for (var i = 0; i < this.parameterTrackModels.length; ++i) {
                        this.parameterTrackModels[i].updateMarkerLine(yCoord);
                    }
                };
                ParameterTable.prototype.removeParameter = function (parameter) {
                    delete this.parameterTrackModels[parameter];
                };
                ParameterTable.prototype.drawParameter = function (trackContainerElement, parameterName) {
                    var parameterTrackModel = this.parameterTrackModels[parameterName];
                    console.log('Model: ' + parameterTrackModel);
                    if (papers[parameterName] == undefined) {
                        papers[parameterName] = Raphael(trackContainerElement, colWidth, colHeight);
                    }
                    var paper = Raphael(trackContainerElement, colWidth, colHeight);
                    parameterTracks[parameterName] = new ParameterTrack(parameterTrackModel, paper, 0, 0, colHeight, colWidth, dataModel);
                    indexTrackMap[numberOfParameters] = parameterName;
                    ++numberOfParameters;
                    parameterTrackHeaders[parameterName] = new ParameterTrackHeader(paper, parameterTrackModel);
                    render();
                };
                ParameterTable.prototype.addParameterTrack = function (parameterName) {
                    console.log('Adding track: ' + parameterName + '. Length: ' + parameterTrackModels.length);
                    parameterTrackModels[parameterName] = new ParameterTrackModel(parameterName, dataModel);
                    console.log('Length after update: ' + parameterTrackModels.length);
                };
                ParameterTable.prototype.setColumnWidths = function (widths) {
                    for (var counter = 0; counter < numberOfParameters; ++counter) {
                        var key = indexTrackMap[counter];
                        parameterTracks[key].setWidth(widths[counter]);
                    }
                    render();
                };
                ParameterTable.prototype.setColumnHeights = function (heights) {
                    for (var counter = 0; counter < numberOfParameters; ++counter) {
                        var key = indexTrackMap[counter];
                        parameterTracks[key].setHeight(heights[counter]);
                    }
                    render();
                };
                ParameterTable.prototype.setColour = function (parameter, colour) {
                    for (var i = 0; i < parameterTracks.length; ++i) {
                        if (parameterTracks[i].getModel().getParameter() == parameter) {
                            parameterTracks[i].setColour(colour);
                            parameterTracks[i].render();
                        }
                    }
                };
                ParameterTable.prototype.redraw = function () {
                    console.log('Redrawing');
                    render();
                };
                ParameterTable.prototype.updateColumnWidths = function () {
                    if (parameterTracks.length == 0) {
                        return;
                    }
                    var cumulativeWidth = 0;
                    var widthPerTrack = width / parameterTracks.length;
                    for (var i = 0; i < parameterTracks.length; ++i) {
                        console.log('Setting offset: ' + cumulativeWidth);
                        parameterTracks[i].setXOffset(cumulativeWidth);
                        parameterTracks[i].setWidth(widthPerTrack);
                        parameterTrackHeaders[i].setDimensions(cumulativeWidth, 0, widthPerTrack, 0);
                        cumulativeWidth += widthPerTrack;
                    }
                };
                ParameterTable.prototype.render = function () {
                    console.log('Number of parameter tracks: ' + parameterTracks.length);
                    console.log('Number of parameter track models: ' + parameterTrackModels.length);
                    for (var key in parameterTrackModels) {
                        parameterTrackModels[key].render();
                    }
                };
                ParameterTable.prototype.calculateLayout = function () {
                    if (parameterTracks.length == 0) {
                        return 0;
                    }
                    var widths = new Array(parameterTracks.length);
                    for (var i = 0; i < parameterTracks.length; ++i) {
                        widths[i] = width / parameterTracks.length;
                    }
                    return widths;
                };
                ParameterTable.prototype.zoomIn = function () {
                    dataModel.zoomIn();
                };
                ParameterTable.prototype.zoomOut = function () {
                    dataModel.zoomOut();
                };
                ParameterTable.prototype.scrollDown = function () {
                    dataModel.scrollDown();
                };
                ParameterTable.prototype.scrollUp = function () {
                    dataModel.scrollUp();
                };
                ParameterTable.prototype.getDisplayedParameters = function () {
                    var result = [];
                    for (var key in parameterTrackModels) {
                        result.push(key);
                    }
                    return result;
                };
                ParameterTable.prototype.onDrop = function (ev) {
                    ev.preventDefault();
                    var data = ev.dataTransfer.getData("text");
                    var parameterViewer = angular.element($("#parameter-view")).scope();
                    parameterViewer.$apply(function () {
                        parameterViewer.addParameter(data.substr(10));
                    });
                };
                ParameterTable = __decorate([
                    core_1.Component({
                        selector: 'parameter-table',
                        templateUrl: '../templates/parameterTable.html'
                    })
                ], ParameterTable);
                return ParameterTable;
            })();
        }
    }
});
//# sourceMappingURL=ParameterTable.js.map