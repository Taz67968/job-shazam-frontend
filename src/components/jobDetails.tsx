'use client'

import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface Job {
  id: number
  title: string
  company: string
  location: string
  type: string
  url: string
  description?: string
}

interface JobDetailsModalProps {
  jobId: number | null
  isOpen: boolean
  onClose: () => void
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ jobId, isOpen, onClose }) => {
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!jobId || !isOpen) return

    const fetchJob = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(`/api/jobs/${jobId}`)
        if (!res.ok) {
          throw new Error('Failed to fetch job')
        }
        const data = await res.json()
        setJob(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchJob()
  }, [jobId, isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent className="max-w-xl bg-primary text-white">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="animate-spin h-6 w-6 mr-2" />
            Loading...
          </div>
        ) : error || !job ? (
          <p className="text-red-600">{error || 'Job not found'}</p>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{job.title}</DialogTitle>
            </DialogHeader>
            <p className="text-white font-semibold">{job.company}</p>
            <p className="text-sm">{job.location} - {job.type}</p>
            <div className="mt-4">
              <p className="text-white whitespace-pre-line">{job.description}</p>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button onClick={onClose} variant="outline" className='text-black'>Close</Button>
              <Button asChild>
                <a href={job.url} target="_blank" rel="noopener noreferrer">
                  Apply Now
                </a>
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default JobDetailsModal
