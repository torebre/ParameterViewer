/*
 Draw parameter values inside a box defined by
 parameters given to the constructor.
 */


import {Component} from "angular2/angular2";


@Component(

)
class ParameterTrack {
    private colour: string = '#000000';
    private path: string;
    private raphaelPath = undefined;
    private boundingBox: RaphaelElement = undefined;
    private line;


    constructor(private parameterTrackModel: ParameterTrackModel, private paper: RaphaelPaper, private xOffset: number,
                private yOffset: number, private width: number, private height: number) {
        //this.parameterTrackModel = parameterTrackModel;
        this.parameterTrackModel.setParameterTrack(this);
        //this.paper = paper;
        //var xOffset = xOffset;
        //this.yOffset = yOffset;
        //var width = width2;
        //var height = height2;
        //this.colour = '#000000';
        // This represents the drawn line
        //var path = undefined;
        // TODO Is it necessery to have access to both paths?

    }


    addBoundingBox() {
        boundingBox = paper.rect(xOffset, yOffset, width, height);
        boundingBox.attr('stroke', this.colour);
    }

    /**
     A negative yCoord indicates that the line should
     not be drawn
     **/
    drawMarkerLine(yCoord: number) {
        if(line !== undefined) {
            line.remove();
        }
        if(yCoord < 0) {
            return;
        }
        line = paper.path('M' +xOffset +',' +yCoord +"h" +width);
        // TODO Colour just for testing
        line.attr('stroke', 'blue');
    }

    getModel() {
        return this.parameterTrackModel;
    }

    setColour(colour: string) {
        this.colour = colour;
    }

    render() {
        if(raphaelPath !== undefined) {
            raphaelPath.remove();
            boundingBox.remove();
        }
        addBoundingBox();
        var coordinates = parameterTrackModel.getParameterPath();
        path = generateFullSvgPath(coordinates);
        raphaelPath = this.paper.path(path);
        raphaelPath.attr('stroke', this.colour);
    }

    setHeight(newHeight: number) {
        console.log("Setting height for track: " +newHeight);
        paper.setSize(width, newHeight);
        height = newHeight;
    }

    setWidth(newWidth: number) {
        paper.setSize(newWidth, height);
        width = newWidth;
    }

    setXOffset(xOffset2: number) {
        xOffset = xOffset2;
    }

    scaleValue(value: number, min: number, max: number) {
        return (value - min) * width / (max - min);
    }

    generateFullSvgPath(coordinates) {
        var svgPath = "M " + xOffset + " " + yOffset;
        var skipRows = 0;
        var parameterRange = parameterTrackModel.getRange();

        for (var row = 0; row < height; ++row) {
            if (coordinates[row]) {
                var scaledAverage = scaleValue(coordinates[row].average, parameterRange.min, parameterRange.max);
                // TODO Use relative path instead?
                svgPath += "L" + (xOffset + scaledAverage) + ', ' + (yOffset + row);
                skipRows = 0;
            } else {
                skipRows++;
            }
        }
        // console.log('SVG path: ' +svgPath);
        return svgPath;
    }

}
