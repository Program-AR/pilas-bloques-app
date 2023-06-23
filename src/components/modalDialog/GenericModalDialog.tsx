import { FC } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

export interface ModalDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onCancel: () => void;
    title: string;
    subtitle: string;
    children?: JSX.Element;
  }

export const GenericModalDialog: FC<ModalDialogProps> = ({
    isOpen,
    onClose,
    onCancel,
    title,
    subtitle,
    children
  }) => {
 
    const handleClose = (
      event: {},
      reason: "backdropClick" | "escapeKeyDown"
    ) => {
      if (reason !== "backdropClick") {
        onClose();
      }
    };

    return (
        <>
        <Dialog open={isOpen} onClose={handleClose} >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{subtitle}</DialogContentText>
          <br/>
          {children}
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={onCancel}>X</Button>
          <Button color="success" variant="contained" onClick={onClose}>✔</Button>
        </DialogActions>
      </Dialog>
      </>
    );
    
};