import React from 'react';
import { TextField, Button } from '@mui/material';
import { GenericModalDialog } from './GenericModalDialog';


export const SampleModalDialog:React.FC = () => {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleOnCancel = () => {
      alert('cancelé')
      setOpen(false);
    };

    const handleOnConfirm = () => {
      alert('acepté')
      setOpen(false);
    };
  
    return (
      <div style={{display: "flex", justifyContent: "center"}}>
        <Button variant="outlined" onClick={handleClickOpen}>
          Abrir Dialogo Modal
        </Button>
        <GenericModalDialog
                        isOpen={open}
                        onConfirm={handleOnConfirm}
                        onCancel={handleOnCancel}
                        title="Ejemplo de Dialogo Modal"
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
