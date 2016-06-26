import {Component} from "angular2/core";
import {ParameterTable} from "./ParameterTable";
import {ParameterList} from "./ParameterList";
import {Backend} from "../backend/Backend"
import {PaintManager} from "./PaintManager";


/**
 * This is the top level component for the application.
 * 
 */
@Component({
    selector: "parameter-viewer",
    templateUrl: "templates/parameterViewer.html",
    directives: [ParameterTable, ParameterList],
    providers: [Backend, PaintManager]
})
export class ParameterViewer {
    

    constructor() {

    }
    



}