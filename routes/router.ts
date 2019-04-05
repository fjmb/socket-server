import { EncuestaData } from '../classes/encuesta';
import { GraficaData } from './../classes/grafica';
import {Router, Request, Response}  from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket';

export const router = Router();


export const grafica = new GraficaData();
export const encuesta = new EncuestaData();

// =========================================================
// 'Grafica de encuentas'
// =========================================================
router.get('/encuesta',(req : Request, res : Response, next)=>{
    res.status(200).json({
        ok:true,
        encuesta : encuesta.getDataGrafica()
    });
})

router.post('/encuesta',(req : Request, res : Response, next)=>{
    const opcion = req.body.opcion;
    const unidades = Number(req.body.unidades);
    const server = Server.instace;

    encuesta.incrementValue(opcion, unidades);

    const payload = { 
        ok:true,
        encuesta : encuesta.getDataGrafica()
    };

    server.io.emit('grafica-encuesta',payload);

    res.status(200).json({
        ok:true,
        encuesta : encuesta.getDataGrafica()
    });
})


// =========================================================
// 'Grafica de prueba con sockets'
// =========================================================
router.get('/grafica',(req : Request, res : Response, next)=>{
    res.status(200).json({
        ok:true,
         grafica : grafica.getDataGrafica()
    });
})

router.post('/grafica',(req : Request, res : Response, next)=>{
    const mes = req.body.mes;
    const unidades = Number(req.body.unidades);
    const server = Server.instace;

    grafica.incrementValue(mes,unidades);

    const payload = { 
        ok:true,
        grafica : grafica.getDataGrafica()
    };

    server.io.emit('cambio-grafica',payload);

    res.status(200).json({
        ok:true,
         grafica : grafica.getDataGrafica()
    });
})
//MENSAJES
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