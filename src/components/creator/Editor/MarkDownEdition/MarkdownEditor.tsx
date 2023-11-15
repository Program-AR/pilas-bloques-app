import { MarkdownInput } from "./MarkdownInput"
import { MarkdownResult } from "./MarkdownResult"
import { useState } from "react"

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
    const [statementTextToShow, setShowStatement] = useState<StatementTextToShow>(StatementTextToShow.STATEMENT)
    const textToShow: string = statementTextToShow === StatementTextToShow.STATEMENT ? props.statement : props.clue!

    return <>
        <MarkdownInput setShowStatement={setShowStatement} statement={props.statement} clue={props.clue} setClue={props.setClue} setStatement={props.setStatement}/>
        <MarkdownResult text={textToShow} setShowStatement={setShowStatement} clueIsEnabled={!!props.clue}/>
    </>
}