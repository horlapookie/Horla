import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import { Article } from '../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db('horlapookie_support');

    if (req.method === 'GET') {
      const articles = await db
        .collection<Article>('articles')
        .find({})
        .sort({ views: -1 })
        .toArray();
      
      return res.status(200).json(articles);
    }

    if (req.method === 'POST') {
      const article: Article = {
        ...req.body,
        views: 0,
        createdAt: new Date(),
      };

      const result = await db.collection('articles').insertOne(article);
      return res.status(201).json({ success: true, id: result.insertedId });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
