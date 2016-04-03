import {IParameterTrackModel} from "../backend/IParameterTrackModel";


/**
 Displays information about the parameter in a box
 shown above the parameter curve.
 **/
export class ParameterTrackHeader {
    private myXOffset:number;
    private myYOffset:number;
    private myWidth:number;
    private myHeight:number;
    private boundingBox:RaphaelElement;
    private parameterName:RaphaelElement;
    private xMargin:number = 20;
    private yMargin:number = 10;


    constructor(private raphaelPaper:RaphaelPaper, private parameterTrackModel:IParameterTrackModel) {

    }

    render():void {
        if (this.boundingBox !== undefined) {
            this.boundingBox.remove();
            this.parameterName.remove();
        }
        this.boundingBox = this.raphaelPaper.rect(this.myXOffset, this.myYOffset, this.myWidth, this.myHeight);


        this.parameterName = this.raphaelPaper.text(this.myXOffset + this.xMargin, this.myYOffset + this.yMargin,
            this.parameterTrackModel.getParameterName());
        this.parameterName.attr({
            "font-size": 16,
            "font-family": "Arial, Helvetica, sans-serif"
        });

    }

    setDimensions(xOffset:number, yOffset:number, width:number, height:number):void {
        this.myXOffset = xOffset;
        this.myYOffset = yOffset;
        this.myWidth = width;
        this.myHeight = height;
    }

    setWidth(width:number):void {
        this.myWidth = width;
    }

    getHeight():number {
        return this.myHeight;
    }

}
