import {Component} from "angular2/core";
import {ParameterTable} from "./ParameterTable";
import {ParameterList} from "./ParameterList";
import {Backend} from "../backend/Backend"
import {PaintManager} from "./PaintManager";
import {DataModel} from "./DataModel";


/**
 * This is the top level component for the application.
 * 
 */
@Component({
    selector: "parameter-viewer",
    templateUrl: "templates/parameterViewer.html",
    directives: [ParameterTable, ParameterList],
    // TODO Can some of these providers be removed?
    providers: [Backend, PaintManager, DataModel]
})
export class ParameterViewer {
    

    constructor() {

    }
    



}