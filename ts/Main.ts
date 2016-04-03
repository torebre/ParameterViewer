///<reference path="../node_modules/angular2/platform/browser.d.ts"/>

import {bootstrap} from 'angular2/platform/browser';
import {ParameterList} from './viewer/ParameterList';
import {AppComponent} from './AppComponent';



//bootstrap(AppComponent, []).catch(err => console.error(err));

bootstrap(ParameterList, []).catch(err => console.error(err));
