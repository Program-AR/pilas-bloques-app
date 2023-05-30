import { Button, Stack } from "@mui/material";
import { Header } from "../header/Header";


export const CreatorEditor = () => {
  return (
    <Stack alignItems="center" height="100%">
      <Header />
      <Stack height="100%" width="100%" style={{marginTop: 48, maxWidth: 1024, maxHeight:650, borderStyle: "solid"}}>
        <EditorHeader />
        <EditorBody />
        <EditorMaybeFooter />
      </Stack>
    </Stack>
  )
}

const EditorHeader: React.FC = () => 
  <Stack direction="row" style={{maxHeight: 48, justifyContent:"space-between"}}>
    <TitleInput />
    <EditorActions />
  </Stack>

const TitleInput = () => <div>Titulo: fafafa</div>
const EditorActions = () => <Stack direction="row">
  <Button>Nuevo Desafío</Button>
  <Button>Probar</Button>
  <Button>Nuevo Desafío</Button>
</Stack>

const EditorBody = () => <div style={{height: "100%"}}>Que</div>
const EditorMaybeFooter = () => <Stack direction="row" style={{maxHeight: 70, justifyContent:"space-between"}}>
  <Button>Enunciado</Button>
  <Button>Panel de instrucciones</Button>
  <Button>Bloques iniciales</Button>
</Stack>