import { TextField, FormControlLabel, Switch } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type MarkdownInputProps = {
  statement: string,
  setStatement: (statement: string) => void,
  clue: string | undefined,
  setClue: (clue: string) => void
  setShowStatement: (selected: boolean) => void
}

export const MarkdownInput = (props: MarkdownInputProps) => {

  const [clueEnabled, setClueEnabled] = useState<boolean>(!!props.clue)

  const { t } = useTranslation('creator');
  
  const onClueChange = (e: { currentTarget: { value: string; }; }) => {
    const newValue = e.currentTarget.value;
    props.setClue(newValue)
  };

  const onStatementChange = (e: { currentTarget: { value: string; }; }) => {
    const newValue = e.currentTarget.value;
    props.setStatement(newValue)
  };


  return (
    <>
    <TextField
        fullWidth
        size="small"
        multiline={true}
        inputProps={{ "data-testid": "statement-input" }}
        label={t('statement.description')}
        value={props.statement}
        onChange={onStatementChange}
        onFocus={() => props.setShowStatement(true)}
        sx={{marginTop: '10px'}}
        id="statement-input"
    />
    <br/>
    <FormControlLabel control={<Switch checked={clueEnabled}
                                id="clue-check-switch"
                                onChange={() => setClueEnabled(true)}/>} label={t("statement.includeClue")} />
    
    <br/>
    <TextField
        fullWidth
        size="small"
        multiline={true}
        disabled={!clueEnabled}
        label={t('statement.clue')}
        value={props.clue}
        onChange={onClueChange}
        onFocus={() => props.setShowStatement(false)}
        id="clue-input"
    />
</>
  );
}
