import { configurarUsuario } from "./../sockets/socket";
import express from "express";
import { SERVER_PORT } from "./../global/environment";
import socketIO from "socket.io";
import http from "http";
import * as socket from "../sockets/socket";



export default class Server {
  private static _instace: Server;
  public app: express.Application;
  public port: number;
  public io: SocketIO.Server;
  private httpServer: http.Server;

  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;

    this.httpServer = new http.Server(this.app);
    this.io = socketIO(this.httpServer);
    this.listennerSockets();
  }

  public static get instace() {
    return this._instace || (this._instace = new this());
  }

  private listennerSockets() {
    console.log("Escuchando socket");

    this.io.on("connection", cliente => {
      console.log("Cliente Conectado:", cliente.id);

      //Conectar cliente 
      socket.conectarCliente(cliente,this.io);
      // Escuchar mensajes
      socket.configurarUsuario(cliente, this.io);
      //Desconectar
      socket.deconectar(cliente,this.io);
      // Escuchar mensajes
      socket.mensaje(cliente, this.io);
      //Obtener usuarios activos
      socket.obtenerUsuarios(cliente, this.io);

    });
  }

  start(callback: Function) {
    this.httpServer.listen(this.port, callback);
  }
}
