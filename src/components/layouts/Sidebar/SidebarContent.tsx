import { useTypedNavigate } from "@/hooks/useTypedNavigate";
import { AppRoutePath } from "@/types/routes.types";
import {
  ChevronLeft as ChevronLeftIcon,
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

  const handleNavigate = (path: AppRoutePath) => {
    navigate.navigateTo(path);
  };

  return (
    <>
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
      <List>
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
    </>
  );
};
