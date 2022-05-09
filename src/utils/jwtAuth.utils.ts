import * as fs from 'fs';
import * as jwt from 'jsonwebtoken'
export const Verify = async (token) => {
  try {
    const publicKey = fs.readFileSync('public.key');
    const decoded: any = await jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    return decoded

  } catch (err) {
    if (err) {
      return false
    }
  }
}


export const Sign = async (payload) => {
  try {
    const privateKey = fs.readFileSync('private.key');
    const token = await jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '7d' });
    return token
  } catch (err) {
    if (err) {
      return false
    }
  }
}