import {OpaqueToken} from 'angular2/core';


export interface Config {
    WEB_SOCKET_ENDPOINT: string;
}


export const MY_CONFIG: Config = {
    WEB_SOCKET_ENDPOINT: 'http://localhost:9000/echo'
};


export let APP_CONFIG = new OpaqueToken('app.config');