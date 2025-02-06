import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { DesktopSidebar } from "./DesktopSidebar";
import { MobileSidebar } from "./MobileSidebar";
import { DRAWER_WIDTH } from "./SidebarConfig";
import { SidebarContent } from "./SidebarContent";

export const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isOpen, setIsOpen] = useState(!isMobile);

  const handleDrawerToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box
      component="nav"
      sx={{
        width: { md: isOpen ? DRAWER_WIDTH : 73 },
        flexShrink: 0,
      }}
    >
      {isMobile ? (
        <MobileSidebar isOpen={isOpen} onToggle={handleDrawerToggle}>
          <SidebarContent isOpen={isOpen} onToggle={handleDrawerToggle} />
        </MobileSidebar>
      ) : (
        <DesktopSidebar isOpen={isOpen}>
          <SidebarContent isOpen={isOpen} onToggle={handleDrawerToggle} />
        </DesktopSidebar>
      )}
    </Box>
  );
};
