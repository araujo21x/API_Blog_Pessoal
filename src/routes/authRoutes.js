const authMiddleware = require('../middlewares/auth');
const userRoute = require('./userRoute');
const postRoute = require('./postRoutes');
const commentRoute = require('./commentRoutes');

module.exports = app =>{
    
    app.use(authMiddleware);
    
    userRoute(app);
    postRoute(app);
    commentRoute(app);
    
}