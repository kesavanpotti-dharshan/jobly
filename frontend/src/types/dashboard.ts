export interface DashboardStats {
  totalApplications: number;
  activeApplications: number;
  interviewsScheduled: number;
  offersReceived: number;
}

export interface ApplicationStatusCount {
  status: string;
  count: number;
  percentage: number;
}

export interface RecentApplication {
  id: string;
  companyName: string;
  roleTitle: string;
  status: string;
  appliedDate: string;
}

export interface Reminder {
  id: string;
  applicationId: string;
  companyName: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

export interface DashboardData {
  stats: DashboardStats;
  statusBreakdown: ApplicationStatusCount[];
  recentApplications: RecentApplication[];
  upcomingReminders: Reminder[];
}
export interface StatusBreakdown {
  status: string;
  count: number;
  percentage: number;
}

export interface MonthlyTrend {
  month: string;
  count: number;
}

export interface DashboardData {
  totalApplications: number;
  activeApplications: number;
  interviews: number;
  offers: number;
  rejections: number;
  responseRate: number;
  offerRate: number;
  statusBreakdown: StatusBreakdown[];
  monthlyTrend: MonthlyTrend[];
}
