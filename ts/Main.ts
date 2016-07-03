///<reference path="../node_modules/angular2/platform/browser.d.ts"/>

import {bootstrap} from 'angular2/platform/browser';
import {ParameterViewer} from "./viewer/ParameterViewer";
import {provide} from "angular2/core";
import {APP_CONFIG, MY_CONFIG} from "./Config";



// bootstrap(ParameterList, []).catch(err => console.error(err));

bootstrap(ParameterViewer, [provide(APP_CONFIG, {useValue: MY_CONFIG})]).catch(err => console.error(err));