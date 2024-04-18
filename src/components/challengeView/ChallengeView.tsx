import { useParams } from "react-router-dom"
import { currentIdFor, getPathToChallenge } from "../../staticData/challenges";
import { Stack } from "@mui/material";
import { StatementDescription } from "./StatementDescription";
import { Footer } from "../footer/Footer";
import { EditableBlocklyWorkspace } from "./EditableBlocklyWorkspace";
import { SceneButtons } from "./SceneButtons";
import { SceneView } from "./SceneView";
import { LocalStorage } from "../../localStorage"
import { Challenge } from "../../staticData/challenges";
import { Scene, SceneMap, SerializedChallenge } from "../serializedChallenge";
import { useTranslation } from "react-i18next";

type ChallengeViewProps = {
  path?: string,
  height?: string
}

type ChallengeWorkspaceProps = {
  challenge: Challenge,
  statement?: string,
  clue?: string,
}

export const serializedSceneToDescriptor = (scene: Scene) => {
  const mapToString = (map: SceneMap) => `"${JSON.stringify(map).replace(/"/g, '')}"` 
  const mapsAsString = scene.maps.map(mapToString).join(',')

  return `new Escena${scene.type}([${mapsAsString}])`
}


// Repeats code with components/ChallengeView.ts, should replace it eventually.
export const ChallengeView = (props: ChallengeViewProps) => {
  
  var id: any = props.path ? props.path : { id } = useParams()

  const { t }  = useTranslation('challenges')

  const impChallenge: boolean = id?.includes("react-imported-challenge") ? true : false

  const serializedChallengeToChallenge = (serializedChallenge: SerializedChallenge) => {
    const challenge: Challenge = {
      sceneDescriptor: serializedSceneToDescriptor(serializedChallenge.scene),
      toolboxBlockIds: serializedChallenge.toolbox.blocks,
      toolboxStyle: serializedChallenge.toolbox.categorized ? 'categorized' : 'noCategories',
      debugging: serializedChallenge.stepByStep,
      predefinedSolution: serializedChallenge.predefinedSolution,
      shouldShowMultipleScenarioHelp: serializedChallenge.scene.maps.length > 1,
      id: 0,
      imageURL: () => `imagenes/sceneImages/${serializedChallenge.scene.type}/tool.png`
    }
    return challenge
  }
  
  const workspace: ChallengeWorkspaceProps = { challenge: (impChallenge ? serializedChallengeToChallenge( LocalStorage.getCreatorChallenge()! ) : 
                              getPathToChallenge(currentIdFor(Number(id))).challenge), 
                              statement: impChallenge ? LocalStorage.getCreatorChallenge()!.statement.description : t(`${id}.statement`)!,
                              clue: impChallenge ? LocalStorage.getCreatorChallenge()!.statement.clue || '' : t(`${id}.clue`)! }

return <Stack height={props.height ? props.height : '100%'}>
  <ChallengeWorkspace challenge={workspace.challenge} statement={workspace.statement} clue={workspace.clue} />
</Stack>
}

const ChallengeWorkspace = (props: ChallengeWorkspaceProps ) => {

  return <Stack flexGrow={1}>
    <StatementDescription
      text={props.statement!}
      setShowStatement={() => { }}
      clueIsEnabled={props.clue !== ''}
      urlImage={props.challenge.imageURL()} />
    <Stack direction="row" flexWrap={"wrap"} flexGrow={1}>
      <EditableBlocklyWorkspace blockIds={props.challenge.toolboxBlockIds} categorized={props.challenge.toolboxStyle === 'categorized' } />
      <Stack>
        <SceneButtons />
        <SceneView descriptor={props.challenge.sceneDescriptor} />
      </Stack>
    </Stack>
    <Footer />
  </Stack>
}