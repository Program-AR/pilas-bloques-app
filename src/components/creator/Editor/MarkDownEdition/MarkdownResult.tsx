import ReactMarkdown from "react-markdown";
import { Button, Stack, Typography, lighten } from "@mui/material";
import { WbIncandescent, MenuBook } from"@mui/icons-material"
import { PBCard } from "../../../PBCard";
import remarkGfm from 'remark-gfm';
import remarkemoji from 'remark-emoji';
import { useTranslation } from "react-i18next";
import theme from '../../../../theme';
import { LocalStorage } from "../../../../localStorage";
import { useState } from "react";

type MarkdownResultProps = {
  statement: string
  showStatement: boolean
  clue?: string
}

export const MarkdownResult = (props: MarkdownResultProps) => {
  const { t } = useTranslation('creator');
  const urlImage = `imagenes/sceneImages/${LocalStorage.getCreatorChallenge()!.scene.type}/tool.png` 
  const [showStatement, setShowStatement] = useState<boolean>(props.showStatement)

  return <>
    <Typography>{t('statement.markdownTitle')}</Typography>
    <PBCard sx={{height:"80px"}}>
        <img height="100%" alt="actor" src={urlImage}/>
        <Stack width="50px" height="100%" alignItems="center" justifyContent="center" sx={{backgroundColor: lighten(theme.palette.primary.main, 0.74)}}>
          
          <Button onClick={() => setShowStatement(true)}>
            <MenuBook/>
          </Button>

          <Button disabled={!props.clue} onClick={() => setShowStatement(false)} sx={{color:"#ebca14"}}>
            <WbIncandescent style={{ transform: "rotate(180deg)"}}/>
          </Button>

        </Stack>
        <div style={{height:"100%", overflowY: "auto", marginLeft:theme.spacing(2) }}>
          <ReactMarkdown children={showStatement ? props.statement : props.clue!} remarkPlugins={[remarkGfm, [remarkemoji, {emoticon: true }]]} />
        </div>
    </PBCard>
  </>
}
