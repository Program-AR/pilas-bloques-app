import { Stack } from "@mui/material";
import { Header, HeaderText } from "../../header/Header";
import { SceneEdition } from "./SceneEdition/SceneEdition";
import { CreatorContextProvider } from "./CreatorContext";
import { CreatorSubHeader } from "./EditorSubHeader/CreatorSubHeader";
import { useTranslation } from "react-i18next";
import { DiscardChallengeButton } from "./ActionButtons/DiscardChallengeButton";
import { EmberPreviewButton } from "./ActionButtons/EmberPreviewButton";
import { PreviewButton } from "./ActionButtons/PreviewButton";
import { BetaBadge } from "../BetaBadge";
import { useThemeContext } from "../../../theme/ThemeContext";
import { useNavigate } from "react-router-dom";
import { LocalStorage } from "../../../localStorage";
import { useEffect } from "react";
import { ShareButton } from "./ActionButtons/ShareChallenge/ShareButton";
import { VerticalEditorView } from "./VerticalEditorView";

export const CreatorEditor = () => {
  const { theme, isSmallScreen } = useThemeContext()

  const { t } = useTranslation('creator')

  const navigate = useNavigate()

  const challengeExists = LocalStorage.getCreatorChallenge()

  const shouldShow = process.env.NODE_ENV !== 'production'

  useEffect(() => {
    if (!challengeExists) navigate('/creador/seleccionar')
  }, [challengeExists, navigate])

  return (
    <>
      {challengeExists ?
        (<CreatorContextProvider>
          <Stack alignItems="center" height="inherit" sx={{ backgroundColor: theme.palette.background.paper }}>
            <Header CenterComponent={<HeaderText text={t("editor.editorHeader")} />}
              SubHeader={<EditorSubHeader viewButton={shouldShow ? <EmberPreviewButton /> : undefined} reactViewButton={<PreviewButton />} />} />

            {isSmallScreen
              // ── Mobile: full-height vertical layout ──────────────────────
              ? <Stack sx={{ width: '100%', flex: 1, overflow: 'hidden' }}>
                  <VerticalEditorView />
                </Stack>
              // ── Desktop: original horizontal layout ──────────────────────
              : <Stack justifyContent="center" height="100%" width="100%" sx={{ maxWidth: 'var(--creator-max-width)', maxHeight: 'var(--creator-max-height)' }}>
                  <SceneEdition />
                </Stack>
            }
          </Stack>
        </CreatorContextProvider>
        ) : <></>}
    </>

  )
}

type EditorSubHeaderProps = {
  viewButton: React.ReactNode
  reactViewButton?: React.ReactNode
}

export const EditorSubHeader = (props: EditorSubHeaderProps) =>
  <CreatorSubHeader>
    <DiscardChallengeButton />
    {props.viewButton}
    {props.reactViewButton}
    <ShareButton />
  </CreatorSubHeader>
