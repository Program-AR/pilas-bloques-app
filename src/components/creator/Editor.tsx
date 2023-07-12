import { Button, Stack } from "@mui/material";
import { Header } from "../header/Header";
import { SceneEdition } from "./SceneEdition";
import { TitleEdition } from "./TitleEdition";
import { StatementEdition } from "./StatementEdition";
import { LocalStorage } from "../../localStorage";
import { SerializedChallenge } from "../serializedChallenge";

export const CreatorEditor = () => {
  return (
    <Stack alignItems="center" height="100%">
      <Header />
      <Stack height="100%" width="100%" style={{maxWidth: 1024, maxHeight:650, borderStyle: "solid"}}>
        <EditorHeader />
        <SceneEdition />
        <ChallengeDetailsEdition />
      </Stack>
    </Stack>
  )
}

const EditorHeader: React.FC = () => 
  <Stack direction="row" style={{maxHeight: 48, justifyContent:"space-between"}}>
    <TitleEdition />
    <Actions />
  </Stack>

const Actions = () => <Stack direction="row">
  <Button>Nuevo Desafío</Button>
  <Button>Probar</Button>
  <Button onClick={downloadChallenge}>Compartir</Button>
</Stack>

const ChallengeDetailsEdition = () => <Stack direction="row" style={{maxHeight: 70, justifyContent:"space-between"}}>
  <StatementEdition/>
  <Button>Panel de instrucciones</Button>
  <Button>Bloques iniciales</Button>
</Stack>

const downloadChallenge = () => {
  const challenge: SerializedChallenge = LocalStorage.getCreatorChallenge()!

  const blob = new Blob([JSON.stringify(challenge)], { type: 'application/json' });

  const temporaryAnchorElement = document.createElement('a')
  
  const urlObject = URL.createObjectURL(blob)

  temporaryAnchorElement.href = urlObject

  const challengeName: string = challenge.title ? challenge.title : "pilas-bloques"

  temporaryAnchorElement.download = `${challengeName}.json`

  temporaryAnchorElement.click();

  // Clean up the resource
  URL.revokeObjectURL(urlObject);

}