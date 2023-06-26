import { Stack } from "@mui/material"
import { SceneMap, SerializedChallenge } from "../serializedChallenge"
import { LocalStorage } from "../../localStorage"
import { defaultMaps } from "./Selection"

// these consts are for testing purpose 
const A = "A"
const O = "O"
const E = "E"
const G = "-"

const mapa = [[A,O,O,O,O,A,O,O,O,O,A,O,O,O,O],[G,O,G,G,G,A,O,O,O,O,A,O,O,O,O],[G,O,O,O,G,A,O,O,O,O,A,O,O,O,O],[E,G,G,G,G,A,O,O,O,O,A,O,O,O,O]]

// the scene has multiple initial scenarios
export const SceneGrid = () => {

    const challenge: SerializedChallenge | null = LocalStorage.getCreatorChallenge()

    const maps: SceneMap[] = challenge ? challenge.scene.maps : defaultMaps

    return <Stack>
        {maps[0].map((row, i) =>
            <Stack  key={i} direction="row" data-testid="challenge-row">
                {row.map((cellContent, j) => <Cell key={j} testId="challenge-cell">{cellContent}</Cell>)}
            </Stack>)}
    </Stack>
}

//May be of use in the future to try Grid with aspect-ratio: 1/1 to force the cell to be squared
const Cell: React.FC<CellProps> = (props) => <div data-testid={props.testId} style={{ borderStyle: "solid", height: "100%", width: "100%" }}>{props.children}</div>

interface CellProps { children: React.ReactNode, testId: string}