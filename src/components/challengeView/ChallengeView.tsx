import { useParams } from "react-router-dom"
import { Challenge, PathToChallenge, currentIdFor, getPathToChallenge } from "../../staticData/challenges";
import { PaperProps, Stack } from "@mui/material";
import { EditableBlocklyWorkspace } from "./EditableBlocklyWorkspace";
import { InfoButton, SceneButtons } from "./SceneButtons/SceneButtons";
import { SceneView } from "./SceneView";
import { StatementDescription } from "./StatementDescription";
import { ChallengeFooter, InfoDrawer } from "./Info/ChallengeFooter";
import { LocalStorage } from "../../localStorage"
import { Header } from "../header/Header"
import { Scene, SceneMap, SerializedChallenge } from "../serializedChallenge";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../theme/ThemeContext";
import { useEffect, useMemo, useState } from "react";
import { ChallengeBreadcrumb } from "./ChallengeBreadcrumb";
import Blockly from "blockly/core"
import { xmlBloqueEmpezarAEjecutar } from "../blockly/blockly";
import { SolutionButtons } from "./SolutionButtons";
import { MultipleScenariosButton } from "./SceneButtons/MultipleScenarios";
import { relative } from "path";

export const serializedSceneToDescriptor = (scene: Scene) => {
  const mapToString = (map: SceneMap) => `"${JSON.stringify(map).replace(/"/g, '')}"`
  const mapsAsString = scene.maps.map(mapToString).join(',')

  return `new Escena${scene.type}([${mapsAsString}])`
}

type ChallengeViewProps = {
  path?: string,
  height?: string,
}

export const ChallengeView = ({ path, height }: ChallengeViewProps) => {
  var { id } = useParams()
  const { theme } = useThemeContext()

  // TODO Es necesario traerse en challenges.json los statement.decription y statement.clue con sus traducciones para cada desafio
  const { t } = useTranslation('challenges')

  const impChallenge: boolean = !!path?.includes("react-imported-challenge")

  const serializedChallengeToChallenge = (serializedChallenge: SerializedChallenge): Challenge => (
    {
      sceneDescriptor: serializedSceneToDescriptor(serializedChallenge.scene),
      toolboxBlockIds: serializedChallenge.toolbox.blocks,
      toolboxStyle: serializedChallenge.toolbox.categorized ? 'categorized' : 'noCategories',
      debugging: serializedChallenge.stepByStep,
      predefinedSolution: serializedChallenge.predefinedSolution,
      shouldShowMultipleScenarioHelp: (serializedChallenge.scene.maps.length > 1),
      id: 0,
      imageURL: () => `imagenes/sceneImages/${serializedChallenge.scene.type}/tool.png`
    }
  )

  const pathToChallenge: PathToChallenge | null = !impChallenge ? getPathToChallenge(currentIdFor(Number(id))) : null

  const workspace: ChallengeWorkspaceProps = {
    challenge: (impChallenge ? serializedChallengeToChallenge(LocalStorage.getCreatorChallenge()!) : pathToChallenge!.challenge),
    statement: impChallenge ? LocalStorage.getCreatorChallenge()!.statement.description : t(`${id}.statement`)!,
    clue: impChallenge ? LocalStorage.getCreatorChallenge()!.statement.clue || '' : t(`${id}.clue`)!
  }

  return <Stack height={height ? height : '100%'} sx={{ backgroundColor: theme.palette.background.paper }}>
    {!impChallenge && <Header CenterComponent={ChallengeBreadcrumb(pathToChallenge!)} shouldShowSimpleReadSwitch={!pathToChallenge!.book.simpleReadMode} />}
    <ChallengeWorkspace challenge={workspace.challenge} statement={workspace.statement} clue={workspace.clue} />
  </Stack>
}

type ChallengeWorkspaceProps = {
  challenge: Challenge,
  statement?: string,
  clue?: string,
  style?: PaperProps["style"]
}

