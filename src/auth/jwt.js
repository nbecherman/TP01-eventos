import jwt from 'jsonwebtoken';
/*revisar G*/
const secretKey = process.env.JWT_SECRET;

export default function generateToken(user) {
    const payload = {
        id: user.id,
        username: user.username
    };
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}