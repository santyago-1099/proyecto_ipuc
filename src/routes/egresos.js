const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/add', (req, res)=>{
    res.render('egresos/add');
});


router.post('/add',async(req,res)=>{
    const {directiva, concepto, descripcion, valor} = req.body;
    const newUser ={directiva, concepto, descripcion, valor};
    await pool.query('insert into egresos set ?',[newUser]);
    res.redirect('/egresos/add');
});

router.get('/consultar',async(req,res)=>{
    //res.send('soy el consultar');
    const egresos = await pool.query('select * from egresos');

    res.render('egresos/consultar',{egresos});
});

router.get('/delete/:id',async(req,res)=>{
    const {id}= req.params;
    const egresos = await pool.query('delete from egresos where id=?',[id]);
    res.redirect('/egresos/consultar');
});

module.exports = router;