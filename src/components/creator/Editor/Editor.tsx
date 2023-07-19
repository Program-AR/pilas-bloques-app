import { Button, Stack } from "@mui/material";
import { Header } from "../../header/Header";
import { SceneEdition } from "./SceneEdition/SceneEdition";
import { TitleEdition } from "./EditorHeader/TitleEdition";
import { StatementEdition } from "./ChallengeDetailsEdition/StatementEdition";
import { CreatorContextProvider } from "./CreatorContext";
import { DownloadButton } from "./DownloadButton";
import { TryButton } from "./TryButton";
import { NewChallengeButton } from "./NewChallengeButton";

export const CreatorEditor = () => {
  return (
    <CreatorContextProvider>
      <Stack alignItems="center" height="100%">
        <Header CenterComponent={<EditorHeader />}/>
        <Stack height="100%" width="100%" style={{ maxWidth: 1024, maxHeight: 650, borderStyle: "solid" }}>
          <SceneEdition />
          <ChallengeDetailsEdition />
        </Stack>
      </Stack>
    </CreatorContextProvider>
  )
}

const EditorHeader: React.FC = () =>
  <Stack direction="row" style={{ maxHeight: 48, justifyContent: "space-between" }}>
    <TitleEdition />
    <Actions />
  </Stack>

const Actions = () => <Stack direction="row" alignItems={"center"}>
  <NewChallengeButton/>
  <TryButton/>
  <DownloadButton/>
</Stack>

const ChallengeDetailsEdition = () => <Stack direction="row" style={{ maxHeight: 70, justifyContent: "space-between" }}>
  <StatementEdition />
  <Button>Panel de instrucciones</Button>
  {/*<Button>Bloques iniciales</Button> Not in the MVP*/}
</Stack>