import { z } from 'zod';

export const applicationSchema = z.object({
  companyName: z
    .string()
    .min(1, 'Company name is required')
    .max(100, 'Company name is too long'),
  roleTitle: z
    .string()
    .min(1, 'Position is required')
    .max(100, 'Position is too long'),
  jobUrl: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),
  status: z.enum(['Saved', 'Applied', 'Interviewing', 'Offered', 'Rejected']),
  location: z.string().min(1, 'Location is required'),
  workMode: z.enum(['Onsite', 'Remote', 'Hybrid']),
  appliedDate: z.string().min(1, 'Applied date is required'),
  deadlineDate: z.string().min(1, 'Deadline date is required'),
  salaryMin: z.number().optional(),
  salaryMax: z.number().optional(),
  priority: z.number().optional(),
});

export type ApplicationFormValues = z.infer<typeof applicationSchema>;
