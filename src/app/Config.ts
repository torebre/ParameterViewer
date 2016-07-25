import {OpaqueToken} from '@angular/core';


export interface Config {
  WEB_SOCKET_ENDPOINT:string;
  REST_BASE_ENDPOINT:string;
}


export const MY_CONFIG:Config = {
    WEB_SOCKET_ENDPOINT: 'ws://localhost:9000/events',
    REST_BASE_ENDPOINT: 'http://127.0.0.1:9800'
  }

export let APP_CONFIG = new OpaqueToken('app.config');
