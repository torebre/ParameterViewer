import {Component, Inject} from "@angular/core";
import {Backend} from "../backend/Backend";
import {ParameterInfo} from "../backend/ParameterInfo";





@Component({
    selector: "parameter-list",
    templateUrl: "app/templates/parameterList.html",
})
export class ParameterList {
    parameters:Array<ParameterInfo>;
    private searchText:string;


    // TODO Figure out why the Inject-annotation is needed here
    constructor(@Inject(Backend) private backend:Backend) {
        this.parameters = backend.getParameters();
    }


    updateSearchText(searchText:string):void {
        this.searchText = searchText;
        this.parameters = [];
        for(var parameterInfo of this.backend.getParameters()) {
            if(parameterInfo.name.search(searchText) != -1) {
                this.parameters.push(parameterInfo);
            }
        }
    }



}
