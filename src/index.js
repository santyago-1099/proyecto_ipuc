const express = require('express');
const morgan = require('morgan');
const exphds = require('express-handlebars');
const path = require('path');
// inicio
const app = express();

//Configuraciones
app.set('port',process.env.PORT || 4000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs', exphds({
    defaulLayout:'main',
    layoutDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine','.hbs');

//peticiones
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Variables globales
app.use((req,res,next)=>{
    next();
});

//rutas
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/principal',require('./routes/principal'));
app.use('/opciones',require('./routes/opciones'));
app.use('/covid',require('./routes/covid'));
app.use('/ingresos',require('./routes/ingresos'));
app.use('/egresos',require('./routes/egresos'));
app.use('/membresia',require('./routes/membresia'));
app.use('/datos',require('./routes/datos'));
app.use('/matrimonio',require('./routes/matrimonio'));
app.use('/comite',require('./routes/comite'));

//public
app.use(express.static(path.join(__dirname,'public')));

//inicia el server
app.listen(app.get('port'),()=>{
    console.log('server on port',app.get('port'));
});