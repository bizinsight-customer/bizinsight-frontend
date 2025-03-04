import { Add as AddIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router";

export const DocumentsHeader = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      alignItems={isMobile ? "stretch" : "center"}
      justifyContent="space-between"
      gap={2}
      mb={2}
    >
      <Typography
        variant={isMobile ? "h5" : "h4"}
        component="h1"
        sx={{
          fontSize: isMobile ? "1.5rem" : undefined,
          textAlign: isMobile ? "center" : "left",
        }}
      >
        Documents
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => navigate("/documents/new")}
        fullWidth={isMobile}
      >
        Upload Document
      </Button>
    </Box>
  );
};
