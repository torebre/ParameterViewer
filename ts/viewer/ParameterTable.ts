import {Component, Inject, Input, OnInit, ElementRef} from "angular2/core";
import {DataModel} from "../viewer/DataModel";
import {ParameterTrack} from "../viewer/ParameterTrack";
import {ParameterTrackHeader} from "../viewer/ParameterTrackHeader";
import {IParameterTrackModel} from "../backend/IParameterTrackModel";
import {Backend} from "../backend/Backend";
import {ParameterInfo} from "../backend/ParameterInfo";


@Component({
    selector: 'parameter-table',
    templateUrl: 'templates/parameterTable.html',
    directives: [ParameterTrack]
    
})
export class ParameterTable implements OnInit {
    private dataModel: DataModel;
    private parameterTrackModels:Array<IParameterTrackModel> = [];
    private parameterTrackHeaders:Array<ParameterTrackHeader> = [];
    private indexTrackMap:Array<number> = [];
    private numberOfParameters = 0;

    parameters:Array<ParameterInfo> = [];

    


    // constructor(private colWidth: number, private colHeight: number, private backend: IBackend) {
    //     this.dataModel = new DataModel(colHeight, backend);
    // }

    constructor(@Inject(Backend) private backend: Backend) {
        // TODO Do not hardcode column height
        this.dataModel = new DataModel(100, backend);
        
        // TODO Just here for testing
        var parameterInfo = new ParameterInfo("Test1", "test");
        this.parameters.push(parameterInfo);
        var parameterInfo2 = new ParameterInfo("Test2", "test");
        this.parameters.push(parameterInfo);
        
    }

    public updateMarkerLineForAllParameterTracks(yCoord: number):void {
        for (let i = 0; i < this.parameterTrackModels.length; ++i) {
            this.parameterTrackModels[i].updateMarkerLine(yCoord);
        }
    }

    removeParameter(parameter: number):void {
        delete this.parameterTrackModels[parameter];
    }

    // drawParameter(trackContainerElement: HTMLElement, parameterName: number):void {
    //     var parameterTrackModel = this.parameterTrackModels[parameterName];
    //
    //     //console.log('Model: ' + parameterTrackModel);
    //
    //     if (this.papers[parameterName] == undefined) {
    //         this.papers[parameterName] = Raphael(trackContainerElement, this.colWidth, this.colHeight);
    //     }
    //     var paper = Raphael(trackContai-nerElement, this.colWidth, this.colHeight);
    //     // TODO Need to figure out the life cycle of the papers, and then
    //     // delete the old parameter tracks attached to the old papers
    //     this.parameterTracks[parameterName] = new ParameterTrack(parameterTrackModel, paper, 0, 0,
    //         this.colHeight,
    //         this.colWidth);
    //     this.indexTrackMap[this.numberOfParameters] = parameterName;
    //     ++this.numberOfParameters;
    //     this.parameterTrackHeaders[parameterName] = new ParameterTrackHeader(paper, parameterTrackModel);
    //
    //     this.render();
    // }


    setColumnWidths(widths: Array<number>) {
        for (let counter = 0; counter < this.numberOfParameters; ++counter) {
            var key = this.indexTrackMap[counter];
            this.parameterTracks[key].setWidth(widths[counter]);
        }
        this.render();
    }

    setColumnHeights(heights: Array<number>) {
        for (let counter = 0; counter < this.numberOfParameters; ++counter) {
            var key = this.indexTrackMap[counter];
            this.parameterTracks[key].setHeight(heights[counter]);
        }
        this.render();
    }

    setColour(parameter:number, colour:string) {
        for (var i = 0; i < this.parameterTracks.length; ++i) {
            if (this.parameterTracks[i].getModel().getParameter() == parameter) {
                this.parameterTracks[i].setColour(colour);
                this.parameterTracks[i].render();
            }
        }
    }


    redraw() {
        console.log('Redrawing');
        // TODO If nothing else needs to be done, render can be made public
        this.render();
    }

    updateColumnWidths() {
        // TODO For now just give all the columns the same width
        if (this.parameterTracks.length == 0) {
            return;
        }
        var cumulativeWidth = 0;
        var widthPerTrack = this.width / this.parameterTracks.length;
        for (var i = 0; i < this.parameterTracks.length; ++i) {

            console.log('Setting offset: ' + cumulativeWidth);

            this.parameterTracks[i].setXOffset(cumulativeWidth);
            this.parameterTracks[i].setWidth(widthPerTrack);


            this.parameterTrackHeaders[i].setDimensions(cumulativeWidth, 0, widthPerTrack, 0);
            cumulativeWidth += widthPerTrack;
        }
    }

    render() {
        console.log('Number of parameter tracks: ' + this.parameterTracks.length);
        console.log('Number of parameter track models: ' + this.parameterTrackModels.length);

        for (var key in this.parameterTrackModels) {
            this.parameterTrackModels[key].render();
        }
    }

    calculateLayout():Array<number> {
        if (this.parameterTracks.length == 0) {
            return [0];
        }
        var widths = new Array<number>(this.parameterTracks.length);
        for (var i = 0; i < this.parameterTracks.length; ++i) {
            widths[i] = this.width / this.parameterTracks.length;
        }
        return widths;
    }

    zoomIn():void {
        this.dataModel.zoomIn();
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


    ngOnInit():any {
        return this.getTracks();
    }
    
    getTracks():Array<string> {
        return this.testTracks;
    }


}