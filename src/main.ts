import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';


// import {bootstrap} from '@angular/platform-browser-dynamic';
import {ParameterViewer} from "./app/viewer/ParameterViewer";
import {provide} from "@angular/core";
import {APP_CONFIG, MY_CONFIG} from "./app/Config";

if (environment.production) {
  enableProdMode();
}

// bootstrap(AppComponent);




bootstrap(ParameterViewer, [provide(APP_CONFIG, {useValue: MY_CONFIG})]).catch(err => console.error(err));
