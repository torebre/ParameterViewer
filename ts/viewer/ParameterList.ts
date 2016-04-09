import {Component, Input} from "angular2/core";
import {Backend} from "../backend/Backend";
import {ParameterInfo} from "../backend/ParameterInfo";



@Component({
    selector: "parameter-list",
    templateUrl: "templates/parameterList.html",
    // providers: [Backend]
})
export class ParameterList {
    parameters:Array<ParameterInfo>;
    private searchText:string;

    
    constructor() { //private backend:Backend) {
        // this.parameters = backend.getParameters();
    }


    updateSearchText(searchText:string):void {
        this.searchText = searchText;
    }

    

}