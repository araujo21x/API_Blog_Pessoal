const app = require('express')();
const bodyParser = require('body-parser');
const morgan = require('morgan');

const routes = require('../routes/routes');
const db = require('./mongoDb');

module.exports = () =>{

    db.connect(err => {
        if(err)console.log(`não conectou com o banco`);
        else console.log(`conectou ao banco!!!`);
    });

    app.use(morgan(`dev`));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    routes(app);

    return app; 
}
