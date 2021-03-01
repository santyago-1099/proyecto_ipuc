const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/add', (req, res)=>{
    res.render('matrimonio/add');
});

router.post('/add',async(req,res)=>{
    const {fechaInscripcion, congregacion, folio, escritura, fechaEscritura, lugar, nombreEsposo, cedulaEsposo, nombreEsposa, cedulaEsposa, direccion, testigo1, cedulaTestigo1, testigo2, cedulaTestigo2 } = req.body;
    const newUser ={fechaInscripcion, congregacion, folio, escritura, fechaEscritura, lugar, nombreEsposo, cedulaEsposo, nombreEsposa, cedulaEsposa, direccion, testigo1, cedulaTestigo1, testigo2, cedulaTestigo2};
    await pool.query('insert into matrimonio set ?',[newUser]);
    res.redirect('/matrimonio/add');
});

router.get('/consultar',async(req,res)=>{
    //res.send('soy el consultar');
    const matrimonio = await pool.query('select * from matrimonio');

    res.render('matrimonio/consultar',{matrimonio});
});

router.get('/delete/:id',async(req,res)=>{
    const {id}= req.params;
    const matrimonio = await pool.query('delete from matrimonio where id=?',[id]);
    res.redirect('/matrimonio/consultar');
});
module.exports = router;



module.exports = router;