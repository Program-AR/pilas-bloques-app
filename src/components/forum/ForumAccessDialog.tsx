import React, { FC, FormEvent, useEffect, useState } from "react"
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
  Alert
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead"
import PeopleIcon from "@mui/icons-material/People"
import LockIcon from "@mui/icons-material/Lock"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import { useTranslation } from "react-i18next";
import { AccessForm } from "./AccessForm"
import { PilasBloquesApi, ForumStatus } from "../../pbApi"
import { LocalStorage } from "../../localStorage"
import { useThemeContext } from "../../theme/ThemeContext"

export type ForumAccessDialogProps = {
  open: boolean
  onClose: () => void
  onOpenLogin?: () => void
}

type Step =
  | "LOADING"
  | "ERROR"
  | "NOT_LOGGED_IN"
  | "NEED_EMAIL"
  | "ENTER_CODE"
  | "SECONDARY_NOTICE"
  | "REDIRECTING"

export const ForumAccessDialog: FC<ForumAccessDialogProps> = ({ open, onClose, onOpenLogin }) => {
  const { theme, darkModeEnabled } = useThemeContext()
  const { t } = useTranslation("forum")
  const currentUser = LocalStorage.getUser()
  const currentUsername = currentUser?.nickName || (currentUser as any)?.username || ""

  const [step, setStep] = useState<Step>("LOADING")
  const [email, setEmail] = useState<string>("")
  const [code, setCode] = useState<string>("")
  const [hasMultipleAccounts, setHasMultipleAccounts] = useState<boolean>(false)
  const [primaryUsername, setPrimaryUsername] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [resendCooldown, setResendCooldown] = useState<number>(0)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [resendCooldown])

  useEffect(() => {
    if (open) {
      initForumFlow()
    } else {
      resetState()
    }
  }, [open])

  const resetState = () => {
    setStep("LOADING")
    setEmail("")
    setCode("")
    setHasMultipleAccounts(false)
    setPrimaryUsername("")
    setErrorMessage(null)
    setIsSubmitting(false)
    setResendCooldown(0)
  }

  const initForumFlow = async () => {
    setErrorMessage(null)
    const user = LocalStorage.getUser()
    if (!user) {
      setStep("NOT_LOGGED_IN")
      return
    }

    setStep("LOADING")
    try {
      const status: ForumStatus = await PilasBloquesApi.getForumStatus()

      if (status.email) {
        setEmail(status.email)
      }

      if (status.canAccessForum) {
        setStep("REDIRECTING")
        await PilasBloquesApi.getForumSession()
        redirectToForum()
        return
      }

      if (status.hasMultipleAccounts) {
        setHasMultipleAccounts(true)
        if (status.primaryAccountUsername && !status.isCurrentAccountPrimary) {
          setPrimaryUsername(status.primaryAccountUsername)
          setStep("SECONDARY_NOTICE")
          return
        }
      }

      if (!status.hasEmail) {
        setStep("NEED_EMAIL")
        return
      }

      // If has single account or multiple accounts without primary chosen yet, send OTP code directly
      await handleSendCode(status.email || undefined)
    } catch (err: any) {
      setErrorMessage(t("serverError"))
      setStep("ERROR")
    }
  }

  const redirectToForum = () => {
    setTimeout(() => {
      window.open(PilasBloquesApi.forumURL, "_blank")
      onClose()
    }, 1200)
  }

  const handleSendEmailSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage(t("enterEmail"))
      return
    }
    await handleSendCode(email.trim())
  }

  const handleSendCode = async (targetEmail?: string) => {
    setIsSubmitting(true)
    setErrorMessage(null)
    try {
      const res = await PilasBloquesApi.sendForumCode(targetEmail)
      setEmail(res.email)
      setResendCooldown(60)

      let status: ForumStatus | null = null
      try {
        status = await PilasBloquesApi.getForumStatus()
      } catch {
        status = null
      }

      if (status?.hasMultipleAccounts) {
        setHasMultipleAccounts(true)
      }
      setStep("ENTER_CODE")
    } catch (err: any) {
      setErrorMessage(err.message || t("serverError"))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVerifyCodeSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!code.trim() || code.trim().length < 6) {
      setErrorMessage(t("codeLabel"))
      return
    }

    setIsSubmitting(true)
    setErrorMessage(null)
    try {
      const currentUserId = (currentUser as any)?.id || (currentUser as any)?._id || undefined
      const res = await PilasBloquesApi.verifyForumCode(
        code.trim(),
        currentUserId,
        email || undefined
      )

      if (res.canAccessForum) {
        setStep("REDIRECTING")
        redirectToForum()
      } else {
        setPrimaryUsername(res.selectedPrimaryUsername || "")
        setStep("SECONDARY_NOTICE")
      }
    } catch (err: any) {
      setErrorMessage(err.message || t("serverError"))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          width: "520px",
          maxWidth: "95vw",
          borderRadius: 16,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          border: darkModeEnabled ? "1px solid rgba(255, 255, 255, 0.15)" : "1px solid rgba(0, 0, 0, 0.08)"
        }
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: theme.palette.text.secondary,
          color: theme.palette.text.primary,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 24px",
          borderBottom: darkModeEnabled ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.06)"
        }}
      >
        <Typography component="span" variant="h6" fontWeight="bold" sx={{ color: theme.palette.text.primary }}>
          {t("communityTitle")}
        </Typography>
        <IconButton onClick={onClose} sx={{ color: theme.palette.text.primary }} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ padding: "28px 24px", color: theme.palette.text.primary }}>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setErrorMessage(null)}>
            {errorMessage}
          </Alert>
        )}

        {step === "LOADING" && (
          <Stack alignItems="center" spacing={2} sx={{ py: 4 }}>
            <CircularProgress sx={{ color: theme.palette.secondary.main }} />
            <Typography sx={{ color: theme.palette.text.primary }}>{t("redirecting")}</Typography>
          </Stack>
        )}

        {step === "ERROR" && (
          <Stack spacing={3} alignItems="center" sx={{ textAlign: "center", py: 2 }}>
            <ErrorOutlineIcon sx={{ fontSize: 56, color: "error.main" }} />
            <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
              {errorMessage || t("serverError")}
            </Typography>
            <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
              <Button
                variant="outlined"
                onClick={onClose}
                sx={{
                  color: theme.palette.text.primary,
                  borderColor: darkModeEnabled ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.23)",
                  "&:hover": { borderColor: theme.palette.text.primary }
                }}
              >
                {t("cancel")}
              </Button>
              <Button
                data-testid="retryButton"
                variant="contained"
                onClick={initForumFlow}
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: theme.palette.secondary.dark },
                  "&.Mui-disabled": {
                    backgroundColor: darkModeEnabled ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)",
                    color: darkModeEnabled ? "rgba(255, 255, 255, 0.45)" : "rgba(0, 0, 0, 0.35)"
                  }
                }}
              >
                {t("retry")}
              </Button>
            </Stack>
          </Stack>
        )}

        {step === "NOT_LOGGED_IN" && (
          <Stack spacing={3} alignItems="center" sx={{ textAlign: "center", py: 2 }}>
            <LockIcon sx={{ fontSize: 56, color: theme.palette.text.primary }} />
            <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
              {t("notLoggedInDesc")}
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                onClose()
                if (onOpenLogin) onOpenLogin()
              }}
              sx={{
                px: 4,
                py: 1,
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
                fontWeight: "bold",
                "&:hover": { backgroundColor: theme.palette.secondary.dark }
              }}
            >
              {t("loginToContinue")}
            </Button>
          </Stack>
        )}

        {step === "NEED_EMAIL" && (
          <form onSubmit={handleSendEmailSubmit}>
            <Stack spacing={2.5}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <MarkEmailReadIcon sx={{ fontSize: 32, color: theme.palette.text.primary }} />
                <Typography variant="h6" fontWeight="bold" sx={{ color: theme.palette.text.primary }}>
                  {t("needEmailTitle")}
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: theme.palette.text.primary, opacity: 0.9 }}>
                {t("needEmailDesc")}
              </Typography>
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="flex-start"
                sx={{
                  backgroundColor: darkModeEnabled ? "rgba(255, 182, 0, 0.08)" : "rgba(255, 182, 0, 0.12)",
                  border: `1px solid ${darkModeEnabled ? "rgba(255, 182, 0, 0.3)" : "rgba(255, 182, 0, 0.45)"}`,
                  borderRadius: 2,
                  p: 1.5
                }}
              >
                <InfoOutlinedIcon sx={{ color: theme.palette.secondary.main, fontSize: 20, mt: 0.15, flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontSize: "0.85rem", lineHeight: 1.45 }}>
                  {hasMultipleAccounts
                    ? (currentUsername
                        ? t("multipleAccountsWarning", { username: currentUsername })
                        : t("multipleAccountsWarningGeneric"))
                    : (currentUsername
                        ? t("primaryAccountWarning", { username: currentUsername })
                        : t("primaryAccountWarningGeneric"))}
                </Typography>
              </Stack>
              <TextField
                data-testid="forumEmailInput"
                label={t("enterEmail")}
                type="email"
                required
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                autoFocus
                InputLabelProps={{ sx: { color: theme.palette.text.primary } }}
                InputProps={{ sx: { color: theme.palette.text.primary } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: darkModeEnabled ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.23)" },
                    "&:hover fieldset": { borderColor: theme.palette.secondary.main },
                    "&.Mui-focused fieldset": { borderColor: theme.palette.secondary.main }
                  }
                }}
              />
              <Button
                data-testid="sendCodeButton"
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  py: 1.2,
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: theme.palette.secondary.dark },
                  "&.Mui-disabled": {
                    backgroundColor: darkModeEnabled ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)",
                    color: darkModeEnabled ? "rgba(255, 255, 255, 0.45)" : "rgba(0, 0, 0, 0.35)"
                  }
                }}
              >
                {isSubmitting ? <CircularProgress size={24} sx={{ color: theme.palette.secondary.main }} /> : t("sendCode")}
              </Button>
            </Stack>
          </form>
        )}

        {step === "ENTER_CODE" && (
          <form onSubmit={handleVerifyCodeSubmit}>
            <Stack spacing={2.5}>
              <Typography variant="h6" fontWeight="bold" sx={{ color: theme.palette.text.primary }}>
                {t("enterCodeTitle")}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.primary, opacity: 0.9 }}>
                {t("enterCodeDesc", { email })}
              </Typography>
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="flex-start"
                sx={{
                  backgroundColor: darkModeEnabled ? "rgba(255, 182, 0, 0.08)" : "rgba(255, 182, 0, 0.12)",
                  border: `1px solid ${darkModeEnabled ? "rgba(255, 182, 0, 0.3)" : "rgba(255, 182, 0, 0.45)"}`,
                  borderRadius: 2,
                  p: 1.5
                }}
              >
                <InfoOutlinedIcon sx={{ color: theme.palette.secondary.main, fontSize: 20, mt: 0.15, flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontSize: "0.85rem", lineHeight: 1.45 }}>
                  {hasMultipleAccounts
                    ? (currentUsername
                        ? t("multipleAccountsWarning", { username: currentUsername })
                        : t("multipleAccountsWarningGeneric"))
                    : (currentUsername
                        ? t("primaryAccountWarning", { username: currentUsername })
                        : t("primaryAccountWarningGeneric"))}
                </Typography>
              </Stack>
              <TextField
                data-testid="forumCodeInput"
                label={t("codeLabel")}
                required
                fullWidth
                InputLabelProps={{ sx: { color: theme.palette.text.primary } }}
                inputProps={{
                  maxLength: 6,
                  style: {
                    fontSize: 24,
                    letterSpacing: 8,
                    textAlign: "center",
                    color: theme.palette.text.primary
                  }
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: darkModeEnabled ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.23)" },
                    "&:hover fieldset": { borderColor: theme.palette.secondary.main },
                    "&.Mui-focused fieldset": { borderColor: theme.palette.secondary.main }
                  }
                }}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={isSubmitting}
                autoFocus
              />
              <Button
                data-testid="verifyCodeButton"
                type="submit"
                variant="contained"
                disabled={isSubmitting || code.length < 6}
                sx={{
                  py: 1.2,
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: theme.palette.secondary.dark },
                  "&.Mui-disabled": {
                    backgroundColor: darkModeEnabled ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)",
                    color: darkModeEnabled ? "rgba(255, 255, 255, 0.45)" : "rgba(0, 0, 0, 0.35)"
                  }
                }}
              >
                {isSubmitting ? <CircularProgress size={24} sx={{ color: theme.palette.secondary.main }} /> : t("verifyCode")}
              </Button>
              <Button
                variant="text"
                disabled={resendCooldown > 0 || isSubmitting}
                onClick={() => handleSendCode(email)}
                sx={{
                  color: theme.palette.secondary.main,
                  fontWeight: "bold",
                  "&:hover": { textDecoration: "underline" },
                  "&.Mui-disabled": {
                    color: darkModeEnabled ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.38)"
                  }
                }}
              >
                {resendCooldown > 0
                  ? t("resendCodeIn", { seconds: resendCooldown })
                  : t("resendCode")}
              </Button>
            </Stack>
          </form>
        )}

        {step === "SECONDARY_NOTICE" && (
          <Stack spacing={3} alignItems="center" sx={{ textAlign: "center", py: 1 }}>
            <PeopleIcon sx={{ fontSize: 52, color: theme.palette.text.primary }} />
            <Typography variant="h6" fontWeight="bold" sx={{ color: theme.palette.text.primary }}>
              {t("secondaryAccountNotice")}
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.primary, px: 2, opacity: 0.9 }}>
              {t("secondaryAccountDesc", { primaryUsername })}
            </Typography>
            <Button
              variant="contained"
              onClick={onClose}
              sx={{
                px: 5,
                py: 1,
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
                fontWeight: "bold",
                "&:hover": { backgroundColor: theme.palette.secondary.dark }
              }}
            >
              OK
            </Button>
          </Stack>
        )}

        {step === "REDIRECTING" && (
          <Stack alignItems="center" spacing={2} sx={{ py: 3, textAlign: "center" }}>
            <CircularProgress sx={{ color: theme.palette.secondary.main }} size={48} />
            <Typography variant="h6" fontWeight="bold" sx={{ color: theme.palette.text.primary }}>
              {t("redirecting")}
            </Typography>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  )
}
