import { Drawer } from "@mui/material";
import { DRAWER_WIDTH } from "./SidebarConfig";

interface MobileSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const MobileSidebar = ({
  isOpen,
  onToggle,
  children,
}: MobileSidebarProps) => {
  return (
    <Drawer
      variant="temporary"
      open={isOpen}
      onClose={onToggle}
      ModalProps={{
        keepMounted: true, // Better mobile performance
      }}
      sx={{
        display: { xs: "block", md: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: DRAWER_WIDTH,
        },
      }}
    >
      {children}
    </Drawer>
  );
};
