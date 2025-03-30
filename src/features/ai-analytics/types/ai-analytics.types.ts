export interface AnalysisRequest {
  year: number;
  month?: number | null;
}

export interface AnalysisResponse {
  analysis: string; // Markdown formatted text
  recommendations: string[]; // Array of recommendation strings
}

export interface GetAIAnalyticsRequest {
  year: number;
  month?: number | null;
}

export interface AIAnalyticsReportResponse {
  analysis: string; // Markdown formatted text
  recommendations: string[]; // Array of recommendation strings
}

export interface AnalysisState {
  year: number;
  month: number | null;
}
