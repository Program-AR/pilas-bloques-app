import { Snackbar, SnackbarContent } from "@mui/material"
import { FC } from "react"
import styles from "./dialogSnackbar.module.css"

export interface DialogSnackbarProps {
  open: boolean
  onClose: () => void
  message: string
}

export const DialogSnackbar: FC<DialogSnackbarProps> = ({
  open,
  onClose,
  message,
}) => {
  return (
    <Snackbar
      data-testid="dialog-snackbar"
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
    >
      <SnackbarContent message={message} className={styles.snackbar} />
    </Snackbar>
  )
}
