import { SERVER_PORT } from './../global/environment';
import express from  'express';

export default class Server{

    public app : express.Application;
    public port: number;

    constructor(){

        this.app = express();
        this.port = SERVER_PORT;
    }

    start(callback : Function){
        this.app.listen(this.port, callback)
    }
}