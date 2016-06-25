///<reference path="../node_modules/angular2/platform/browser.d.ts"/>

import {bootstrap} from 'angular2/platform/browser';
import {ParameterList} from './viewer/ParameterList';
import {AppComponent} from './AppComponent';
import {ParameterViewer} from "./viewer/ParameterViewer";



// bootstrap(ParameterList, []).catch(err => console.error(err));

bootstrap(ParameterViewer, []).catch(err => console.error(err));