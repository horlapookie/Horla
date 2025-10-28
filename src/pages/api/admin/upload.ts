import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import clientPromise from '../../../lib/mongodb';
import { AdminContent } from '../../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db('horlapookie_support');

    if (req.method === 'POST') {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized - No token provided' });
      }

      const token = authHeader.substring(7);
      const adminPasskey = process.env.ADMIN_PASSKEY;

      if (!adminPasskey) {
        return res.status(500).json({ error: 'Server configuration error' });
      }

      try {
        const decoded = jwt.verify(token, adminPasskey) as { admin: boolean };
        
        if (!decoded.admin) {
          return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }
      } catch (jwtError) {
        return res.status(401).json({ error: 'Unauthorized - Token validation failed' });
      }

      const content: AdminContent = {
        ...req.body,
        createdAt: new Date(),
      };

      const result = await db.collection('admin_uploads').insertOne(content);
      return res.status(201).json({ success: true, id: result.insertedId });
    }

    if (req.method === 'GET') {
      const uploads = await db
        .collection<AdminContent>('admin_uploads')
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
      
      return res.status(200).json(uploads);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
