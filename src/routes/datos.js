const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/add', (req, res)=>{
    res.render('datos/add');
});


router.post('/add',async(req,res)=>{
    const {entidad, sede, nit, direccion, ciudad, celular, email} = req.body;
    const newUser ={entidad, sede, nit, direccion, ciudad, celular, email};
    await pool.query('insert into datos set ?',[newUser]);
    res.redirect('/datos/add');
});

router.get('/consultar',async(req,res)=>{
    //res.send('soy el consultar');
    const datos = await pool.query('select * from datos');

    res.render('datos/consultar',{datos});
});

router.get('/delete/:id',async(req,res)=>{
    const {id}= req.params;
    const datos = await pool.query('delete from datos where id=?',[id]);
    res.redirect('/datos/consultar');
});
module.exports = router;