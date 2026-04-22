export type ApplicationStatus = 'Saved' | 'Applied' | 'Interviewing' | 'Offered' | 'Rejected';

export interface Application {
  id: string;
  companyName: string;
  roleTitle: string;
  jobUrl: string;
  status: ApplicationStatus;
  location: string;
  workMode: string;
  salaryMin: number;
  salaryMax: number;
  appliedDate: string;
  deadlineDate: string;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateApplicationRequest {
  companyName: string;
  roleTitle: string;
  jobUrl: string;
  status: ApplicationStatus;
  location: string;
  workMode: string;
  salaryMin?: number;
  salaryMax?: number;
  appliedDate: string;
  deadlineDate: string;
  priority?: number;
}

export interface UpdateApplicationRequest extends Partial<CreateApplicationRequest> {
  id: string;
}