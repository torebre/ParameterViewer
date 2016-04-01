import {Component} from "angular2/core";
import {IBackend } from "../backend/IBackend";
import {DataModel} from "../viewer/DataModel";
import {ParameterTrack} from "../viewer/ParameterTrack";


@Component({
    selector: 'parameter-table',
    templateUrl: '../templates/parameterTable.html'
})
class ParameterTable {
    private dataModel: DataModel;
    private parameterTrackModels:Array<IParameterTrackModel> = [];
    //parameterTrackHeaders = [];
    private papers:Array<RaphaelPaper> = [];
    //indexTrackMap = [];
    numberOfParameters = 0;

    private parameterTracks:Array<ParameterTable> = [];



    constructor(private colWidth: number, private colHeight: number, private backend: IBackend) {
        this.dataModel = new DataModel(colHeight, backend);
    }

    public updateMarkerLineForAllParameterTracks(yCoord: number):void {
        for (let i = 0; i < this.parameterTrackModels.length; ++i) {
            this.parameterTrackModels[i].updateMarkerLine(yCoord);
        }
    }

    removeParameter(parameter: number):void {
        delete this.parameterTrackModels[parameter];
    }

    drawParameter(trackContainerElement: HTMLElement, parameterName: number):void {
        var parameterTrackModel = this.parameterTrackModels[parameterName];

        console.log('Model: ' + parameterTrackModel);

        if (this.papers[parameterName] == undefined) {
            this.papers[parameterName] = Raphael(trackContainerElement, this.colWidth, this.colHeight);
        }
        var paper = Raphael(trackContainerElement, this.colWidth, this.colHeight);
        // TODO Need to figure out the life cycle of the papers, and then
        // delete the old parameter tracks attached to the old papers
        this.parameterTracks[parameterName] = new ParameterTrack(parameterTrackModel, paper, 0, 0,
            this.colHeight,
            this.colWidth);
        indexTrackMap[numberOfParameters] = parameterName;
        ++numberOfParameters;
        this.parameterTrackHeaders[parameterName] = new ParameterTrackHeader(paper, parameterTrackModel);

        render();
    }

    //addParameterTrack(parameterName: string) {
    //    console.log('Adding track: ' + parameterName + '. Length: ' + parameterTrackModels.length);
    //    parameterTrackModels[parameterName] = new ParameterTrackModel(parameterName, dataModel);
    //    console.log('Length after update: ' + parameterTrackModels.length);
    //}

    setColumnWidths(widths: Array<number>) {
        for (let counter = 0; counter < numberOfParameters; ++counter) {
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
        if (this.parameterTracks.length == 0) {
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

    calculateLayout():number {
        if (parameterTracks.length == 0) {
            return 0;
        }
        var widths = new Array(parameterTracks.length);
        for (var i = 0; i < parameterTracks.length; ++i) {
            widths[i] = width / parameterTracks.length;
        }
        return widths;
    }

    zoomIn():void {
        dataModel.zoomIn();
    }

    zoomOut():void {
        this.dataModel.zoomOut();
    }

    scrollDown():void {
        this.dataModel.scrollDown();
    }

    scrollUp():void {
        this.dataModel.scrollUp();
    }

    getDisplayedParameters(): Array<String> {
        var result:Array<String> = [];
        for (var key in this.parameterTrackModels) {
            result.push(key);
        }
        return result;
    }


    //onDrop(ev: DragEvent): void {
    //ev.preventDefault();
    //var data = ev.dataTransfer.getData("text");
    //var parameterViewer = angular.element($("#parameter-view")).scope();
    //parameterViewer.$apply(function () {
    //    parameterViewer.addParameter(data.substr(10));
    //})
//}


}