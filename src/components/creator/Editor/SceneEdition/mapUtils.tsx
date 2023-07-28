import { SceneMap } from "../../../serializedChallenge"
import { Position } from "./Grid/SceneCell"

export const OBSTACLE = "O"
export const ACTOR = "A"
export const EMPTY = "-"

//Remeber to change de default scene at serializedChallenge.tsx if the inital position for Actor changes
export const INITIAL_COL = 0
export const INITIAL_ROW = 0

export const PROCEDURE_BLOCK = 'Procedimiento'

/**
 * If no position is given, the actor is set in the initial one (0,0)
 * @returns a map with the actor in another position.
 */
export const setActorAtPosition = (inMap: SceneMap, row = INITIAL_ROW, col = INITIAL_COL): SceneMap => {
    if (inMap[row][col] === EMPTY || inMap[row][col] === OBSTACLE) {
        inMap[row][col] = ""
    }
    inMap[row][col] = ACTOR + (inMap[row][col].length ? '&' + inMap[row][col] : '')
    return inMap
}

export const hasActor = (cell: string): boolean => cell.split('&').includes(ACTOR)

const actorIsInMap = (map: SceneMap): boolean => map.some(rowHasActor)

const rowHasActor = (row: string[]): boolean => row.some(hasActor)

export const relocateActorIfRemoved = (map: SceneMap) => {
    if(!actorIsInMap(map)) setActorAtPosition(map)
}

export const actorPosition = (map: SceneMap): Position | null => {
    if(!actorIsInMap(map)) return null
    let row = map.findIndex(rowHasActor)
    let column = map[row].findIndex(hasActor)
    return { row, column }
}
