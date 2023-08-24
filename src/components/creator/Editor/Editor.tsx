import { Stack } from "@mui/material";
import { Header, HeaderText } from "../../header/Header";
import { SceneEdition } from "./SceneEdition/SceneEdition";
import { TitleEdition } from "./EditorSubHeader/TitleEdition";
import { CreatorContextProvider } from "./CreatorContext";
import { CreatorSubHeader } from "./EditorSubHeader/CreatorSubHeader";
import { useTranslation } from "react-i18next";
import { DownloadButton } from "./ActionButtons/DownloadButton";
import { DiscardChallengeButton } from "./ActionButtons/DiscardChallengeButton";
import { PreviewButton } from "./ActionButtons/PreviewButton";
import { BetaBadge } from "../BetaBadge";
import { useThemeContext } from "../../../theme/ThemeContext";

export const CreatorEditor = () => {
  const { theme } = useThemeContext()

  const {t} = useTranslation('creator')

  return (
    <CreatorContextProvider>
      
      <Stack alignItems="center" height="inherit" sx={{backgroundColor: theme.palette.background.paper}}>
        <Header CenterComponent={<BetaBadge smaller={true}><HeaderText text={t("editor.editorHeader")}/></BetaBadge>} SubHeader={<EditorSubHeader/>}/>
        <Stack justifyContent= "center" height="100%" width="100%" sx={{ maxWidth: 'var(--creator-max-width)', maxHeight: 'var(--creator-max-height)'}}>
          <SceneEdition />
        </Stack>
      </Stack>
    </CreatorContextProvider>
  )
}

const EditorSubHeader: React.FC = () => 
  <CreatorSubHeader>
      <TitleEdition/>
      <Actions/>
  </CreatorSubHeader>

const Actions = () => <>
  <PreviewButton/>
  <Stack direction="row" alignItems={"center"}>
    <DiscardChallengeButton/>
    <DownloadButton/>
  </Stack>
</>