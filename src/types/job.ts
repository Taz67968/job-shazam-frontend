export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  applyUrl: string;
  source: string;
}

export interface JobsResponse {
  jobs: Job[];
  total: number;
}
