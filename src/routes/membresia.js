const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/add', (req, res)=>{
    res.render('membresia/add');
});

router.post('/add',async(req,res)=>{
    const {nombres, apellidos, cedula, telefono, fechaNacimiento, fechaBautismo, nombrePastor, sellado} = req.body;
    const newUser ={nombres, apellidos, cedula, telefono, fechaNacimiento, fechaBautismo, nombrePastor, sellado};
    await pool.query('insert into membresia set ?',[newUser]);
    res.redirect('/membresia/add');
});
router.get('/consultar',async(req,res)=>{
    //res.send('soy el consultar');
    const membresia = await pool.query('select * from membresia');

    res.render('membresia/consultar',{membresia});
});

router.get('/delete/:id',async(req,res)=>{
    const {id}= req.params;
    const membresia = await pool.query('delete from membresia where id=?',[id]);
    res.redirect('/membresia/consultar');
});

module.exports = router;