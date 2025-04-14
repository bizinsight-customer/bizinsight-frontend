import { Box, useMediaQuery, useTheme } from "@mui/material";
import { DesktopSidebar } from "./DesktopSidebar";
import { MobileSidebar } from "./MobileSidebar";
import { DRAWER_WIDTH } from "./SidebarConfig";
import { SidebarContent } from "./SidebarContent";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      component="nav"
      sx={{
        width: { md: DRAWER_WIDTH },
        flexShrink: 0,
      }}
    >
      {isMobile ? (
        <MobileSidebar isOpen={isOpen} onToggle={onToggle}>
          <SidebarContent isOpen={isOpen} onToggle={onToggle} />
        </MobileSidebar>
      ) : (
        <DesktopSidebar>
          <SidebarContent isOpen={isOpen} onToggle={onToggle} />
        </DesktopSidebar>
      )}
    </Box>
  );
};
