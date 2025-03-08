import { useAuth } from "@/features/auth/hooks/useAuth";
import { useTypedNavigate } from "@/hooks/useTypedNavigate";
import { AppRoutePath } from "@/types/routes.types";
import {
  ChevronLeft as ChevronLeftIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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

  const handleNavigate = (path: AppRoutePath) => {
    navigate.navigateTo(path);
    // Only close the sidebar on mobile devices
    if (isMobile) {
      onToggle();
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          p: 1,
        }}
      >
        <IconButton onClick={onToggle}>
          {isOpen ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigate(item.path)}
              sx={{
                minHeight: 48,
                justifyContent: isOpen ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isOpen ? 2 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {isOpen && <ListItemText primary={item.label} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              minHeight: 48,
              justifyContent: isOpen ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isOpen ? 2 : "auto",
                justifyContent: "center",
                color: theme.palette.error.main,
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            {isOpen && (
              <ListItemText
                primary="Logout"
                sx={{ color: theme.palette.error.main }}
              />
            )}
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};
