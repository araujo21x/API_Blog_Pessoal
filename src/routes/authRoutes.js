const authMiddleware = require('../middlewares/auth');
const userRoute = require('./userRoute');
const postRoute = require('./postRoutes');

module.exports = app =>{
    
    app.use(authMiddleware);
    
    userRoute(app);
    postRoute(app);

}