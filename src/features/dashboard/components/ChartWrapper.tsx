import { useTypedNavigate } from "@/hooks/useTypedNavigate";
import { Paper } from "@mui/material";
import { ChartType } from "../config/chart-types";

interface ChartWrapperProps {
  chartType: ChartType;
  children: React.ReactNode;
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({
  chartType,
  children,
}) => {
  const navigate = useTypedNavigate();

  const handleClick = () => {
    navigate.navigateTo("/dashboard/chart/:chartType", { chartType });
  };

  return (
    <Paper
      sx={{
        p: 3,
        height: "450px",
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
