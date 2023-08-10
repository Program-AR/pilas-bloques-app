import { useContext } from "react";
import ReactMarkdown from "react-markdown";
import { Box, Button, lighten } from "@mui/material";
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

  return (
    <PBCard sx={{ flexDirection: "row" }}>
    <Box component="fieldset" sx={{display: "flex", margin: theme.spacing(0.3), width:"100%", flexDirection: "row", boxSizing: "border-box", borderStyle: "solid", borderWidth: "thin", borderRadius: theme.shape.borderRadius.toString()+"px" }}>
        <legend style={{color: theme.palette.primary.main }}>{t('statement.markdownTitle')}</legend>
        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <img alt="actor" style={{width:"64px", height:"64px"}} src={`${urlImage}`}/>
        </Box>
        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center" }}> 
          <Box sx={{display: "flex", textAlign: "center", marginRight: theme.spacing(0.6), marginLeft: theme.spacing(0.6), width: "50px", flexDirection: "column", justifyContent: "flex-start", backgroundColor: lighten(theme.palette.primary.main, 0.74)}}>
            <Button onClick={onclickStatement} sx={{"&:hover": {backgroundColor: lighten(theme.palette.primary.main, 0.67)}, color: theme.palette.primary.main, minWidth: "50px"}}><MenuBook/></Button>
            <Button disabled={!clueCheck} onClick={onclickClue} sx={{"&:hover": {backgroundColor: lighten(theme.palette.primary.main, 0.67)}, color:"#ebca14", minWidth: "50px"}}><WbIncandescent style={{ transform: "rotate(180deg)"}}/></Button>
          </Box>
        </Box>
       <ReactMarkdown children={markdownShow} remarkPlugins={[remarkGfm, [remarkemoji, {
       emoticon: true }]]} />
    </Box>
    </PBCard>
  );
}
