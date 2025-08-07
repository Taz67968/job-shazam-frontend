// pages/api/track.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const sanitize = (input: any) =>
    typeof input === 'string' ? input.replace(/\u0000/g, '').trim() : input;

  try {
    let { title, company, location, type, url, appliedDate, status } = req.body;

    title = sanitize(title);
    company = sanitize(company);
    location = sanitize(location);
    type = sanitize(type);
    url = sanitize(url);
    status = sanitize(status);
    appliedDate = sanitize(appliedDate);

    if (!title || !company || !location || !type || !url || !appliedDate || !status) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // ✅ Prevent duplicates
    const existingJob = await prisma.trackedJob.findFirst({
      where: {
        title,
        company,
        location,
        url,
      },
    });

    if (existingJob) {
      return res.status(200).json({ message: 'Job already tracked', job: existingJob });
    }

    const job = await prisma.trackedJob.create({
      data: {
        title,
        company,
        location,
        type,
        url,
        appliedDate: new Date(appliedDate),
        status,
      },
    });

    return res.status(200).json(job);
  } catch (error: any) {
    console.error('TRACK API ERROR:', error);
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message ?? error,
    });
  }
}
