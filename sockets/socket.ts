import { Socket } from "dgram";
import socketIO  from 'socket.io';

export const deconectar = ( cliente: Socket ) => {
    cliente.on('disconnect', () => {
        console.log('Cliente Desconectado');
    })
}

// Escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server ) => {
    cliente.on('menssage', (payload: {de: string, cuerpo: string}) => {
        console.log('Mensaje recibido', payload );
        //Emision de mensajes a todos los clientes conectados
        io.emit('messages-new', payload);
    })
}