const ChallengeWorkspace = ({ statement, challenge, clue }: ChallengeWorkspaceProps) => {
  const { isSmallScreen } = useThemeContext()
  const [first, setFirst] = useState<boolean>(true)

  useEffect(() => {
    setFirst(false)
  }, [])

  const initialXml = challenge.predefinedSolution ? challenge.predefinedSolution : xmlBloqueEmpezarAEjecutar

  const blocklyWorkspaceProps: EditableBlocklyWorkspaceProps = {
    blockIds: challenge.toolboxBlockIds,
    categorized: challenge.toolboxStyle !== 'noCategories',
    initialXml: first ? initialXml : Blockly.utils.xml.domToText(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()))
  }


  const InsideChallengeWorkspace = () => {
    return isSmallScreen ? <VerticalChallengeWorkspace blocklyWorkspaceProps={blocklyWorkspaceProps} challenge={challenge} /> : <HorizontalChallengeWorkspace blocklyWorkspaceProps={blocklyWorkspaceProps} challenge={challenge} />
  }

  return <>
    <Stack flexGrow={1} direction='column' height='100%'>
      <StatementDescription
        statement={statement}
        clue={clue}
        clueIsEnabled={clue !== ''}
        urlImage={challenge.imageURL()} />
      <InsideChallengeWorkspace />
    </Stack>
    {!isSmallScreen ? <ChallengeFooter /> : <></>}
  </>
}

type ChallengeWorkspaceDistributionProps = {
  challenge: Challenge,
  blocklyWorkspaceProps: EditableBlocklyWorkspaceProps
}

type EditableBlocklyWorkspaceProps = {
  blockIds: string[],
  categorized: boolean,
  initialXml: string
}

const HorizontalChallengeWorkspace = ({ challenge, blocklyWorkspaceProps }: ChallengeWorkspaceDistributionProps) => {
  const [running, setRunning] = useState(false)
  const blocklyWorkspace = useMemo<JSX.Element>(() => {
    return <EditableBlocklyWorkspace blockIds={blocklyWorkspaceProps.blockIds} categorized={blocklyWorkspaceProps.categorized} initialXml={blocklyWorkspaceProps.initialXml} isVertical={false} zoomScale={1.0} />
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Stack direction="row" >
    <Stack direction="row" position="relative" flexWrap={"wrap"} flexGrow={1}>
      <SolutionButtons/>
      {blocklyWorkspace}
    </Stack>
    <Stack>
      <SceneButtons challenge={challenge} running={running} setRunning={setRunning} />
      {challenge.shouldShowMultipleScenarioHelp && <MultipleScenariosButton challenge={challenge} disabled={running} />}
      <SceneView descriptor={challenge.sceneDescriptor} />
    </Stack>
  </Stack>
}

const VerticalChallengeWorkspace = ({ challenge, blocklyWorkspaceProps }: ChallengeWorkspaceDistributionProps) => {
  const [running, setRunning] = useState(false)
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  const blocklyWorkspace = useMemo<JSX.Element>(() => {
    return <EditableBlocklyWorkspace blockIds={blocklyWorkspaceProps.blockIds} categorized={blocklyWorkspaceProps.categorized} initialXml={blocklyWorkspaceProps.initialXml} isVertical={true} zoomScale={0.7} />
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Stack position="relative" flexWrap={"wrap"} flexGrow={1} >
    
      <SolutionButtons vertical={true}/>
      {blocklyWorkspace}
    
    <Stack direction='row' marginBottom='5px' justifyContent='space-evenly'>
      <SceneView descriptor={challenge.sceneDescriptor} />
      <Stack margin='10px' justifyContent='space-between'>
        <SceneButtons challenge={challenge} vertical={true} running={running} setRunning={setRunning} />
        {challenge.shouldShowMultipleScenarioHelp && <MultipleScenariosButton challenge={challenge} disabled={running} />}
        <InfoButton onClick={() => setOpenDrawer(true)} />
        <InfoDrawer open={openDrawer} onClose={() => setOpenDrawer(false)} />
      </Stack>
    </Stack>
  </Stack>
}