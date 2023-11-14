import { Stack } from "@mui/material";
import { Header, HeaderText } from "../../header/Header";
import { SceneEdition } from "./SceneEdition/SceneEdition";
import { CreatorContextProvider } from "./CreatorContext";
import { CreatorSubHeader } from "./EditorSubHeader/CreatorSubHeader";
import { useTranslation } from "react-i18next";
import { DownloadButton } from "./ActionButtons/DownloadButton";
import { DiscardChallengeButton } from "./ActionButtons/DiscardChallengeButton";
import { PreviewButton } from "./ActionButtons/PreviewButton";
import { BetaBadge } from "../BetaBadge";
import { useThemeContext } from "../../../theme/ThemeContext";
import { useNavigate } from "react-router-dom";
import { LocalStorage } from "../../../localStorage";
import { useEffect } from "react";

export const CreatorEditor = () => {
  const { theme } = useThemeContext()

  const { t } = useTranslation('creator')

  const navigate = useNavigate()

  const challengeExists = LocalStorage.getCreatorChallenge()

  useEffect(() => {
    if (!challengeExists) {
      navigate('/creador/seleccionar')
    }
  }, [])

  return (
    <>   
    { challengeExists ?
      (<CreatorContextProvider>
        <Stack alignItems="center" height="inherit" sx={{ backgroundColor: theme.palette.background.paper }}>
          <Header CenterComponent={<BetaBadge smaller={true}><HeaderText text={t("editor.editorHeader")} /></BetaBadge>} SubHeader={<EditorSubHeader viewButton={<PreviewButton />} />} />
          <Stack justifyContent="center" height="100%" width="100%" sx={{ maxWidth: 'var(--creator-max-width)', maxHeight: 'var(--creator-max-height)' }}>
            <SceneEdition />
          </Stack>
        </Stack>
      </CreatorContextProvider>
      ) : <></>}
    </>

  )
}

type EditorSubHeaderProps = {
  viewButton: React.ReactNode
}

export const EditorSubHeader = (props: EditorSubHeaderProps) =>
  <CreatorSubHeader>
    <DiscardChallengeButton />
    {props.viewButton}
    <DownloadButton />
  </CreatorSubHeader>
