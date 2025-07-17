// pages/api/tracked.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const jobs = await prisma.trackedJob.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return res.status(200).json(jobs);
    } catch (error: any) {
      console.error('FETCH TRACKED ERROR:', error);
      return res.status(500).json({ message: 'Failed to fetch tracked jobs' });
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid or missing ID' });
    }

    try {
      await prisma.trackedJob.delete({ where: { id } });
      return res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error: any) {
      console.error('DELETE ERROR:', error);
      return res.status(500).json({ message: 'Failed to delete job' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
