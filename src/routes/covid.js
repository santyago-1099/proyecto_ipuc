const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/add', (req, res)=>{
    res.render('covid/add');
});

router.post('/add',async(req,res)=>{

    const {nombres, apellidos, cedula, telefono, sintomas, fecha, temperatura} = req.body;
    const newUser ={nombres, apellidos, cedula, telefono, sintomas, fecha, temperatura};
    await pool.query('insert into covid set ?',[newUser]);
    res.redirect('/covid/add');
});

router.get('/consultar',async(req,res)=>{
    //res.send('soy el consultar');
    const covid = await pool.query('select * from covid');

    res.render('covid/consultar',{covid});
});

router.get('/delete/:id',async(req,res)=>{
    const {id}= req.params;
    const covid = await pool.query('delete from covid where id=?',[id]);
    res.redirect('/covid/consultar');
});


module.exports = router;