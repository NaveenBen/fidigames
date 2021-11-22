const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
    const apiKey = req.headers['api-key'];
    if (!apiKey) return res.status(401).send('Access Denied');
    try{
        const verified = jwt.verify(apiKey, "S3CR3T_K3Y");
        req.user = verified;
        next();
    }catch{
        res.status(400).send('Invalid api-key');
    }
}

module.exports = verifyToken;
