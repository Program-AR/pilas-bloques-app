import { HomeCard } from "./HomeCard";
import ImportImage from "../../assets/import.png"
import Button from '@mui/material/Button';
import { Ember } from "../../emberCommunication";
import { useNavigate } from "react-router-dom";
import simpleTypeGuard, { SimpleArray, SimpleStringOptional, SimpleBoolean, SimpleNumber, SimpleString, SimpleBooleanOptional, SimpleObjectOptional, SimpleExactMatch } from 'simple-type-guard';
import { useState } from "react";
import { Modal, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";


type SceneType = "lita" | "duba" | "toto" | "coty" | "niandu" | "pinguine" | "yaguarete" | "carpincho" | "custom"
const sceneTypes: SceneType[] =  ["lita", "duba", "toto", "coty", "niandu", "pinguine", "yaguarete", "carpincho", "custom"] //Used for file validity checking

type Cell = "P" | "-" | "A" | "" // should consider different objects / empty cell / no cell at all
const cells: Cell[] = ["P", "-", "A", ""] //Used for file validity checking

type SceneMap = Cell[]

export type Scene = {
    type: SceneType
    maps: SceneMap[]
}

type Assesments =  {
    itWorks?: boolean, // old "debeFelicitar", default true
    decomposition?: DecompositionAssessment,
    simpleRepetition?: boolean,
    conditionalRepetition?: boolean,
    conditionalAlternative?: boolean,
}

type DecompositionAssessment = { maxProgramLength: number }

export type SerializedChallenge = {
    fileVersion: number,
    title: string,
    statement: {
        description: string,
        clue?: string
    },
    scene: Scene,
    toolbox: {
        blocks: string[], // for now, block ids, future: could be objects.
        categorized?: boolean // default true
    },
    stepByStep?: boolean, // default false
    predefinedSolution?: string,
    assesments?: Assesments
}

export const ImportChallengeCard = () => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);

    const goToChallenge = (challenge: SerializedChallenge) => {
        Ember.importChallenge(challenge)
        navigate("/desafioImportado", {state: challenge})
    }

    const showErrorModal = () => {
        setModalOpen(true)
    }

    const isValidChallenge = (json: unknown): boolean => 
        simpleTypeGuard<SerializedChallenge>(json, {
            fileVersion: SimpleNumber,
            title: SimpleString,
            statement: {description: SimpleString, clue: SimpleStringOptional},
            toolbox: {blocks: new SimpleArray(SimpleString), categorized: SimpleBooleanOptional},
            stepByStep: SimpleBooleanOptional,
            predefinedSolution: SimpleStringOptional,
            scene: { 
                type: SimpleString, //TODO: Poner los exact match
                maps: new SimpleArray<Cell[]>(new SimpleArray<Cell>(SimpleString)) //TODO: Poner los exact match
            },
            assesments: new SimpleObjectOptional<Assesments>({
                itWorks: SimpleBooleanOptional,
                simpleRepetition: SimpleBooleanOptional,
                conditionalRepetition: SimpleBooleanOptional,
                conditionalAlternative: SimpleBooleanOptional,
                decomposition: new SimpleObjectOptional<DecompositionAssessment>({
                    maxProgramLength: SimpleNumber
                })

            })
        })

    const readFile = async (event: any) => {
        const file: File = event.target.files[0]
        const content: string = await file.text()
        const challengeJson: unknown = JSON.parse(content)

        event.target.value = null // Without this Chrome seems to cache the file and prevents reruns of this function. 

        if (isValidChallenge(challengeJson)) {
            goToChallenge(challengeJson as SerializedChallenge)
        }
        else {
            showErrorModal()
        }

    }

    return (
    <Button component="label" style={{textTransform: 'none'}}>
        <HomeCard nameKey={"import"} image={ImportImage} color={"#fc3e5e"}/>
        <input id="import-input" hidden accept=".pbch,.json" type="file" onChange={readFile}/>
        <Modal data-testid="invalid-import-modal" open={modalOpen} onClose={() => {setModalOpen(false)}} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <ErrorMessage />
        </Modal>
    </Button>
)
}

const ErrorMessage = () => {
    const { t } = useTranslation("home/home");

    return <Paper elevation={24} sx={{maxWidth: "25%", maxHeight: "25%" , display: "flex", alignItems: "center"}}>
        <Typography textAlign='center'>{t("importError")}</Typography>
        <img src={ImportImage}/>
    </Paper>
}