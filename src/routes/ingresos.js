const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/add', (req, res)=>{
    res.render('ingresos/add');
});

router.post('/add',async(req,res)=>{
    const {directiva, concepto, descripcion, valor} = req.body;
    const newUser ={directiva, concepto, descripcion, valor};
    await pool.query('insert into ingresos set ?',[newUser]);
    res.redirect('/ingresos/add');
});
router.get('/consultar',async(req,res)=>{
    //res.send('soy el consultar');
    const ingresos = await pool.query('select * from ingresos');

    res.render('ingresos/consultar',{ingresos});
});

router.get('/delete/:id',async(req,res)=>{
    const {id}= req.params;
    const ingresos = await pool.query('delete from ingresos where id=?',[id]);
    res.redirect('/ingresos/consultar');
});
module.exports = router;



module.exports = router;