import { Typography } from "@mui/material"
import { MarkdownInput } from "./MarkdownInput"
import { MarkdownResult } from "./MarkdownResult"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { theme } from "../../../../theme/theme"

type MarkdownEditorProps = {
    statement: string
    clue: string | undefined
    setStatement: (statement: string) => void
    setClue: (clue?: string) => void
}

export enum StatementTextToShow {
    STATEMENT,
    CLUE
}

export const MarkdownEditor = (props: MarkdownEditorProps) => {
    const { t } = useTranslation('creator')
    const [statementTextToShow, setShowStatement] = useState<StatementTextToShow>(StatementTextToShow.STATEMENT)
    const textToShow: string = statementTextToShow === StatementTextToShow.STATEMENT ? props.statement : props.clue!

    return <>
        <MarkdownResult text={textToShow} setShowStatement={setShowStatement} clueIsEnabled={!!props.clue}/>
        <Typography variant="body1" marginY={theme.spacing(2)}>{t('statement.descriptionHint')}</Typography>
        <MarkdownInput setShowStatement={setShowStatement} statement={props.statement} clue={props.clue} setClue={props.setClue} setStatement={props.setStatement}/>
    </>
}