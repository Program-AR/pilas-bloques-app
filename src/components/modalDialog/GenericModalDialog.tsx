import { FC } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from "@mui/material"
import { useThemeContext } from '../../theme/ThemeContext';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog"    
    >
      <Paper {...props} />
    </Draggable>
  );
}

export interface ModalDialogProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
    dialogProps?: DialogProps;
    children?: JSX.Element;
    isDraggable?: boolean;
  }

export const GenericModalDialog: FC<ModalDialogProps> = ({
    isOpen,
    onConfirm,
    onCancel,
    title,
    dialogProps,
    isDraggable,
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
    
    const { theme } = useThemeContext()

    return (
        <>
        <Dialog 
          open={isOpen} 
          {...dialogProps} 
          disableRestoreFocus
          onClose={handleClose}
          PaperComponent={isDraggable ? PaperComponent : undefined}
          aria-labelledby="draggable-dialog" 
        >          
        <DialogTitle id="draggable-dialog" sx={{ cursor: `${isDraggable ? 'move':'auto'}`, fontWeight: 'bold', height: '50px', display: 'flex', alignItems: 'center'}}>{title}</DialogTitle>
        <DialogContent sx={{backgroundColor: theme.palette.background.default}}>
          {children}
        </DialogContent>
        <DialogActions sx={{backgroundColor: theme.palette.background.default}}>
          <Button color="error" variant="contained" onClick={onCancel}>X</Button>
          <Button color="success" variant="contained" data-testid="generic-ok" onClick={onConfirm}>✔</Button>
        </DialogActions>
      </Dialog>
      </>
    );
    
};