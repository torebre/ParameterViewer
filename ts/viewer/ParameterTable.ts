import {Component} from "angular2/core";
import IBackend = Backend.IBackend;


@Component({
    selector: 'parameter-table',
    templateUrl: '../templates/parameterTable.html'
})
class ParameterTable {
    private dataModel: DataModel;
    private parameterTrackModels:Array<IParameterTrackModel> = [];
    private parameterTracks:Array<ParameterTrack> = []



    constructor(colWidth: number, colHeight: number, backend: IBackend) {
        this.dataModel = new DataModel(colHeight, backend);
        //parameterTrackModels = [];
        parameterTracks = [];
        parameterTrackHeaders = [];
        papers = [];
        indexTrackMap = [];
        numberOfParameters = 0;
    }

    updateMarkerLineForAllParameterTracks(yCoord: number):void {
        for (var i = 0; i < parameterTracks.length; ++i) {
            parameterTracks[i].getModel().updateMarkerLine(yCoord);
        }
    }

    removeParameter(parameter: number):void {
        delete this.parameterTrackModels[parameter];
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
        for (let counter = 0; counter < numberOfParameters; ++counter) {
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

    zoomIn(): void {
        dataModel.zoomIn();
    }

    zoomOut(): void {
        dataModel.zoomOut();
    }

    scrollDown(): void {
        dataModel.scrollDown();
    }

    scrollUp(): void {
        dataModel.scrollUp();
    }

    getDisplayedParameters(): void {
        var result = [];
        for (var key in parameterTrackModels) {
            result.push(key);
        }
        return result;
    };


//    allowDrop(ev): void {
//    ev.preventDefault();
//}
//
//    function drag(ev) {
//    ev.dataTransfer.setData("text", ev.target.id);
//}


    onDrop(ev: DragEvent): void {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var parameterViewer = angular.element($("#parameter-view")).scope();
    parameterViewer.$apply(function () {
        parameterViewer.addParameter(data.substr(10));
    })
}


}