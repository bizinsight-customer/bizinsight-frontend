import { Drawer } from "@mui/material";
import { DRAWER_WIDTH } from "./SidebarConfig";

interface DesktopSidebarProps {
  children: React.ReactNode;
}

export const DesktopSidebar = ({ children }: DesktopSidebarProps) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: DRAWER_WIDTH,
          overflowX: "hidden",
        },
      }}
      open
    >
      {children}
    </Drawer>
  );
};
