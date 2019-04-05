import { Usuario } from "./usuario";

export class UsuariosLista {
  public lista: Usuario[] = [];

  constructor() {}

  //Agregar un usuario
  public agregar(usuario: Usuario) {
    this.lista.push(usuario);
    console.log(this.lista);
    return usuario;
  }
  //Actualizar Nombre
  public actualizarNombre(isUsuario: string, nombre: string) {
    for (let usuario of this.lista) {
      if (usuario.id === isUsuario) {
        usuario.nombre = nombre;
        break;
      }
    }
    console.log("===Atualizando Usuarios===");
    console.log(this.lista);
  }

  //Lista de Usuarios
  public getLista() {
    return this.lista.filter(usuario =>{
      return usuario.nombre !== 'sin-nombre';
    });
  }

  //Lista de Usuarios
  public getUsuario(idUsuario: string) { return this.lista.find(usuario => {  return usuario.id === idUsuario });
  }
  //Usuarios de una sala en particular
  public getUsuariosSala(nombreSala: string) {
    return this.lista.filter(usuario => { return usuario.sala === nombreSala });
  }

  //Borrar un usuario en particular
  public deleteUsuario(idUsuario: string) {
    const usuarioTemp = this.getUsuario(idUsuario);
    this.lista = this.lista.filter(usuario => { return usuario.id !== idUsuario});
     return usuarioTemp;
  }
}
