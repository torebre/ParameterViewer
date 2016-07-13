import {OpaqueToken} from '@angular/core';


export interface Config {
    WEB_SOCKET_ENDPOINT: string;
}


export const MY_CONFIG: Config = {
    WEB_SOCKET_ENDPOINT: 'ws://localhost:9000/events'
};


export let APP_CONFIG = new OpaqueToken('app.config');