import { usePageTitle } from "@/hooks/usePageTitle";
import { useTypedNavigate } from "@/hooks/useTypedNavigate";
import {
  ArrowBack as ArrowBackIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useMatch } from "react-router";

interface NavbarProps {
  onSidebarToggle: () => void;
}

export const Navbar = ({ onSidebarToggle }: NavbarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const pageTitle = usePageTitle();
  const { goBack } = useTypedNavigate();

  // Check if current route matches the chart details or document detail page
  const isChartPage = useMatch("/dashboard/chart/:chartType");
  const isDocumentDetailPage = useMatch("/documents/:id");
  const isDocumentHistoryPage = useMatch("/documents/history");
  let showBackButton = Boolean(isChartPage || isDocumentDetailPage);

  if (isDocumentHistoryPage) {
    showBackButton = false;
  }

  const handleBack = () => {
    goBack();
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "transparent",
        color: "text.primary",
        boxShadow: 0,
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={onSidebarToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        )}
        {showBackButton && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleBack}
            sx={{ mr: 2 }}
            aria-label="back"
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography
          variant={isMobile ? "h5" : "h4"}
          component="h1"
          fontWeight={"bold"}
          sx={{
            fontSize: isMobile ? "1.5rem" : undefined,
            textAlign: isMobile ? "center" : "left",
          }}
        >
          {pageTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
