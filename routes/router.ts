import {Router, Request, Response}  from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket';

export const router = Router();
 
router.get('/mensajes',(req : Request, res : Response, next)=>{
    res.status(200).json({
        ok:true,
        mensaje: 'Petición Realizada Correctamente'
    });
})

router.post('/mensajes',(req : Request, res : Response, next)=>{
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const server = Server.instace;
    const payload = {de, cuerpo};

    server.io.emit('messages-new',payload);

    res.status(200).json({
        ok:true,
        cuerpo,
        de
    });
})
router.post('/mensajes/:id',(req : Request, res : Response, next)=>{
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const server = Server.instace;
    const payload = {de, cuerpo};
    server.io.in(id).emit('messages-private',payload);

    res.status(200).json({
        ok:true,
        cuerpo,
        de,
        id
    });
})

//Servicio para obtener todos los ids de los usuarios
router.get('/usuarios',(req : Request, res : Response, next)=>{

    const server = Server.instace;
    server.io.clients( ( err, clientes: string []) =>{
        if (err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            clientes
        });
    })

})
 //Servicio para obtener todos los ids de los usuarios
router.get('/usuarios/detalle',(req : Request, res : Response, next)=>{
   
    res.status(200).json({
            ok: true,
            usuarios: usuariosConectados.getLista()
    })
})

export default router;