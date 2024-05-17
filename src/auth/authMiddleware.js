import DecryptToken from './jwt.js';
/*revisar H*/
export function AuthMiddleware(req,res,next)
{
    if (!req.headers.authorization)
    {
        res.status(401).send('Forbidden');
    }else
    {
        const token =req.headers.authorization.split(' ')[1];
        const payload=DecryptToken(token);
        req.user=payload;
    }
}