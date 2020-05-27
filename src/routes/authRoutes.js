const authMiddleware = require('../middlewares/auth');
const userRoute = require('./userRoute');

module.exports = app =>{
    
    app.use(authMiddleware);
    
    userRoute(app);
}