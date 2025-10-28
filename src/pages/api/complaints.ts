import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import { Complaint } from '../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db('horlapookie_support');

    if (req.method === 'GET') {
      const complaints = await db
        .collection<Complaint>('complaints')
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
      
      return res.status(200).json(complaints);
    }

    if (req.method === 'POST') {
      const complaint: Complaint = {
        ...req.body,
        status: 'pending',
        createdAt: new Date(),
      };

      const result = await db.collection('complaints').insertOne(complaint);
      return res.status(201).json({ success: true, id: result.insertedId });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
