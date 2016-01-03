//var Raphael = require('raphael');
//var ParameterTrackModel = require('./ParameterTrackModel.js');
//var ParameterTrack = require('./ParameterTrack.js');
//var ParameterTrackHeader = require('./ParameterTrackHeader.js');
//var DataModel = require('./DataModel.js');


import {Component} from "angular2/core";


@Component({
    selector: 'parameterViewer',
    templateUrl: 'parameterTable.html'
})
class ParameterTable {
    private dataModel: IDataModel;
    private parameterTrackModels:Array<IParameterTrackModel> = [];


    constructor(colWidth: number, colHeight: number, backend: IBackend) {
        dataModel = new DataModel(colHeight, backend);
        //parameterTrackModels = [];
        parameterTracks = [];
        parameterTrackHeaders = [];
        papers = [];
        indexTrackMap = [];
        numberOfParameters = 0;
    }

    updateMarkerLineForAllParameterTracks(yCoord: number) {
        for (var i = 0; i < parameterTracks.length; ++i) {
            parameterTracks[i].getModel().updateMarkerLine(yCoord);
        }
    }

    removeParameter(parameter: number) {
        delete parameterTrackModels[parameter];
    }

    drawParameter(trackContainerElement, parameterName: number) {
        var parameterTrackModel = parameterTrackModels[parameterName];

        console.log('Model: ' + parameterTrackModel);

        if (papers[parameterName] == undefined) {
            papers[parameterName] = Raphael(trackContainerElement, colWidth, colHeight);
        }
        var paper = Raphael(trackContainerElement, colWidth, colHeight);
        // TODO Need to figure out the life cycle of the papers, and then
        // delete the old parameter tracks attached to the old papers
        parameterTracks[parameterName] = new ParameterTrack(parameterTrackModel, paper, 0, 0,
            colHeight,
            colWidth, dataModel);
        indexTrackMap[numberOfParameters] = parameterName;
        ++numberOfParameters;
        parameterTrackHeaders[parameterName] = new ParameterTrackHeader(paper, parameterTrackModel);

        render();
    }

    addParameterTrack(parameterName: string) {
        console.log('Adding track: ' + parameterName + '. Length: ' + parameterTrackModels.length);
        parameterTrackModels[parameterName] = new ParameterTrackModel(parameterName, dataModel);
        console.log('Length after update: ' + parameterTrackModels.length);
    }

    setColumnWidths(widths: Array<number>) {
        for (counter = 0; counter < numberOfParameters; ++counter) {
            var key = indexTrackMap[counter];
            parameterTracks[key].setWidth(widths[counter]);
        }
        render();
    }

    setColumnHeights(heights: Array<number>) {
        for (counter = 0; counter < numberOfParameters; ++counter) {
            var key = indexTrackMap[counter];
            parameterTracks[key].setHeight(heights[counter]);
        }
        render();
    }

    setColour(parameter, colour) {
        for (var i = 0; i < parameterTracks.length; ++i) {
            if (parameterTracks[i].getModel().getParameter() == parameter) {
                parameterTracks[i].setColour(colour);
                parameterTracks[i].render();
            }
        }
    }


    redraw() {
        console.log('Redrawing');
        // TODO If nothing else needs to be done, render can be made public
        render();
    }

    updateColumnWidths() {
        // TODO For now just give all the columns the same width
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
    }

    render() {
        console.log('Number of parameter tracks: ' + parameterTracks.length);
        console.log('Number of parameter track models: ' + parameterTrackModels.length);

        for (var key in parameterTrackModels) {
            parameterTrackModels[key].render();
        }
    }

    calculateLayout() {
        if (parameterTracks.length == 0) {
            return 0;
        }
        var widths = new Array(parameterTracks.length);
        for (var i = 0; i < parameterTracks.length; ++i) {
            widths[i] = width / parameterTracks.length;
        }
        return widths;
    }

    zoomIn() {
        dataModel.zoomIn();
    }

    zoomOut() {
        dataModel.zoomOut();
    }

    scrollDown() {
        dataModel.scrollDown();
    }

    scrollUp() {
        dataModel.scrollUp();
    }

    // This method is watched by ParameterViewController
    getDisplayedParameters() {
        var result = [];
        for (var key in parameterTrackModels) {
            result.push(key);
        }
        return result;
    };
}