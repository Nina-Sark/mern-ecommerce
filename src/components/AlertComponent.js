import { IconButton, Snackbar } from "@mui/material";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { clearError } from "../state/reducers/UserReducer";

export const AlertComponent = ({
  open,
  message,
  errorName = "",
  onCloseF,
  status = "error",
}) => {
  const colors = {
    error: "#FE1401",
    success: "#2ECC71",
  };
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(clearError({ error_name: errorName }));
  };

  return (
    <Snackbar
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: colors[status],
        },
      }}
      open={open}
      message={message}
      autoHideDuration={4000}
      action={
        <IconButton onClick={onCloseF ? onCloseF : onClose}>
          <MdClose color="#fff" />
        </IconButton>
      }
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    />
  );
};