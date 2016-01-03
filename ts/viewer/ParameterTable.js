System.register(["angular2/src/core/metadata"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var metadata_1;
    var ParameterViewer;
    return {
        setters:[
            function (metadata_1_1) {
                metadata_1 = metadata_1_1;
            }],
        execute: function() {
            ParameterViewer = (function () {
                function ParameterViewer(colWidth, colHeight, backend) {
                    this.parameterTrackModels = [];
                    dataModel = new DataModel(colHeight, backend);
                    parameterTracks = [];
                    parameterTrackHeaders = [];
                    papers = [];
                    indexTrackMap = [];
                    numberOfParameters = 0;
                }
                ParameterViewer.prototype.updateMarkerLineForAllParameterTracks = function (yCoord) {
                    for (var i = 0; i < parameterTracks.length; ++i) {
                        parameterTracks[i].getModel().updateMarkerLine(yCoord);
                    }
                };
                ParameterViewer.prototype.removeParameter = function (parameter) {
                    delete parameterTrackModels[parameter];
                };
                ParameterViewer.prototype.drawParameter = function (trackContainerElement, parameterName) {
                    var parameterTrackModel = parameterTrackModels[parameterName];
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
                ParameterViewer.prototype.addParameterTrack = function (parameterName) {
                    console.log('Adding track: ' + parameterName + '. Length: ' + parameterTrackModels.length);
                    parameterTrackModels[parameterName] = new ParameterTrackModel(parameterName, dataModel);
                    console.log('Length after update: ' + parameterTrackModels.length);
                };
                ParameterViewer.prototype.setColumnWidths = function (widths) {
                    for (counter = 0; counter < numberOfParameters; ++counter) {
                        var key = indexTrackMap[counter];
                        parameterTracks[key].setWidth(widths[counter]);
                    }
                    render();
                };
                ParameterViewer.prototype.setColumnHeights = function (heights) {
                    for (counter = 0; counter < numberOfParameters; ++counter) {
                        var key = indexTrackMap[counter];
                        parameterTracks[key].setHeight(heights[counter]);
                    }
                    render();
                };
                ParameterViewer.prototype.setColour = function (parameter, colour) {
                    for (var i = 0; i < parameterTracks.length; ++i) {
                        if (parameterTracks[i].getModel().getParameter() == parameter) {
                            parameterTracks[i].setColour(colour);
                            parameterTracks[i].render();
                        }
                    }
                };
                ParameterViewer.prototype.redraw = function () {
                    console.log('Redrawing');
                    render();
                };
                ParameterViewer.prototype.updateColumnWidths = function () {
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
                ParameterViewer.prototype.render = function () {
                    console.log('Number of parameter tracks: ' + parameterTracks.length);
                    console.log('Number of parameter track models: ' + parameterTrackModels.length);
                    for (var key in parameterTrackModels) {
                        parameterTrackModels[key].render();
                    }
                };
                ParameterViewer.prototype.calculateLayout = function () {
                    if (parameterTracks.length == 0) {
                        return 0;
                    }
                    var widths = new Array(parameterTracks.length);
                    for (var i = 0; i < parameterTracks.length; ++i) {
                        widths[i] = width / parameterTracks.length;
                    }
                    return widths;
                };
                ParameterViewer.prototype.zoomIn = function () {
                    dataModel.zoomIn();
                };
                ParameterViewer.prototype.zoomOut = function () {
                    dataModel.zoomOut();
                };
                ParameterViewer.prototype.scrollDown = function () {
                    dataModel.scrollDown();
                };
                ParameterViewer.prototype.scrollUp = function () {
                    dataModel.scrollUp();
                };
                ParameterViewer.prototype.getDisplayedParameters = function () {
                    var result = [];
                    for (var key in parameterTrackModels) {
                        result.push(key);
                    }
                    return result;
                };
                ;
                ParameterViewer = __decorate([
                    metadata_1.Component({
                        selector: 'parameterViewer',
                        templateUrl: 'parameterTable.html'
                    })
                ], ParameterViewer);
                return ParameterViewer;
            })();
        }
    }
});
//# sourceMappingURL=ParameterTable.js.map