import React from 'react';
import { TextField, Button } from '@mui/material';
import { GenericModalDialog } from './GenericModalDialog';


export const SampleModalDialog:React.FC = () => {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleOnClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Abrir Dialogo Modal
        </Button>
        <GenericModalDialog
                        isOpen={open}
                        onClose={handleOnClose}
                        title="Ejemplo de Dialogo Modal"
                        subtitle="Texto que se quiera mostrar en el contenido del Dialogo"
                        children={ <>
                                   <TextField
                                      required
                                      id="required"
                                      label="Domicilio"
                                      defaultValue="Calle"
                                      variant="standard"
                                    />
                                    <TextField
                                      id="field-2"
                                      label="Piso"
                                      defaultValue="Piso"
                                      variant="standard"
                                    />
                                    <TextField
                                      id="field-3"
                                      label="Depto"
                                      defaultValue="Depto"
                                      variant="standard"
                                    />
                                    </>
                                  }
                        /> 
    </div>
  );
}
