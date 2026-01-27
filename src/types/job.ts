export interface Requirements {
  mustHave?: string[];
  niceToHave?: string[];
}

export interface Benefits {
  health?: string[];
  financial?: string[];
  timeOff?: string[];
  learning?: string[];
  other?: string[];
}

export interface JobDescription {
  aboutUs?: string;
  roleOverview?: string;
  responsibilities?: string[];
  requirements?: Requirements;
  whyJoinUs?: string[];
  process?: string[];
  benefits?: Benefits;
}

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
  detailed?: JobDescription;
  scrapedAt?: string;
}

export interface JobsResponse {
  jobs: Job[];
  total: number;
}
