import {Backend} from "../backend/Backend";
import {Injectable} from "angular2/core";


@Injectable()
export class PaintManager {


    constructor(private backend:Backend) {



    }



    repaint() {



    }
    
    
    
    getSvgPathForParameter(parameter:string):string {
        // TODO Just here for testing
        return "M50,50 A30,50 0 0,1 100,100";
        
    }





}