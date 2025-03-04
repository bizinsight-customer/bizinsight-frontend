import {
  Add as AddIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router";

export const EmptyDocumentsList = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight={isMobile ? "150px" : "200px"}
      bgcolor="background.paper"
      borderRadius={1}
      p={isMobile ? 2 : 3}
    >
      <DescriptionIcon
        sx={{
          fontSize: isMobile ? 36 : 48,
          color: "text.secondary",
          mb: isMobile ? 1 : 2,
        }}
      />
      <Typography
        variant={isMobile ? "subtitle1" : "h6"}
        color="text.secondary"
        gutterBottom
        align="center"
      >
        No Documents Available
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        mb={isMobile ? 1.5 : 2}
        px={2}
      >
        Upload your first document to get started
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => navigate("/documents/new")}
        fullWidth={isMobile}
        sx={{ maxWidth: isMobile ? "100%" : "200px" }}
      >
        Upload Document
      </Button>
    </Box>
  );
};
