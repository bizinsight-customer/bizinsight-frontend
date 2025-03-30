import { Container, Paper } from "@mui/material";
import { useState } from "react";
import { AnalysisDateSelector } from "../components/AnalysisDateSelector";
import { AnalysisResults } from "../components/AnalysisResults";
import { aiAnalyticsApiSlice } from "../store/ai-analytics.api-slice";
import { AnalysisState } from "../types/ai-analytics.types";

export const AiAnalyticsPage = () => {
  const [analysisState, setAnalysisState] = useState<AnalysisState>({
    year: new Date().getFullYear(),
    month: null,
  });

  const [getReport, { data, isLoading, error }] =
    aiAnalyticsApiSlice.useGetReportMutation();

  const handleAnalyze = () => {
    getReport({
      year: analysisState.year,
      month: analysisState.month || undefined,
    });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <AnalysisDateSelector
          year={analysisState.year}
          month={analysisState.month}
          onYearChange={(year: number) =>
            setAnalysisState((prev) => ({ ...prev, year }))
          }
          onMonthChange={(month: number | null) =>
            setAnalysisState((prev) => ({ ...prev, month }))
          }
          onAnalyze={handleAnalyze}
        />
      </Paper>

      {(isLoading || error || data) && (
        <AnalysisResults isLoading={isLoading} error={error} data={data} />
      )}
    </Container>
  );
};
