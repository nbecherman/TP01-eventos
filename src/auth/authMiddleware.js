import DecryptToken from './jwt.js';

export function AuthMiddleware(req,res,next)
{
    if (!req.headers.authorization)
    {
        res.status(401).send('Forbidden');
    }else
    {
        
    }
}