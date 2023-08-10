import{ useContext } from "react";
import { TextField, FormControlLabel, Switch } from "@mui/material";
import { useTranslation } from "react-i18next";
import { MarkdownContext } from "./MarkdownContext";

export const MarkdownInput = () => {
  const { markdownStatement, setMarkdownStatement, clueCheck, setMarkdownClueCheck, 
          markdownClue, setMarkdownClue, setMarkdownShow} = useContext(MarkdownContext);
  
  const { t } = useTranslation('creator');
  
  const onClueInputChange = (e: { currentTarget: { value: string; }; }) => {
    const newValue = e.currentTarget.value;
    setMarkdownClue(newValue);
    setMarkdownShow(newValue);
  };

  const onInputChange = (e: { currentTarget: { value: string; }; }) => {
    const newValue = e.currentTarget.value;
    setMarkdownStatement(newValue);
    setMarkdownShow(newValue);
  };

  const handleClueOnChange = () => {
    if( clueCheck ) setMarkdownClue('')
    setMarkdownClueCheck(!clueCheck )
  }

  return (
    <>
    <TextField
        fullWidth
        size="small"
        multiline={true}
        inputProps={{ "data-testid": "statement-input" }}
        label={t('statement.description')}
        value={markdownStatement}
        onChange={onInputChange}
        onFocus={()=>setMarkdownShow(markdownStatement)}
        sx={{marginTop: '10px'}}
        id="statement-input"
    />
    <br/>
    <FormControlLabel control={<Switch checked={clueCheck}
                                id="clue-check-switch"
                                onChange={handleClueOnChange}/>} label={t("statement.includeClue")} />
    
    <br/>
    <TextField
        fullWidth
        size="small"
        multiline={true}
        disabled={!clueCheck}
        label={t('statement.clue')}
        value={markdownClue}
        onChange={onClueInputChange}
        onFocus={()=>{if(markdownClue)setMarkdownShow(markdownClue)}}
        id="clue-input"
    />
</>
  );
}
