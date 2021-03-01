const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/add', (req, res)=>{
    res.render('comite/add');
});


router.post('/add',async(req,res)=>{
    const {nombre} = req.body;
    const newUser ={nombre};
    await pool.query('insert into comite set ?',[newUser]);
    res.redirect('/comite/add');
});

router.get('/consultar',async(req,res)=>{
    //res.send('soy el consultar');
    const comite = await pool.query('select * from comite');

    res.render('comite/consultar',{comite});
});

router.get('/delete/:id',async(req,res)=>{
    const {id}= req.params;
    const comite = await pool.query('delete from comite where id=?',[id]);
    res.redirect('/comite/consultar');
});
module.exports = router;
