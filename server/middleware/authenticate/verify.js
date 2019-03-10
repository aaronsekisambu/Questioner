import jwt from 'jsonwebtoken';

import secret from '../../helpers/keys';

export default {
  verifyToken:(req,res,next)=>{
    const token=req.headers.authorization || req.body.token;
    if(!token){
      return res.status(401).json({
        status: 401,
        data: {
          error:'Unauthorised: Insert a token in the header'
        }
      });
    }
    const mine=token.split(' ');
    jwt.verify(mine[1],secret.secret,(err,decoded)=>{
      if(err){
        return res.status(401).json({
          status: 401, 
          data: {
            error:'Unauthorized'
          }
        });
      }
      req.user=decoded;
      next();
    });
  }   
};
