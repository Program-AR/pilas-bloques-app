import { Typography } from "@mui/material"
import { t } from "i18next"
import theme from "../../../../theme"
import { MarkdownInput } from "./MarkdownInput"
import { MarkdownResult } from "./MarkdownResult"
import { useState } from "react"

type MarkdownEditorProps = {
    statement: string
    clue: string | undefined
    setStatement: (statement: string) => void
    setClue: (clue: string) => void
}


export const MarkdownEditor = (props: MarkdownEditorProps) => {

    const [showStatement, setShowStatement] = useState<boolean>(true) 

    return <>
        <MarkdownResult statement={props.statement} clue={props.clue} showStatement={showStatement}/>
        <Typography variant="body1" marginY={theme.spacing(2)}>{t('statement.descriptionHint')}</Typography>
        <MarkdownInput setShowStatement={setShowStatement} {...props}/>
    </>
}