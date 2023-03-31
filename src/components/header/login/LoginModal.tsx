import { Button, Dialog, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material"
import { FC } from "react"
import styles from './loginModal.module.css';
import CloseIcon from '@mui/icons-material/Close';


export interface DialogBasicProps {
    open: boolean,
    onClose: () => void,
  }  

export const LoginModal:FC<DialogBasicProps> = ({open, onClose}) => {

    const handleSubmit = () => {
        console.log("submit")
    }

    return <div>
        <Dialog 
            PaperProps={{ style: { width: '800px' } }}
            scroll='paper'
            maxWidth={false}
            className={styles['login-dialog']} 
            open={open} 
            onClose={onClose}
            >
            <DialogTitle className={styles['login-header']}>Iniciar sesión
                <IconButton onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent className={styles['login-content']}>
                <div className={styles['login-item']}>
                    <h3> Ya tengo usuario</h3>
                    <form className={styles['login-form']} onSubmit={handleSubmit}>
                    <TextField 
                        className={styles['input']}
                        id="standard-basic"
                        label="Usuario"
                        variant="standard"
                        required={true} />
                    <TextField 
                        className={styles['input']}
                        id="standard-basic"
                        label="Contraseña"
                        variant="standard"
                        type="password"
                        required={true} />
                    <Button className={styles['loginBtn']} onClick={handleSubmit}>Iniciar sesión</Button>
                    </form>
                    <a className={styles.link} href="#/password-recovery" target="">Olvidé mi usuario o constraseña</a>
                </div>  
                <div className={styles['login-item']}>
                    <img className={styles['login-img']} src="imagenes/session/login.png"/>
                    <h3>Aún no tengo usuario</h3>
                    <a className={styles.link} href="#/register" target="">¡Registrate haciendo click acá!</a>
                </div>  
                </DialogContent>
        </Dialog>
    </div>
}
