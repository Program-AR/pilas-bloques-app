import { Switch, FormControlLabel, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { StatementTextToShow } from "../../../challengeView/StatementDescription";

type MarkdownInputProps = {
  statement: string,
  setStatement: (statement: string) => void,
  clue: string | undefined,
  setClue: (clue?: string) => void
  setShowStatement: (selected: StatementTextToShow) => void
}

export const MarkdownInput = (props: MarkdownInputProps) => {

  const [clueIsEnabled, setClueIsEnabled] = useState<boolean>(!!props.clue)

  const { t } = useTranslation('creator');
  
  const onClueChange = (e: { currentTarget: { value: string; }; }) => {
    const newValue = e.currentTarget.value;
    props.setClue(newValue)
  };

  const onStatementChange = (e: { currentTarget: { value: string; }; }) => {
    const newValue = e.currentTarget.value;
    props.setStatement(newValue)
  };

  const toggleClueEnabled = (e: { currentTarget: { checked: boolean }; }) => {
    setClueIsEnabled(e.currentTarget.checked)
    if(!e.currentTarget.checked) {
      props.setClue(undefined)
      props.setShowStatement(StatementTextToShow.STATEMENT)
      props.statement
    }

  }


  return (
    <>
    <TextField
        fullWidth
        autoFocus
        size="small"
        multiline={true}
        inputProps={{ "data-testid": "statement-input" }}
        label={t('statement.description')}
        value={props.statement}
        onChange={onStatementChange}
        onFocus={() => props.setShowStatement(StatementTextToShow.STATEMENT)}
        //onFocus={() => props.statement}
        sx={{marginTop: '10px'}}
        id="statement-input"
    />
    <FormControlLabel control={<Switch color="secondary" onChange={toggleClueEnabled} checked={clueIsEnabled}/>} label={t("statement.includeClue")}/>

    {clueIsEnabled ? 
    <TextField
        fullWidth
        size="small"
        multiline={true}
        label={t('statement.clue')}
        value={props.clue}
        onChange={onClueChange}
        onFocus={() => props.setShowStatement(StatementTextToShow.CLUE)}
        //onFocus={() => props.clue}
        id="clue-input"
    />
    :
    <></>
  }
</>
  );
}
