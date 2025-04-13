import { Paper } from "@mui/material";
import { ChartType } from "../config/chart-types";

interface ChartWrapperProps {
  chartType: ChartType;
  children: React.ReactNode;
  onChartClick: (chartType: ChartType) => void;
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({
  chartType,
  children,
  onChartClick,
}) => {
  const handleClick = () => {
    onChartClick(chartType);
  };

  return (
    <Paper
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
      onClick={handleClick}
    >
      {children}
    </Paper>
  );
};
