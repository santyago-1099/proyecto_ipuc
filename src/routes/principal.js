const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/add', (req, res)=>{
    res.render('principal/add');
});

router.post('/add',async(req,res)=>{

    const {usuario, contra} = req.body;
    const newUser ={usuario, contra};
    await pool.query('insert into principal set ?',[newUser]);
    res.redirect('/principal/add');
});


router.get('/consultar',async(req,res)=>{
    //res.send('soy el consultar');
    const usuario = await pool.query('select * from principal');

    res.render('principal/consultar',{usuario});
});

router.get('/delete/:id',async(req,res)=>{
    const {id}= req.params;
    const usuario = await pool.query('delete from principal where id=?',[id]);
    res.redirect('/principal/consultar');
});
module.exports = router;