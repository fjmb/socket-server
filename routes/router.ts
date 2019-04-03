import {Router, Request, Response}  from 'express';

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
    res.status(200).json({
        ok:true,
        cuerpo,
        de
    });
})
router.post('/mensajes/:id',(req : Request, res : Response, next)=>{
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id
    res.status(200).json({
        ok:true,
        cuerpo,
        de,
        id
    });
})
