const { verifyToken } = require('../services/authenticate');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authotization;

    if (!authHeader) return res.status(401).json({ error: `não existe token` });

    const parts = authHeader.split(' ');

    if (parts.length !== 2) return res.status(401).json({ error: `erro no token` });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ error: `token mal formatado` });

    verifyToken(token).then(id => {
        req.userId = id;
        return next();
    }).catch(err => { return res.status(400).json({ error: err }) })

};
