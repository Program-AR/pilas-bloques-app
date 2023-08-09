import { useContext } from "react";
import ReactMarkdown from "react-markdown";
import { Box, Button } from "@mui/material";
import { WbIncandescent, MenuBook } from"@mui/icons-material"
import { PBCard } from "../../../PBCard";
import remarkGfm from 'remark-gfm';
import remarkemoji from 'remark-emoji';
import { useTranslation } from "react-i18next";
import { MarkdownContext } from "./MarkdownContext";

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


  return (
    <PBCard sx={{ flexDirection: "row" }}>
    <Box component="fieldset" sx={{display: "flex", width:"100%", flexDirection: "row", boxSizing: "border-box", borderRadius: '4px' }}>
        <legend>{t('statement.markdownTitle')}</legend>
        <img alt="actor" style={{width:"80px", height:"80px"}} src={`${urlImage}`}/>
        <Box sx={{FlexDirection: "column", width:"100px"}}>
        <Button onClick={onclickStatement}><MenuBook/></Button>
        <Button disabled={!clueCheck} onClick={onclickClue}><WbIncandescent/></Button>
        </Box>
       <ReactMarkdown children={markdownShow} remarkPlugins={[remarkGfm, [remarkemoji, {
          emoticon: true }]]} />
    </Box>
    </PBCard>
  );
}
