import {Component, Input, Inject} from "angular2/core";
import {Backend} from "../backend/Backend";
import {ParameterInfo} from "../backend/ParameterInfo";



@Component({
    selector: "parameter-list",
    templateUrl: "templates/parameterList.html",
    // TODO Should probably not be defined here
    providers: [Backend]
})
export class ParameterList {
    parameters:Array<ParameterInfo>;
    private searchText:string;

    // TODO Figure out why the Inject-annotation is needed here
    constructor(@Inject(Backend) backend:Backend) {
        this.parameters = backend.getParameters();
    }


    updateSearchText(searchText:string):void {
        this.searchText = searchText;
    }
    
    

    

}