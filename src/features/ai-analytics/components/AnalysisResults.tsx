import { ErrorMessage } from "@/components/common/ErrorMessage";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { Box, Paper, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { AIAnalyticsReportResponse } from "../types/ai-analytics.types";

interface AnalysisResultsProps {
  isLoading: boolean;
  error: unknown;
  data: AIAnalyticsReportResponse | undefined;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  isLoading,
  error,
  data,
}) => {
  return (
    <Box>
      {isLoading && (
        <Box sx={{ mt: 4 }}>
          <LoadingSpinner text="Analyzing data..." />
        </Box>
      )}

      {error && (
        <Box sx={{ mt: 4 }}>
          <ErrorMessage message="Failed to analyze data. Please try again." />
        </Box>
      )}

      {data && (
        <>
          <Paper sx={{ p: 4, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Analysis
            </Typography>
            <Box
              sx={{
                fontFamily:
                  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif',
                lineHeight: 1.6,
                textAlign: "left",
                "& h1, & h2, & h3, & h4, & h5, & h6": {
                  mt: 3,
                  mb: 2,
                  fontWeight: 600,
                },
                "& p": {
                  mb: 2,
                },
                "& ul, & ol": {
                  mb: 2,
                  pl: 3,
                },
                "& code": {
                  p: 0.5,
                  borderRadius: 1,
                  bgcolor: "grey.100",
                  fontFamily: "monospace",
                },
              }}
            >
              <ReactMarkdown>{data.analysis}</ReactMarkdown>
            </Box>
          </Paper>

          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Recommendations
            </Typography>
            <Box component="ul" sx={{ pl: 0, m: 0, listStyle: "none" }}>
              {data.recommendations.map((recommendation, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    "&:last-child": { mb: 0 },
                    bgcolor: "grey.50",
                    border: 1,
                    borderColor: "grey.200",
                    borderRadius: 1,
                    p: 2,
                    display: "flex",
                  }}
                >
                  <Typography
                    sx={{
                      minWidth: "24px",
                      fontWeight: 600,
                      color: "primary.main",
                    }}
                  >
                    {index + 1}.
                  </Typography>
                  <Box
                    sx={{
                      flex: 1,
                      fontFamily:
                        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif',
                      lineHeight: 1.6,
                      textAlign: "left",
                      "& h1, & h2, & h3, & h4, & h5, & h6": {
                        mt: 3,
                        mb: 2,
                        fontWeight: 600,
                      },
                      "& p": {
                        mb: 2,
                        "&:last-child": { mb: 0 },
                      },
                      "& ul, & ol": {
                        mb: 2,
                        pl: 3,
                      },
                      "& code": {
                        p: 0.5,
                        borderRadius: 1,
                        bgcolor: "grey.100",
                        fontFamily: "monospace",
                      },
                    }}
                  >
                    <ReactMarkdown>{recommendation}</ReactMarkdown>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </>
      )}
    </Box>
  );
};
