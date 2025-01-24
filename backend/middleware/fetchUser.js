const jwt = require('jsonwebtoken');
const JWT_SECRET='shhhhh';
const fetchUser =(req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"});
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        if (!data || !data.id) {
            throw new Error("Invalid token payload");
        }
        req.user=data;
        next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate using a valid token"});
    }
}
module.exports = fetchUser;