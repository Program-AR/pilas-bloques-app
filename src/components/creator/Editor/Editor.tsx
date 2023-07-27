import { Stack } from "@mui/material";
import { Header, HeaderText } from "../../header/Header";
import { SceneEdition } from "./SceneEdition/SceneEdition";
import { TitleEdition } from "./EditorSubHeader/TitleEdition";
import { StatementEdition } from "./ChallengeDetailsEdition/StatementEdition";
import { ToolBoxDialog } from "./ChallengeDetailsEdition/ToolBoxDialog";
import { CreatorContextProvider } from "./CreatorContext";
import { TryButton } from "./ActionButtons/TryButton";
import { CreatorSubHeader } from "./EditorSubHeader/CreatorSubHeader";
import { useTranslation } from "react-i18next";
import { NewChallengeButton } from "./ActionButtons/NewChallengeButton";
import { DownloadButton } from "./ActionButtons/DownloadButton";

export const CreatorEditor = () => {
  const {t} = useTranslation('creator')

  return (
    <CreatorContextProvider>
      <Stack alignItems="center" height="100%">
        <Header CenterComponent={<HeaderText text={t("editor.editorHeader")}/>} SubHeader={<EditorSubHeader/>}/>
        <Stack height="100%" width="100%" style={{ maxWidth: 1024, maxHeight: 650, borderStyle: "solid" }}>
          <SceneEdition />
          <ChallengeDetailsEdition />
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

const Actions = () => <Stack direction="row" alignItems={"center"}>
  <NewChallengeButton/>
  <TryButton/>
  <DownloadButton/>
</Stack>

const ChallengeDetailsEdition = () => <Stack direction="row" style={{ maxHeight: 70, justifyContent: "space-between" }}>
  <StatementEdition />
  <ToolBoxDialog/>
  {/*<Button>Bloques iniciales</Button> Not in the MVP*/}
</Stack>