import {bootstrap} from '@angular/platform-browser-dynamic';
import {ParameterViewer} from "./viewer/ParameterViewer";
import {provide} from "@angular/core";
import {APP_CONFIG, MY_CONFIG} from "./Config";


bootstrap(ParameterViewer, [provide(APP_CONFIG, {useValue: MY_CONFIG})]).catch(err => console.error(err));