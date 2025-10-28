import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { passkey } = req.body;
    const correctPasskey = process.env.ADMIN_PASSKEY;

    if (!correctPasskey) {
      return res.status(500).json({ error: 'Server configuration error' });
    }

    if (passkey === correctPasskey) {
      const token = jwt.sign(
        { admin: true, timestamp: Date.now() },
        correctPasskey,
        { expiresIn: '24h' }
      );
      
      return res.status(200).json({ 
        authenticated: true,
        token: token
      });
    } else {
      return res.status(401).json({ 
        authenticated: false,
        error: 'Invalid passkey'
      });
    }
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
