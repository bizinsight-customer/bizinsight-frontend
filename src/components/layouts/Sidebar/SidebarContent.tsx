import { avatar, companyLogo } from "@/assets/images";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useGetUserCompanyDataQuery } from "@/features/profile/store/user-company.api-slice";
import { useTypedNavigate } from "@/hooks/useTypedNavigate";
import { AppRoutePath } from "@/types/routes.types";
import {
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  Upload as UploadIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useLocation } from "react-router";
import { menuItems } from "./SidebarConfig";

interface SidebarContentProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const SidebarContent = ({ isOpen, onToggle }: SidebarContentProps) => {
  const location = useLocation();
  const navigate = useTypedNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { signOut } = useAuth();
  const { data: companyData } = useGetUserCompanyDataQuery();

  // On desktop, treat the sidebar as always open
  const isEffectivelyOpen = isMobile ? isOpen : true;

  const handleNavigate = (path: AppRoutePath) => {
    navigate.navigateTo(path);
    if (isMobile) {
      onToggle();
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  const handleUpload = () => {
    navigate.navigateTo("/documents/new");
    if (isMobile) {
      onToggle();
    }
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", height: "100%", p: 2 }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 4, mt: 2 }}>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          {isEffectivelyOpen && (
            <Box
              component="img"
              src={companyLogo}
              alt="AI Thing Logo"
              sx={{ width: 130 }}
            />
          )}
        </Box>
        {isMobile && (
          <IconButton
            onClick={onToggle}
            sx={{ position: "absolute", right: 16, top: 16 }}
          >
            {isEffectivelyOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        )}
      </Box>

      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                selected={isSelected}
                onClick={() => handleNavigate(item.path)}
                sx={{
                  minHeight: 48,
                  px: 2,
                  borderRadius: 1,
                  position: "relative",
                  bgcolor: "transparent !important",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "3px",
                    height: "24px",
                    borderRadius: "0 2px 2px 0",
                    bgcolor: "primary.main",
                    opacity: isSelected ? 1 : 0,
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  sx={{
                    m: 0,
                    color: isSelected ? "primary.main" : "text.primary",
                    "& .MuiTypography-root": {
                      fontWeight: isSelected ? 600 : 400,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {isEffectivelyOpen && (
        <Box
          sx={{
            p: 2,
            border: "1px dashed",
            borderColor: "primary.main",
            borderRadius: 1,
            textAlign: "center",
            mb: 4,
          }}
        >
          <Button
            startIcon={<UploadIcon />}
            onClick={handleUpload}
            sx={{ color: "primary.main" }}
          >
            UPLOAD DOCUMENT
          </Button>
        </Box>
      )}

      {isEffectivelyOpen && companyData && (
        <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            src={avatar}
            alt="Company Logo"
            sx={{ width: 40, borderRadius: "50%", mr: 2 }}
          />
          <Box>
            <Typography variant="subtitle2">{companyData.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {companyData.tax_number}
            </Typography>
          </Box>
        </Box>
      )}

      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              minHeight: 48,
              px: 2,
              color: theme.palette.error.main,
            }}
          >
            <ListItemText
              primary="Log out"
              sx={{
                m: 0,
                "& .MuiTypography-root": {
                  fontWeight: 500,
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};
