import { Button, Dialog, DialogContent, DialogTitle, IconButton, Paper, Stack, TextField, Typography } from "@mui/material"
import { FC, FormEvent, useState } from "react"
import styles from './loginModal.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from "react-i18next";
import { PilasBloquesApi } from "../../../pbApi";
import { DialogSnackbar } from "../../dialogSnackbar/DialogSnackbar";
import theme from "../../../theme";

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
            <DialogTitle sx={{backgroundColor: theme.palette.text.secondary}} className={styles['login-header']}>{t('login')}
                <IconButton onClick={handleOnClose}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent className={styles['login-content']}>
                <Stack sx={{borderRight: `solid 1px ${theme.palette.text.primary}`}} className={styles['login-item']}>
                    <Typography variant="h6" sx={{fontWeight: 'bold'}}>{t('already')}</Typography>
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
                    <Button type='submit'>{t('login')}</Button>
                    </form>
                    <a className={styles['link']} onClick={handleOnClose} href="#/password-recovery" target="">{t('forgot')}</a>
                </Stack>  
                <div className={styles['login-item']}>
                    <img alt='login' className={styles['login-img']} src="imagenes/session/login.png"/>
                    <Typography variant="h6" sx={{fontWeight: 'bold'}}>{t('dontHaveUser')}</Typography>
                    <a className={styles['link']} onClick={handleOnClose} href="#/register" target="">{t('register')}</a>
                </div>  
                </DialogContent>
        </Dialog>
    </div>
}
