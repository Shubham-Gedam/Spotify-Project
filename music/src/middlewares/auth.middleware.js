import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export async function authArtistMiddleware(req, res, next) {

    const token  = req.cookies.token

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }


    try {

        const decoded = jwt.verify(token, config.JWT_SECRET);
        if (decoded.role !== 'artist') {
            return res.status(403).json({ error: 'Forbidden' });
        }
        req.user = decoded;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: 'Unauthorized' });        
    }
}

export async function authUserMiddleware(req,res,next) {
    
     const token  = req.cookies.token

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
          const decoded = jwt.verify(token, config.JWT_SECRET)
          req.user = decoded
          next();
        
    } catch (error) {
        console.log(error);
         return res.status(401).json({ error: 'Unauthorized' }); 
        
    }
}    