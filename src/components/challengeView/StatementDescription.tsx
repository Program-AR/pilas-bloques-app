import ReactMarkdown from "react-markdown";
import { Button, Stack, darken } from "@mui/material";
import { WbIncandescent, MenuBook } from"@mui/icons-material"
import { PBCard } from "../PBCard";
import remarkGfm from 'remark-gfm';
import remarkemoji from 'remark-emoji';
//import { StatementTextToShow } from "../creator/Editor/MarkDownEdition/MarkdownEditor";
import { useThemeContext } from "../../theme/ThemeContext";
import { useState } from "react";

export type StatementDescriptionProps = {
  statement?: string
  clue?: string
  // text: string
  //setShowStatement: (show: StatementTextToShow) => void
  clueIsEnabled: boolean
  urlImage: string
}

// TODO: This component should have state of its own to know when to show the clue.
// TODO: StatementTextToShow should be on this file.

export enum StatementTextToShow {
  STATEMENT,
  CLUE
}

export const StatementDescription = (props: StatementDescriptionProps) => {
  const { theme } = useThemeContext()
  const [statementTextToShow, setShowStatement] = useState<StatementTextToShow>(StatementTextToShow.STATEMENT)
  const textToShow: string = statementTextToShow === StatementTextToShow.STATEMENT ? props.statement! : props.clue!

  return <>
    <PBCard sx={{height:"80px"}}>
        <img height="100%" alt="actor" src={props.urlImage}/>
        <Stack width="50px" height="100%" alignItems="center" justifyContent="center" sx={{backgroundColor: darken(theme.palette.text.secondary, 0.13)}}>
          
          <Button onClick={() => setShowStatement(StatementTextToShow.STATEMENT)} sx={{minWidth:"50px"}}>
            <MenuBook/>
          </Button>

          <Button disabled={!props.clueIsEnabled} onClick={() => setShowStatement(StatementTextToShow.CLUE)} sx={{color:"#ebca14", minWidth:"50px"}}>
            <WbIncandescent style={{ transform: "rotate(180deg)"}}/>
          </Button>

        </Stack>
        <div style={{height:"100%", overflowY: "auto", marginLeft:theme.spacing(2) }}>
          <ReactMarkdown children={textToShow} remarkPlugins={[remarkGfm, [remarkemoji, {emoticon: true }]]} />
        </div>
    </PBCard>
  </>
}
