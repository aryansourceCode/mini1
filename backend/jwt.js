const jwt=require('jsonwebtoken');
require('dotenv').config();

const jwtauthmiddleware=(req,res,next)=>{
    const authorization=req.headers.authorization;  //checked from auth
    if(!authorization)return res.status(401).json({error:"token not found"});
    const token=req.headers.authorization.split(' ')[1];  ///bearer token is used
    if(!token)return res.status(401).json({error:'unauthorised'});
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);//verification of token taking place
        console.log(decoded);
        req.user=decoded;
        next();
    }catch(err){
        console.log(err);
    }
}
const generatetoken=(userdata)=>{
    return jwt.sign(userdata,process.env.JWT_SECRET,{expiresIn:30000});// generation of token
}

module.exports={jwtauthmiddleware,generatetoken};