import { Button, Collapse, Paper, Stack, Typography, Checkbox, FormControlLabel } from "@mui/material"
import { FC, FormEvent, useState } from "react"
import styles from './register.module.css';
import { useTranslation } from "react-i18next";
import { RegisterUser, PilasBloquesApi } from "../../../pbApi";
import { DialogSnackbar } from "../../dialogSnackbar/DialogSnackbar";
import { useThemeContext } from "../../../theme/ThemeContext";
import { PBLink, termsAndConditionsLink } from "../../footer/Footer"
import { Header } from "../../header/Header";
import { avatars } from "../login/SessionButton";
import { useNavigate } from "react-router-dom";
import { PasswordStrength, testingPasswordStrength } from "./StrengthPassword";
import { PBMailLink, UserCard, UserTextField } from "../userForm";

export const Register: FC = () => {
  const { theme } = useThemeContext()
  const navigate = useNavigate()

  const { t } = useTranslation('register');

  const [registerUser, setRegisterUser] = useState<RegisterUser | null>(null)
  const [userExists, setUserExists] = useState<boolean>(false)
  const [validUsername, setValidUsername] = useState<boolean>(true)
  const [validParentId, setValidParentId] = useState<boolean>(true)
  const [validPassword, setValidPassword] = useState<PasswordStrength>(PasswordStrength.WEAK)
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
    navigate("/#")
  }

  const checkUsername = async (username: string) => {
    try {
      return await PilasBloquesApi.userExists(username)
    } catch (error: any) {
      if (error.status === 400) {
        setWrongRegister(true)
      } else {
        setServerError(true)
      }
    }
  }

  const handleParentId = (parentId: string) => {
    if (parentId) {
      setRegisterUser({ ...registerUser!, parentDNI: parentId })
      setValidParentId(parentId.length > 5)
    }
    else setValidParentId(true)
  }

  const handlePassword = (password: string) => {
    setValidPassword(testingPasswordStrength(password))
    setRegisterUser({ ...registerUser!, password: password })
  }

  const handleUser = async (username: string) => {
    const validChars = new RegExp("[^a-zA-Z0-9-]");
    if (username !== '' && username !== undefined) {
      const check = await checkUsername(username)
      if (!check) {
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
    <UserCard title={t('register')} handleSubmit={handleSubmit}>
      <UserTextField
        label={t('username')}
        error={userExists || !validUsername}
        onChange={props => handleUser(props.target.value)}
        helperText={userExists ? t('errorUsername') : !validUsername ? t('validUsername') : ''}
        required />
      <UserTextField
        label={t('password')}
        type="password"
        onChange={props => handlePassword(props.target.value)}
        helperText={registerUser?.password && (validPassword !== PasswordStrength.STRONG ? t('passwordRequirements') : t('passwordOk'))}
        FormHelperTextProps={{
          style:
          {
            color: (validPassword === PasswordStrength.WEAK ? theme.palette.error.main :
              (validPassword === PasswordStrength.MEDIUM ? theme.palette.warning.main :
                theme.palette.success.main))
          }
        }}
        required />
      <UserTextField
        label={t('confirmPassword')}
        type="password"
        error={(registerUser?.password ? !confirmPasswordOk : false)}
        onChange={props => setConfirmPasswordOk(registerUser?.password === props.target.value)}
        helperText={registerUser?.password && !confirmPasswordOk ? t('errorPassword') : ''}
        required />
      <UserTextField
        label={t('email')}
        type="email"
        onChange={props => setRegisterUser({ ...registerUser!, email: props.target.value })}
        required />
      <Typography variant="h5">{t('avatar')}</Typography>
      <Stack className={styles['register-avatars']}>
        {avatars.map(avatar =>
          <Button key={avatar} onClick={() => setRegisterUser({ ...registerUser!, avatarURL: avatar })} >
            <img alt="avatar" src={avatar} style={{ filter: registerUser?.avatarURL !== null && registerUser?.avatarURL === avatar ? "" : "grayscale(100%)" }} />
          </Button>
        )}
      </Stack>
      <Stack alignItems="center">
        <Typography variant="h5">{t('parentalConsent')}</Typography>
        <Typography variant="caption">{t('adult')}</Typography>
      </Stack>
      <UserTextField
        label={t('parentName')}
        onChange={props => setRegisterUser({ ...registerUser!, parentName: props.target.value })}
        required />
      <UserTextField
        label={t('parentId')}
        type="number"
        error={!validParentId}
        onChange={props => handleParentId(props.target.value)}
        helperText={!validParentId ? t('errorParentId') : ''}
        required />
      <Stack className={styles['register-whyData']} onClick={() => setWhyReqData(!whyReqData)}>
        <Typography align="center">{t("whyData.title")}</Typography>
        <Collapse style={{ padding: "10px" }} in={whyReqData}>
          <Typography>{t("whyData.privacy")}</Typography>
          <Typography>{t("whyData.dataProtectionLaw")}&nbsp;
            <PBLink target="_blank" to={termsAndConditionsLink}>{t("linkTerms")}</PBLink></Typography>
          <Typography>{t("whyData.parentalContact")}&nbsp;
            <PBMailLink/>&nbsp;
            {t("whyData.whyContact")}</Typography>
        </Collapse>
      </Stack>

      <FormControlLabel
        label={<Typography>{t('terms')}<PBLink target="_blank" to={termsAndConditionsLink}>{t("linkTerms")}</PBLink></Typography>}
        control={<Checkbox sx={{ color: theme.palette.primary.main }}
          onChange={() => setTermAndConditions(!termsAndConditions)}
          required />
        } />
      <Paper hidden={!wrongRegister} className={styles['paper']} elevation={2}>{t('wrong')}</Paper>
      <DialogSnackbar
        open={serverError}
        onClose={() => setServerError(false)}
        message={t('serverError')} />
      <Stack className={styles['register-buttons']}>
        <Button variant="contained" color="success" type='submit' disabled={!validateRegister()}>{t('registerMe')}</Button>
        <Button variant="contained" color="error" onClick={handleOnClose} href="#" target="">{t('cancel')}</Button>
      </Stack>
    </UserCard>
  </>
}
