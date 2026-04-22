export interface AnalyticsData {
  saved: number;
  applied: number;
  phoneScreen: number;
  interview: number;
  technicalAssessment: number;
  [key: string]: number | string | any; // Allow for any other fields the backend returns
}
