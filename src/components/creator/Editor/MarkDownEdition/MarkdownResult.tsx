import ReactMarkdown from "react-markdown";
import { Button, Stack, darken } from "@mui/material";
import { WbIncandescent, MenuBook } from"@mui/icons-material"
import { PBCard } from "../../../PBCard";
import remarkGfm from 'remark-gfm';
import remarkemoji from 'remark-emoji';
import { LocalStorage } from "../../../../localStorage";
import { StatementTextToShow } from "./MarkdownEditor";
import { useThemeContext } from "../../../../theme/ThemeContext";

type MarkdownResultProps = {
  text: string
  setShowStatement: (show: StatementTextToShow) => void
  clueIsEnabled: boolean
}

export const MarkdownResult = (props: MarkdownResultProps) => {
  const { theme } = useThemeContext()

  const urlImage = `imagenes/sceneImages/${LocalStorage.getCreatorChallenge()!.scene.type}/tool.png` 

  return <>
    <PBCard sx={{height:"80px"}}>
        <img height="100%" alt="actor" src={urlImage}/>
        <Stack width="50px" height="100%" alignItems="center" justifyContent="center" sx={{backgroundColor: darken(theme.palette.text.secondary, 0.13)}}>
          
          <Button onClick={() => props.setShowStatement(StatementTextToShow.STATEMENT)} sx={{minWidth:"50px"}}>
            <MenuBook/>
          </Button>

          <Button disabled={!props.clueIsEnabled} onClick={() => props.setShowStatement(StatementTextToShow.CLUE)} sx={{color:"#ebca14", minWidth:"50px"}}>
            <WbIncandescent style={{ transform: "rotate(180deg)"}}/>
          </Button>

        </Stack>
        <div style={{height:"100%", overflowY: "auto", marginLeft:theme.spacing(2) }}>
          <ReactMarkdown children={props.text} remarkPlugins={[remarkGfm, [remarkemoji, {emoticon: true }]]} />
        </div>
    </PBCard>
  </>
}
