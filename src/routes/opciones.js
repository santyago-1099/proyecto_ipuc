const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/opciones', (req, res)=>{
    res.render('opciones/opciones');
});

router.get('/covid', (req, res)=>{
    res.render('opciones/covid');
});

router.get('/ingresos', (req, res)=>{
    res.render('opciones/ingresos');
});

router.get('/egresos', (req, res)=>{
    res.render('opciones/egresos');
});

router.get('/membresia', (req, res)=>{
    res.render('opciones/membresia');
});


module.exports = router;
