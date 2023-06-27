import { FC } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"

export interface ModalDialogProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
    children?: JSX.Element;
  }

export const GenericModalDialog: FC<ModalDialogProps> = ({
    isOpen,
    onConfirm,
    onCancel,
    title,
    children
  }) => {
 
    const handleClose = (
      event: {},
      reason: "backdropClick" | "escapeKeyDown"
    ) => {
      if (reason !== "backdropClick") {
        onCancel();
      }
    };

    return (
        <>
        <Dialog open={isOpen} onClose={handleClose} >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={onCancel}>X</Button>
          <Button color="success" variant="contained" data-testid="generic-ok" onClick={onConfirm}>✔</Button>
        </DialogActions>
      </Dialog>
      </>
    );
    
};