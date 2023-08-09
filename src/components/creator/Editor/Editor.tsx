import { Stack } from "@mui/material";
import { Header, HeaderText } from "../../header/Header";
import { SceneEdition } from "./SceneEdition/SceneEdition";
import { TitleEdition } from "./EditorSubHeader/TitleEdition";
import { StatementEdition } from "./ChallengeDetailsEdition/StatementEdition";
import { ToolBoxDialog } from "./ChallengeDetailsEdition/ToolBoxDialog";
import { CreatorContextProvider } from "./CreatorContext";
import { CreatorSubHeader } from "./EditorSubHeader/CreatorSubHeader";
import { CreatorFooter } from "./EditorFooter/CreatorFooter";
import { useTranslation } from "react-i18next";
import { DownloadButton } from "./ActionButtons/DownloadButton";
import { DiscardChallengeButton } from "./ActionButtons/DiscardChallengeButton";
import { PreviewButton } from "./ActionButtons/PreviewButton";

export const CreatorEditor = () => {
  const {t} = useTranslation('creator')

  return (
    <CreatorContextProvider>
      
      <Stack alignItems="center" sx={{backgroundColor: 'var(--theme-background-secondary-color)'}}>
        <Header CenterComponent={<HeaderText text={t("editor.editorHeader")}/>} SubHeader={<EditorSubHeader/>}/>
        <Stack justifyContent= "center" height="100%" width="100%" sx={{ maxWidth: 1024, maxHeight: 608}}>
          <SceneEdition />
        </Stack>
        <EditorFooter />
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

const EditorFooter: React.FC = () => 
  <CreatorFooter>
  <StatementEdition />
  <ToolBoxDialog/>
  {/*<Button>Bloques iniciales</Button> Not in the MVP*/}
  </CreatorFooter>
