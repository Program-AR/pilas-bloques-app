import { MarkdownInput } from "./MarkdownInput"
import { StatementDescription } from "../../../ChallengeView/StatementDescription"
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

    // La sentencia translate="no" evita la traducción del contenido de la pagina cuando está activada en Chrome/Safari 
    // con motivo del error que se producía: "Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node"
    // similar a lo descripto en la siguiente documentacion por ser un inconveniente entre React DOM vs Real DOM en la renderizacion 
    // cuando Chrome o Safari modifican el html para producir la traduccion en linea, lo hace solo en uno de ellos provocando el error.
    // https://github.com/facebook/react/issues/17256
    // Se aplica esta solucion https://stackoverflow.com/questions/12238396/how-to-disable-google-translate-from-html-in-chrome/12238414#12238414
    return <span translate="no">
        <MarkdownInput setShowStatement={setShowStatement} statement={props.statement} clue={props.clue} setClue={props.setClue} setStatement={props.setStatement}/>
        <StatementDescription text={textToShow} setShowStatement={setShowStatement} clueIsEnabled={!!props.clue}/>
    </span>
}