const express = require('express');
const app = express();

//morgan es un midleware
const morgan = require('morgan');



//configuraciones
app.set('port', process.env.PORT || 3000);
app.set("json spaces", 2);

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//routes
//app.use(require('./index'));
app.use('/api/movies', require('./src/controller/serviceRest'));


//iniciamos el servidor
app.listen(app.get('port'), () => {
    console.log(`servidor iniciado en el puerto ${app.get('port')}`);
});