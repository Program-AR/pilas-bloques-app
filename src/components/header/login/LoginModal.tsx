import { Button, Dialog, DialogContent, DialogTitle, IconButton, Paper, Snackbar, SnackbarContent, TextField } from "@mui/material"
import { FC, FormEvent, useState } from "react"
import styles from './loginModal.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from "react-i18next";
import { PilasBloquesApi } from "../../../pbApi";
import { DialogSnackbar } from "../../dialogSnackbar/DialogSnackbar";

export type LoginModalProps = {
    open: boolean
    onClose: () => void
}

export const LoginModal:FC<LoginModalProps> = ({open, onClose}) => {

    const { t } = useTranslation('login');

    const [username, setUsername] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    const [wrongLogin, setWrongLogin] = useState<boolean>(false)
    const [serverError, setServerError] = useState<boolean>(false)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const credentials = {username, password}
        try{
           await PilasBloquesApi.login(credentials)
           handleOnClose()
        }catch(error: any){
            if (error.status === 400){
                setWrongLogin(true)
            }else{
                setServerError(true)
            } 
        }
    }   

    const handleOnClose = () =>{
        setWrongLogin(false)
        onClose()
    }

    return <div>
        <Dialog 
            PaperProps={{ style: { width: '800px' } }}
            scroll='paper'
            maxWidth={false}
            open={open} 
            onClose={handleOnClose}
            >
            <DialogTitle className={styles['login-header']}>{t('login')}
                <IconButton onClick={handleOnClose}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent className={styles['login-content']}>
                <div className={styles['login-item']}>
                    <h3>{t('already')}</h3>
                    <form className={styles['login-form']} onSubmit={handleSubmit}>
                    <TextField 
                        className={styles['input']}
                        label={t('username')}
                        variant="standard"
                        onChange={props => setUsername(props.target.value)}
                        required />
                    <TextField 
                        className={styles['input']}
                        label={t('password')}
                        variant="standard"
                        type="password"
                        onChange={props => setPassword(props.target.value)}
                        required />
                    <Paper hidden={!wrongLogin} className={styles['paper']} elevation={2}>{t('wrong')}</Paper>
                    <DialogSnackbar 
                        open={serverError}
                        onClose={() => setServerError(false)} 
                        message={t('serverError')}/>
                    <Button type='submit' className={styles['login-btn']}>{t('login')}</Button>
                    </form>
                    <a className={styles['link']} onClick={handleOnClose} href="#/password-recovery" target="">{t('forgot')}</a>
                </div>  
                <div className={styles['login-item']}>
                    <img alt='login' className={styles['login-img']} src="imagenes/session/login.png"/>
                    <h3>{t('dontHaveUser')}</h3>
                    <a className={styles['link']} onClick={handleOnClose} href="#/register" target="">{t('register')}</a>
                </div>  
                </DialogContent>
        </Dialog>
    </div>
}
