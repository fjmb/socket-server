import { SERVER_PORT } from './global/environment';
import Server from "./classes/server";
import { router } from './routes/router';
import bodyParser = require('body-parser');

const server = new Server();

//COORS
server.app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST","GET","PUT","DELETE","OPTIONS");
  
    next();
  });
  

//Body Parser
// parse application/x-www-form-urlencoded
server.app.use( bodyParser.urlencoded({extended:true}));
server.app.use( bodyParser.json());


server.app.use('/', router);


server.start(()=>{
    console.log(`Servidor corriendo en el puerto ${SERVER_PORT}`);
})