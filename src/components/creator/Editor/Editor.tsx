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

export const CreatorEditor = () => {
  const { theme } = useThemeContext()

  const { t } = useTranslation('creator')

  const navigate = useNavigate()

  const challengeExists = LocalStorage.getCreatorChallenge()

  const shouldShow = process.env.NODE_ENV !== 'production'

  useEffect(() => {
    if (!challengeExists) navigate('/creador/seleccionar')
  }, [challengeExists, navigate])

  return (
    <>   
    { challengeExists ?
      (<CreatorContextProvider>
        <Stack alignItems="center" height="inherit" sx={{ backgroundColor: theme.palette.background.paper }}>
          <Header CenterComponent={<BetaBadge smaller={true}>
                                      <HeaderText text={t("editor.editorHeader")} />
                                   </BetaBadge>} 
                  SubHeader={<EditorSubHeader viewButton={<EmberPreviewButton />} reactViewButton={shouldShow ? <PreviewButton /> : undefined } />} />
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
  reactViewButton?: React.ReactNode
}

export const EditorSubHeader = (props: EditorSubHeaderProps) =>
  <CreatorSubHeader>
    <DiscardChallengeButton />
    {props.viewButton}
    {props.reactViewButton}
    <ShareButton/>
  </CreatorSubHeader>
