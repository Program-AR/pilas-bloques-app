import { Typography } from "@mui/material"
import theme from "../../../../theme"
import { MarkdownInput } from "./MarkdownInput"
import { MarkdownResult } from "./MarkdownResult"
import { useState } from "react"
import { useTranslation } from "react-i18next"

type MarkdownEditorProps = {
    statement: string
    clue: string | undefined
    setStatement: (statement: string) => void
    setClue: (clue: string) => void
}


export const MarkdownEditor = (props: MarkdownEditorProps) => {
    const { t } = useTranslation('creator')
    const [showStatement, setShowStatement] = useState<boolean>(true)

    return <>
        <MarkdownResult text={showStatement ? props.statement : props.clue!} setShowStatement={setShowStatement} clueIsEnabled={!!props.clue}/>
        <Typography variant="body1" marginY={theme.spacing(2)}>{t('statement.descriptionHint')}</Typography>
        <MarkdownInput setShowStatement={setShowStatement} {...props}/>
    </>
}