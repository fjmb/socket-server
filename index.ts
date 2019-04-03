import { SERVER_PORT } from './global/environment';
import Server from "./classes/server";
import { router } from './routes/router';
import bodyParser = require('body-parser');
import cors from 'cors';

const server = Server.instace;

//Body Parser
// parse application/x-www-form-urlencoded
server.app.use( bodyParser.urlencoded({extended:true}));
server.app.use( bodyParser.json());

//COORS
server.app.use( cors({ origin: true, credentials: true  }) );

//Ruta de servicios
server.app.use('/', router);

server.start(()=>{
    console.log(`Servidor corriendo en el puerto ${SERVER_PORT}`);
})