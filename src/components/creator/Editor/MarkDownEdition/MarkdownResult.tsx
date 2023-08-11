import { useContext } from "react";
import ReactMarkdown from "react-markdown";
import { Button, Stack, Typography, lighten } from "@mui/material";
import { WbIncandescent, MenuBook } from"@mui/icons-material"
import { PBCard } from "../../../PBCard";
import remarkGfm from 'remark-gfm';
import remarkemoji from 'remark-emoji';
import { useTranslation } from "react-i18next";
import { MarkdownContext } from "./MarkdownContext";
import theme from '../../../../theme';

export const MarkdownResult = () => {

  const { markdownStatement, markdownClue, clueCheck, markdownShow, setMarkdownShow, urlImage } = useContext(MarkdownContext);
  const { t } = useTranslation('creator');
  
  const onclickStatement = () => {
    setMarkdownShow(markdownStatement);
  };

  const onclickClue = () => {
    if( markdownClue )
      setMarkdownShow(markdownClue);
  };

  return <>
    <Typography>{t('statement.markdownTitle')}</Typography>
    <PBCard sx={{height:"80px"}}>
        <img height="100%" alt="actor" src={urlImage}/>
        <Stack width="50px" height="100%" alignItems="center" justifyContent="center" sx={{backgroundColor: lighten(theme.palette.primary.main, 0.74)}}>
          <Button onClick={onclickStatement} sx={{minWidth:"50px"}}>
            <MenuBook/>
          </Button>
          <Button disabled={!clueCheck} onClick={onclickClue} sx={{color:"#ebca14", minWidth:"50px"}}>
            <WbIncandescent style={{ transform: "rotate(180deg)"}}/>
          </Button>
        </Stack>
        <div style={{height:"100%", overflowY: "auto", marginLeft:theme.spacing(2) }}>
          <ReactMarkdown children={markdownShow} remarkPlugins={[remarkGfm, [remarkemoji, {
        emoticon: true }]]} />
        </div>
    </PBCard>
  </>
}
