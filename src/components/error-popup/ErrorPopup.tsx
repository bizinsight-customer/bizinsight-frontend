import { useAppDispatch, useAppSelector } from "@/store";
import {
  closeErrorPopup,
  selectErrorPopup,
} from "@/store/global-slices/error-popup.slice";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  styled,
} from "@mui/material";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    minWidth: 320,
    maxWidth: 480,
    padding: theme.spacing(2),
  },
  "& .MuiBackdrop-root": {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
}));

const TitleContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const ErrorPopup = () => {
  const dispatch = useAppDispatch();
  const { isOpen, message } = useAppSelector(selectErrorPopup);

  const handleClose = () => {
    dispatch(closeErrorPopup());
  };

  return (
    <StyledDialog open={isOpen} onClose={handleClose}>
      <TitleContainer>
        <DialogTitle sx={{ p: 0, color: "error.main" }}>Error</DialogTitle>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </TitleContainer>
      <DialogContent sx={{ p: 0, mt: 2 }}>
        <Typography>{message}</Typography>
      </DialogContent>
    </StyledDialog>
  );
};
