import simpleTypeGuard, {
  SimpleArray,
  SimpleStringOptional,
  SimpleNumber,
  SimpleString,
  SimpleBooleanOptional,
  SimpleObjectOptional,
  SimpleSkip,
} from "simple-type-guard"

export type SerializedChallenge = {
  fileVersion: number
  title: string
  statement: {
    description: string
    clue?: string
  }
  scene: Scene
  toolbox: {
    blocks: string[] // for now, block ids, future: could be objects.
    categorized?: boolean // default true
  }
  stepByStep?: boolean // default false
  predefinedSolution?: string
  assesments?: Assesments
}

const sceneTypes = [
  "Lita",
  "Duba",
  "Toto",
  "Coty",
  "Niandu",
  "Pinguine",
  "Yaguarete",
  "Carpincho",
  "Custom",
] as const //Used for file validity checking
type SceneType = (typeof sceneTypes)[number]

type Cell = string

export type SceneMap = Cell[][]

export type Scene = {
  type: SceneType
  maps: SceneMap[]
}

type Assesments = {
  itWorks?: boolean // old "debeFelicitar", default true
  decomposition?: DecompositionAssessment
  simpleRepetition?: boolean
  conditionalRepetition?: boolean
  conditionalAlternative?: boolean
}

type DecompositionAssessment = { maxProgramLength: number }

export const isValidChallenge = (
  json: unknown
): json is SerializedChallenge => {
  const structureIsValid: boolean = simpleTypeGuard<SerializedChallenge>(json, {
    fileVersion: SimpleNumber,
    title: SimpleString,
    statement: { description: SimpleString, clue: SimpleStringOptional },
    toolbox: {
      blocks: new SimpleArray(SimpleString),
      categorized: SimpleBooleanOptional,
    },
    stepByStep: SimpleBooleanOptional,
    predefinedSolution: SimpleStringOptional,
    scene: SimpleSkip, //We cant check if the scene values are valid here, so we need to check them manually. This is because "SimpleExactMatch" seems to be broken.
    assesments: new SimpleObjectOptional<Assesments>({
      itWorks: SimpleBooleanOptional,
      simpleRepetition: SimpleBooleanOptional,
      conditionalRepetition: SimpleBooleanOptional,
      conditionalAlternative: SimpleBooleanOptional,
      decomposition: new SimpleObjectOptional<DecompositionAssessment>({
        maxProgramLength: SimpleNumber,
      }),
    }),
  })

  return structureIsValid && sceneIsValid((json as any).scene)
}

export const sceneIsValid = (
  serializedScene: unknown
): serializedScene is Scene => {
  const sceneStructureIsValid: boolean = simpleTypeGuard<Scene>(
    serializedScene,
    {
      //Verify if the structure of the scene is valid, without checking if the values are valid.
      type: SimpleString,
      maps: new SimpleArray<SceneMap>(
        new SimpleArray<Cell[]>(new SimpleArray<Cell>(SimpleString))
      ),
    }
  )

  if (!sceneStructureIsValid) return false

  const type: string | SceneType = (serializedScene as any).type
  const maps: [string[][]] | SceneMap[] = (serializedScene as any).maps

  if (!isSceneType(type) || !mapsAreValidForType(maps, type)) return false

  const scene: Scene = { type, maps } //This line is needed to let typescript verify on compile time if this function (sceneIsValid) completely satisfies the type of Scene. (e.g. if we add a field to scene, this line breaks, and we want that to bring the attention to this function, which probably will need changes)

  return !!scene
}

const mapsAreValidForType = (maps: SceneMap[], type: SceneType): boolean =>
  maps.every((map) => mapIsValidForType(map, type))

const mapIsValidForType = (map: SceneMap, type: SceneType): map is SceneMap => {
  const rowIsValid = (row: Cell[]) =>
    row.every((cell) => cellIsValidForType(cell, type))
  return map.every(rowIsValid)
}

const cellIsValidForType = (cell: Cell, type: SceneType): boolean => {
  switch (type) {
    case "Lita":
      return cellIsIncluded(["L", "E", "T"], cell)
    case "Duba":
      return cellIsIncluded(["P"], cell)
    case "Toto":
      return true
    case "Coty":
      return true
    case "Niandu":
      return cellIsIncluded([], cell)
    case "Pinguine":
      return cellIsIncluded([], cell)
    case "Yaguarete":
      return cellIsIncluded([], cell)
    case "Carpincho":
      return cellIsIncluded([], cell)
    case "Custom":
      return cellIsIncluded([], cell)
  }
}

const cellIsIncluded = (typeCells: string[], cell: string) => {
  const basicCells: string[] = ["A", "O", "-"]
  return basicCells.concat(typeCells).includes(cell)
}

const isSceneType = (type: any): type is SceneType => sceneTypes.includes(type)
