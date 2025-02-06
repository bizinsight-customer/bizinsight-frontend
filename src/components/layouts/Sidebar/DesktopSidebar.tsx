import { Drawer } from "@mui/material";
import { DRAWER_WIDTH } from "./SidebarConfig";

interface DesktopSidebarProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export const DesktopSidebar = ({ isOpen, children }: DesktopSidebarProps) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: isOpen ? DRAWER_WIDTH : 73,
          overflowX: "hidden",
          transition: (theme) =>
            theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        },
      }}
      open={isOpen}
    >
      {children}
    </Drawer>
  );
};
