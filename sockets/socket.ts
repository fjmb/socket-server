import { UsuariosLista } from './../classes/usuario-lista';
import { Socket } from "dgram";
import socketIO  from 'socket.io';
import { Usuario } from '../classes/usuario';
export const usuariosConectados = new UsuariosLista();

export const conectarCliente = ( cliente: Socket, io: socketIO.Server) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}

export const deconectar = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on('disconnect', () => {
        usuariosConectados.deleteUsuario(cliente.id);
        console.log("===Usuarios eliminados===");
        console.log(usuariosConectados.getLista());
        console.log('Cliente Desconectado');
        io.emit('actives-users', usuariosConectados.getLista());
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
// Escuchar mensajes
export const configurarUsuario = (cliente: Socket, io: socketIO.Server ) => {
    cliente.on('configurar-usuario', (payload: {nombre: string}, callback : Function) => {
        console.log('Mensaje recibido', payload );
        //Emision de mensajes a todos los clientes conectados
        usuariosConectados.actualizarNombre( cliente.id, payload.nombre);
        io.emit('actives-users', usuariosConectados.getLista());
        callback({
            ok:true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        })
        // io.emit('messages-new', payload);
    })
}

// Escuchar mensajes
export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server ) => {
    cliente.on('obtener-usuarios', () => {
        io.to(cliente.id).emit('actives-users', usuariosConectados.getLista());
        // io.emit('messages-new', payload);
    })
}