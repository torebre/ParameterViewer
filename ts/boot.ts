import {bootstrap} from 'angular2/platform/browser';
import {ParameterViewer} from './viewer/ParameterViewer';
import {DummyBackend} from "./backend/DummyBackend";


bootstrap(ParameterViewer, [DummyBackend]).catch(err => console.error(err));