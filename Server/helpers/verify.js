const jwt=require("jsonwebtoken");
const secret=require("../helpers/keys").secret;
module.exports={
 verifyToken:(req,res,next)=>{
     const token=req.headers.authorization || req.body.token;
     if(!token){
        return res.status(401).json({error:"unauthorized"});
     }
     const mine=token.split(' ');
     jwt.verify(mine[1],secret,(err,decoded)=>{
       if(err){
        return res.status(401).json({error:"unauthorized"});
       }
       req.user=decoded;
       next();
     });
 }   
}
