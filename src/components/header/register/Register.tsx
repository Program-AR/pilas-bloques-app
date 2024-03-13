import { Button, Divider, Collapse, Link, Paper, Stack, TextField, Typography, Checkbox, FormControlLabel } from "@mui/material"
import { FC, FormEvent, useState } from "react"
import styles from './register.module.css';
import { useTranslation } from "react-i18next";
import { RegisterUser, PilasBloquesApi } from "../../../pbApi";
import { DialogSnackbar } from "../../dialogSnackbar/DialogSnackbar";
import { useThemeContext } from "../../../theme/ThemeContext";
import { PBLink, termsAndConditionsLink } from "../../footer/Footer"
import { PBCard } from "../../PBCard";
import { Header } from "../Header";
import { avatars } from "../login/SessionButton";

export const Register: FC = () => {
  const { theme } = useThemeContext()

  const { t } = useTranslation('register');

  const [registerUser, setRegisterUser] = useState<RegisterUser | null>(null)
  const [userExists, setUserExists] = useState<boolean>(false)
  const [validUsername, setValidUsername] = useState<boolean>(true)
  const [validParentId, setValidParentId] = useState<boolean>(true)
  const [confirmPasswordOk, setConfirmPasswordOk] = useState<boolean>(false)
  const [termsAndConditions, setTermAndConditions] = useState<boolean>(false)
  const [wrongRegister, setWrongRegister] = useState<boolean>(false)
  const [serverError, setServerError] = useState<boolean>(false)
  const [whyReqData, setWhyReqData] = useState<boolean>(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await PilasBloquesApi.register(registerUser!)
      handleOnClose()

    } catch (error: any) {
      if (error.status === 400) {
        setWrongRegister(true)
      } else {
        setServerError(true)
      }
    }
  }

  const validateRegister = (): boolean => registerUser !== null &&
                                          registerUser.username !== '' &&
                                          registerUser.password !== '' &&
                                          registerUser.email !== '' &&
                                          registerUser.parentDNI !== '' &&
                                          registerUser.parentName !== '' &&
                                          validParentId &&
                                          validUsername &&
                                          !userExists &&
                                          confirmPasswordOk &&
                                          termsAndConditions

  const handleOnClose = () => {
    setWrongRegister(false)
  }

  const checkUsername = async (username: string ) => {
    try {
      return await PilasBloquesApi.userExists(username) === 'true'
    } catch (error: any) {
      if (error.status === 400) {
        setWrongRegister(true)
      } else {
        setServerError(true)
      }
    }
  }

  const handleParentId = (parentId: string) => {
    if ( parentId !== undefined && parentId !== '' )
    {
      setRegisterUser({ ...registerUser!, parentDNI: parentId })
      setValidParentId(parentId.length > 5)
    } 
    else setValidParentId(true)
  }

  const handleUser = (username: string) => {
    const validChars = new RegExp("[^a-zA-Z0-9-]");
    if ( username !== '' && username !== undefined )
    {
      if ( !checkUsername(username) )
      {
        setValidUsername(!validChars.test(username))
        setRegisterUser({ ...registerUser!, username: username })
        setUserExists(false)
      }
      else setUserExists(true)
    } 
    else setUserExists(false)
  }

  return <>
    <Header />
    <Stack alignItems="center" style={{ backgroundImage: "url(imagenes/book-background.svg)" }}>
      <PBCard style={{ maxWidth: 'calc(var(--creator-max-width)*0.75', padding: theme.spacing(2) }}>
        <Stack alignItems="center">
          <Typography variant="h3">{t('register')}</Typography>
          <img alt="register" width="40%" src="imagenes/session/register.png"></img>
          <Divider sx={{ width: "100%", margin: theme.spacing(1) }} variant="middle" />
          <form style={{ alignItems: "center" }} onSubmit={handleSubmit} className={styles['register-form']}>
            <TextField
              className={styles['input']}
              label={t('username')}
              variant="standard"
              error={userExists || !validUsername}
              onChange={props => handleUser(props.target.value)}
              helperText={userExists ? t('errorUsername') : !validUsername ? t('validUsername') : ''}
              required />
            <TextField
              className={styles['input']}
              label={t('password')}
              variant="standard"
              type="password"
              onChange={props => setRegisterUser({ ...registerUser!, password: props.target.value })}
              required />
            <TextField
              className={styles['input']}
              label={t('confirmPassword')}
              variant="standard"
              type="password"
              error={(registerUser?.password ? !confirmPasswordOk : false)}
              onChange={props => setConfirmPasswordOk(registerUser?.password === props.target.value)}
              helperText={registerUser?.password && !confirmPasswordOk ? t('errorPassword') : ''}
              required />
            <TextField
              className={styles['input']}
              label={t('email')}
              variant="standard"
              type="email"
              onChange={props => setRegisterUser({ ...registerUser!, email: props.target.value })}
              required />
            <Typography variant="h5">{t('avatar')}</Typography>
            <Stack maxWidth="50%" flexDirection="row" justifyContent="center" flexWrap="wrap">
              {avatars.map(avatar =>
                <Button onClick={() => setRegisterUser({ ...registerUser!, avatarURL: avatar })} >
                  <img alt="avatar" src={avatar} style={{ filter: registerUser?.avatarURL !== null && registerUser?.avatarURL === avatar ? "" : "grayscale(100%)" }} />
                </Button>
              )}
            </Stack>
            <Stack alignItems="center">
              <Typography variant="h5">{t('parentalConsent')}</Typography>
              <Typography variant="caption">{t('adult')}</Typography>
            </Stack>
            <TextField
              className={styles['input']}
              label={t('parentName')}
              variant="standard"
              onChange={props => setRegisterUser({ ...registerUser!, parentName: props.target.value })}
              required />
            <TextField
              className={styles['input']}
              label={t('parentId')}
              variant="standard"
              type="number"
              error={!validParentId}
              onChange={props => handleParentId(props.target.value )}
              helperText={!validParentId ? t('errorParentId') : ''}
              required />
            <Stack sx={{ cursor: "pointer", flexDirection: "column", textAlign: "justify" }} onClick={() => setWhyReqData(!whyReqData)}>
              <Typography align="center">{t("whyData.title")}</Typography>
              <Collapse style={{ padding: "10px" }} in={whyReqData}>
                <Typography>{t("whyData.privacy")}</Typography>
                <Typography>{t("whyData.dataProtectionLaw")}&nbsp;
                  <PBLink to={termsAndConditionsLink}>{t("linkTerms")}</PBLink></Typography>
                <Typography>{t("whyData.parentalContact")}&nbsp;
                  <Link href="mailto:pilasbloques@program.ar">pilasbloques@program.ar</Link>&nbsp;
                  {t("whyData.whyContact")}</Typography>
              </Collapse>
            </Stack>

            <FormControlLabel
              label={<Typography>{t('terms')}<PBLink to={termsAndConditionsLink}>{t("linkTerms")}</PBLink></Typography>}
              control={<Checkbox sx={{ color: theme.palette.primary.main }}
                onChange={() => setTermAndConditions(!termsAndConditions)}
                required />
              } />
            <Paper hidden={!wrongRegister} className={styles['paper']} elevation={2}>{t('wrong')}</Paper>
            <DialogSnackbar
              open={serverError}
              onClose={() => setServerError(false)}
              message={t('serverError')} />
            <Stack sx={{ width: "100%", flexDirection: "row", justifyContent: "space-evenly" }}>
              <Button variant="contained" color="success" type='submit' disabled={!validateRegister()}>{t('registerMe')}</Button>
              <Button variant="contained" color="error" onClick={handleOnClose} href="#" target="">{t('cancel')}</Button>
            </Stack>
          </form>         
        </Stack>
      </PBCard>
    </Stack>
  </>
}
