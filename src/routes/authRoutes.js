const authMiddleware = require('../middlewares/auth');

module.exports = app =>{
    
    app.use(authMiddleware);
    
    app.get("/", (req,res)=> {
        res.send('oi ' + req.userId);
    })
}