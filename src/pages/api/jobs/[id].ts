import { NextApiRequest, NextApiResponse } from 'next';
import jobs from '../../../data/jobs.json'; 

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const jobId = parseInt(id as string);

  const job = jobs.jobs.find((job) => job.id === jobId);

  if (job) {
    res.status(200).json(job);
  } else {
    res.status(404).json({ error: 'Job not found' });
  }
}
