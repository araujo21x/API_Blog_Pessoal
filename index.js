const app = require('./src/config/custonExpress')();

app.listen(4100, ()=>{
    console.log('server ON!');
})