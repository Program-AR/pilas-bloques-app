import React from "react";
import { Button, TextField, Alert, Stack, Typography, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../theme/ThemeContext";

type AccessFormProps = {
  step: "email" | "code";
  email?: string;
  code?: string;
  loading: boolean;
  warningKey?: string; // i18n key for the warning banner
  onEmailChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCodeChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};

export const AccessForm: React.FC<AccessFormProps> = ({
  step,
  email,
  code,
  loading,
  warningKey,
  onEmailChange,
  onCodeChange,
  onSubmit,
}) => {
  const { t } = useTranslation("forum");
  const { theme, darkModeEnabled } = useThemeContext();

  const warning = warningKey ? t(warningKey as any) : null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Stack spacing={2.5}>
        {warning && (
          <Alert
            severity="warning"
            sx={{
              mb: 2,
              backgroundColor: darkModeEnabled ? "rgba(255, 182, 0, 0.08)" : "rgba(255, 182, 0, 0.12)",
              border: `1px solid ${darkModeEnabled ? "rgba(255, 182, 0, 0.3)" : "rgba(255, 182, 0, 0.45)"}`,
              borderRadius: 2,
            }}
          >
            {warning}
          </Alert>
        )}

        {step === "email" && (
          <TextField
            data-testid="forumEmailInput"
            label={t("enterEmail")}
            type="email"
            required
            fullWidth
            value={email ?? ""}
            onChange={onEmailChange}
            disabled={loading}
            autoFocus
            InputLabelProps={{ sx: { color: theme.palette.text.primary } }}
            InputProps={{ sx: { color: theme.palette.text.primary } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: darkModeEnabled ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.23)" },
                "&:hover fieldset": { borderColor: theme.palette.secondary.main },
                "&.Mui-focused fieldset": { borderColor: theme.palette.secondary.main },
              },
            }}
          />
        )}

        {step === "code" && (
          <TextField
            data-testid="forumCodeInput"
            label={t("codeLabel")}
            required
            fullWidth
            value={code ?? ""}
            onChange={onCodeChange}
            disabled={loading}
            autoFocus
            inputProps={{
              maxLength: 6,
              style: {
                fontSize: 24,
                letterSpacing: 8,
                textAlign: "center",
                color: theme.palette.text.primary,
              },
            }}
            InputLabelProps={{ sx: { color: theme.palette.text.primary } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: darkModeEnabled ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.23)" },
                "&:hover fieldset": { borderColor: theme.palette.secondary.main },
                "&.Mui-focused fieldset": { borderColor: theme.palette.secondary.main },
              },
            }}
          />
        )}

        <Button
          type="submit"
          data-testid={step === "email" ? "sendCodeButton" : "verifyCodeButton"}
          variant="contained"
          disabled={loading || (step === "code" && (code ?? "").length < 6)}
          sx={{
            py: 1.2,
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            fontWeight: "bold",
            "&:hover": { backgroundColor: theme.palette.secondary.dark },
            "&.Mui-disabled": {
              backgroundColor: darkModeEnabled ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)",
              color: darkModeEnabled ? "rgba(255, 255, 255, 0.45)" : "rgba(0, 0, 0, 0.35)",
            },
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: theme.palette.secondary.main }} />
          ) : step === "email" ? t("sendCode") : t("verifyCode")}
        </Button>
      </Stack>
    </form>
  );
};
