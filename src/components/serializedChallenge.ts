import simpleTypeGuard, { SimpleArray, SimpleStringOptional, SimpleNumber, SimpleString, SimpleBooleanOptional, SimpleObjectOptional, SimpleSkip } from 'simple-type-guard';
import { ACTOR, EMPTY } from './creator/Editor/SceneEdition/mapUtils';

//IMPORTANT: remember to bump this version whenever there are breaking changes in the file format.
export const creatorVersion = 1

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
    stepByStep?: boolean,
    predefinedSolution?: string,
    assesments?: Assesments,
    sharedId?: string
}


const sceneTypes =  ["Lita", "Duba", "Toto", "Coty", "Manic", "Chuy", "Yvoty", "Capy", "Custom"] as const //Used for file validity checking
export type SceneType = typeof sceneTypes[number]

type Cell = string

export type SceneMap = Cell[][]

export type Scene = {
    type: SceneType
    maps: SceneMap[]
}

type SceneObject = {
    validCells: Cell[]
    specificBlocksIds: string[]
}

export const sceneObjectByType = (type:SceneType): SceneObject => {
    switch (type ) {
        case "Lita": 
            return {
                validCells: ['L','T','E'],
                specificBlocksIds: [ 
                    'AgarrarTomate', 
                    'AgarrarLechuga',
                    'PrepararEnsalada', 
                    'HayLechuga', 
                    'HayTomate',
                    'HayEnsaladera'
                ]
            }
        case "Duba": 
            return {
                validCells: ['P'],
                specificBlocksIds: [
                    'ComerChurrasco', 
                    'HayChurrasco'
                ]
            }
        case "Manic": 
            return {
                validCells: ['T','E','P'],
                specificBlocksIds: [
                    'TocandoTelescopio', 
                    'TocandoEstrellaManic', 
                    'TocandoPlaneta', 
                    'ObservarEstrella',
                    'ObservarPlaneta', 
                    'RepararTelescopio' 
                ] 
            }
        case "Chuy": 
            return {
                validCells: ['T','E','U','P','G'],
                specificBlocksIds: [
                    'RecogerTrofeo', 
                    'RebotarPingPong', 
                    'PatearPulpito', 
                    'PatearPelotaChuy', 
                    'TocandoPulpito', 
                    'TocandoPingPong', 
                    'TocandoPaleta',
                    'RecogerPaleta', 
                    'TocandoPelotaChuy',
                    'HayTrofeo'
                ]
            }
        case "Yvoty": 
            return {
                validCells: ['C','K','L','M'],
                specificBlocksIds: [
                    'DespertarLuciernaga', 
                    'FotografiarMariposa', 
                    'DesbloquearCelular', 
                    'AgarrarCargador', 
                    'TocandoMariposa', 
                    'TocandoCelular', 
                    'TocandoLuciernaga', 
                    'CargarCelular',
                    'HayCargador'
                ]
            }
        case "Capy": 
            return {
                validCells: ['L','P'],
                specificBlocksIds: [
                    'RecogerLata', 
                    'RecogerPapel', 
                    /*'SostenerPapel', 
                    'LlenarTacho', */
                    'TocandoPapel', 
                    'TocandoLata'
                ]
            }
        default: 
            return {
                validCells: [],
                specificBlocksIds: []
            }
    }
}

export const defaultScene = (type: SceneType): Scene => {
	return {
		type: type,
		maps: [[[ACTOR, EMPTY, EMPTY],
		[EMPTY, EMPTY, EMPTY],
		[EMPTY, EMPTY, EMPTY]]]
	}
}

export const defaultChallenge = (type: SceneType, defaultDescription = "", defaultTitle=""): SerializedChallenge => {
	return {
		fileVersion: 1,
		title: defaultTitle,
		statement: {
			description: defaultDescription
		},
		scene: defaultScene(type),
		toolbox: {
			blocks: ['MoverACasillaDerecha']
		},
        stepByStep: true
	}
}

type Assesments =  {
    itWorks?: boolean, // old "debeFelicitar", default true
    decomposition?: DecompositionAssessment,
    simpleRepetition?: boolean,
    conditionalRepetition?: boolean,
    conditionalAlternative?: boolean,
}

type DecompositionAssessment = { maxProgramLength: number }


export const isValidChallenge = (json: unknown): json is SerializedChallenge => {
    const structureIsValid: boolean = simpleTypeGuard<SerializedChallenge>(json, {
        fileVersion: SimpleNumber,
        title: SimpleString,
        statement: {description: SimpleString, clue: SimpleStringOptional},
        toolbox: {blocks: new SimpleArray(SimpleString), categorized: SimpleBooleanOptional},
        stepByStep: SimpleBooleanOptional,
        predefinedSolution: SimpleStringOptional,
        scene: SimpleSkip, //We cant check if the scene values are valid here, so we need to check them manually. This is because "SimpleExactMatch" seems to be broken.
        assesments: new SimpleObjectOptional<Assesments>({
            itWorks: SimpleBooleanOptional,
            simpleRepetition: SimpleBooleanOptional,
            conditionalRepetition: SimpleBooleanOptional,
            conditionalAlternative: SimpleBooleanOptional,
            decomposition: new SimpleObjectOptional<DecompositionAssessment>({
                maxProgramLength: SimpleNumber
            })
        }),
        sharedId: SimpleStringOptional
    })

    return structureIsValid && sceneIsValid((json as any).scene)
}

export const sceneIsValid = (serializedScene: unknown): serializedScene is Scene => {

    const sceneStructureIsValid: boolean = simpleTypeGuard<Scene>(serializedScene, { //Verify if the structure of the scene is valid, without checking if the values are valid.
        type: SimpleString,
        maps: new SimpleArray<SceneMap>(new SimpleArray<Cell[]>(new SimpleArray<Cell>(SimpleString))) 
    })

    if(!sceneStructureIsValid) return false

    const type: string | SceneType = (serializedScene as any).type
    const maps: [string[][]] | SceneMap[] = (serializedScene as any).maps

    if (!isSceneType(type) || !mapsAreValidForType(maps, type)) return false

    const scene: Scene = {type, maps} //This line is needed to let typescript verify on compile time if this function (sceneIsValid) completely satisfies the type of Scene. (e.g. if we add a field to scene, this line breaks, and we want that to bring the attention to this function, which probably will need changes)

    return !!scene
}

const mapsAreValidForType = (maps: SceneMap[], type: SceneType): boolean =>
    maps.every(map => mapIsValidForType(map, type))

const mapIsValidForType = (map: SceneMap, type: SceneType): map is SceneMap => {
    const rowIsValid = (row: Cell[]) => row.every(cell => cellIsValidForType(cell, type))
    return map.every(rowIsValid)
}

const cellIsValidForType = (cell: Cell, type: SceneType): boolean => {
    return cellIsIncluded(sceneObjectByType(type).validCells, cell)
}
    
const cellIsIncluded = (typeCells: string[], cell: string) =>{
    const basicCells: string[] = ['A','O','-']
    return basicCells.concat(typeCells).concat(multipleObjectsCells(typeCells)).includes(cell)
}

const multipleObjectsCells = (typeCells: string[]) => typeCells.map(prize => `A&${prize}`).concat(typeCells.map(prize => `${prize}&A`))

const isSceneType = (type: any): type is SceneType => 
    sceneTypes.includes(type)

