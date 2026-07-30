import { useParams } from "react-router-dom"
import { Challenge, PathToChallenge, currentIdFor, getPathToChallenge, shouldShowMultipleScenariosButton } from "../../staticData/challenges";
import { Collapse, IconButton, PaperProps, Stack } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
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
import { MoreVert } from "@mui/icons-material";
import { PilasBloquesApi } from "../../pbApi";

export const serializedSceneToDescriptor = (scene: Scene) => {
  const mapToString = (map: SceneMap) => `"${JSON.stringify(map).replace(/"/g, '')}"`
  const mapsAsString = scene.maps.map(mapToString).join(',')

  return `new Escena${scene.type}([${mapsAsString}])`
}

type ChallengeViewProps = {
  path?: string,
  height?: string,
  serializedChallenge?: SerializedChallenge | null,
}

export const ChallengeView = ({ path, height, serializedChallenge }: ChallengeViewProps) => {
  var { id } = useParams()
  const { theme } = useThemeContext()

  // TODO Es necesario traerse en challenges.json los statement.decription y statement.clue con sus traducciones para cada desafio
  const { t } = useTranslation('challenges')

  const impChallenge: boolean = !!path?.includes("react-imported-challenge")

  const serializedChallengeToChallenge = (sc: SerializedChallenge): Challenge => (
    {
      sceneDescriptor: serializedSceneToDescriptor(sc.scene),
      toolboxBlockIds: sc.toolbox.blocks,
      toolboxStyle: sc.toolbox.categorized ? 'categorized' : 'noCategories',
      debugging: sc.stepByStep,
      predefinedSolution: sc.predefinedSolution,
      shouldShowMultipleScenarioHelp: (sc.scene.maps.length > 1),
      id: 0,
      imageURL: () => `imagenes/sceneImages/${sc.scene.type}/tool.png`
    }
  )

  const pathToChallenge: PathToChallenge | null = !impChallenge ? getPathToChallenge(currentIdFor(Number(id))) : null

  // serializedChallenge prop takes priority (e.g. ImportedChallengeView passes location.state).
  // Fall back to LocalStorage for the creator's preview flow (/creador/ver).
  const importedSerializedChallenge: SerializedChallenge | null =
    serializedChallenge !== undefined ? serializedChallenge : LocalStorage.getCreatorChallenge()

  const challengeIdentifier = impChallenge ? importedSerializedChallenge?.title : id;

  const workspace: ChallengeWorkspaceProps = {
    challenge: (impChallenge ? serializedChallengeToChallenge(importedSerializedChallenge!) : pathToChallenge!.challenge),
    statement: impChallenge ? importedSerializedChallenge!.statement.description : t(`${id}.statement`)!,
    clue: impChallenge ? importedSerializedChallenge!.statement.clue || '' : t(`${id}.clue`)!,
    challengeIdentifier
  }

  return <Stack height={height ? height : '100%'} sx={{ backgroundColor: theme.palette.background.paper }}>
    {!impChallenge && <Header CenterComponent={ChallengeBreadcrumb(pathToChallenge!)} shouldShowSimpleReadSwitch={!pathToChallenge!.book.simpleReadMode} />}
    <ChallengeWorkspace challenge={workspace.challenge} statement={workspace.statement} clue={workspace.clue} challengeIdentifier={workspace.challengeIdentifier} />
  </Stack>
}

type ChallengeWorkspaceProps = {
  challenge: Challenge,
  statement?: string,
  clue?: string,
  challengeIdentifier?: string,
  style?: PaperProps["style"]
}

const ChallengeWorkspace = ({ statement, challenge, clue, challengeIdentifier }: ChallengeWorkspaceProps) => {
  const { isSmallScreen } = useThemeContext()
  const [first, setFirst] = useState<boolean>(true)
  const [savedSolutionXml, setSavedSolutionXml] = useState<string | null | undefined>(undefined)

  useEffect(() => {
    let mounted = true
    setFirst(true)
    setSavedSolutionXml(undefined)

    if (challenge.id && challenge.id !== 0) {
      PilasBloquesApi.lastSolution(challenge.id.toString())
        .then(solution => {
          if (!mounted) return
          setSavedSolutionXml(solution?.program ?? null)
        })
        .catch(() => {
          if (mounted) setSavedSolutionXml(null)
        })
    } else {
      setSavedSolutionXml(null)
    }

    return () => {
      mounted = false
    }
  }, [challenge.id])

  useEffect(() => {
    if (savedSolutionXml !== undefined && first) {
      setFirst(false)
    }
  }, [savedSolutionXml, first])

  const initialXml = savedSolutionXml === undefined
    ? (challenge.predefinedSolution ?? xmlBloqueEmpezarAEjecutar)
    : (savedSolutionXml ?? challenge.predefinedSolution ?? xmlBloqueEmpezarAEjecutar)

  const blocklyWorkspaceProps: EditableBlocklyWorkspaceProps = {
    blockIds: challenge.toolboxBlockIds,
    categorized: challenge.toolboxStyle !== 'noCategories',
    initialXml: first ? initialXml : Blockly.utils.xml.domToText(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()))
  }


  const InsideChallengeWorkspace = () => {
    return isSmallScreen ? <VerticalChallengeWorkspace blocklyWorkspaceProps={blocklyWorkspaceProps} challenge={challenge} challengeIdentifier={challengeIdentifier} /> : <HorizontalChallengeWorkspace blocklyWorkspaceProps={blocklyWorkspaceProps} challenge={challenge} challengeIdentifier={challengeIdentifier} />
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
  challengeIdentifier?: string,
  blocklyWorkspaceProps: EditableBlocklyWorkspaceProps
}

type EditableBlocklyWorkspaceProps = {
  blockIds: string[],
  categorized: boolean,
  initialXml: string
}

const HorizontalChallengeWorkspace = ({ challenge, challengeIdentifier, blocklyWorkspaceProps }: ChallengeWorkspaceDistributionProps) => {
  const [running, setRunning] = useState(false)
  const blocklyWorkspace = useMemo<JSX.Element>(() => {
    return <EditableBlocklyWorkspace blockIds={blocklyWorkspaceProps.blockIds} categorized={blocklyWorkspaceProps.categorized} initialXml={blocklyWorkspaceProps.initialXml} isVertical={false} zoomScale={1.0} />
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Stack direction="row" >
    <Stack direction="row" position="relative" flexWrap={"wrap"} flexGrow={1}>
      
          <Stack sx={{ position:"absolute", zIndex: 10, right: 15, top: 15 }}>
              
              <SolutionButtons direction="row" challengeIdentifier={challengeIdentifier} />
          </Stack>
      {blocklyWorkspace}
    </Stack>
    <Stack>
      <SceneButtons challenge={challenge} running={running} setRunning={setRunning} />
      {shouldShowMultipleScenariosButton(challenge) && (<MultipleScenariosButton challenge={challenge} disabled={running} />)}     
      <SceneView descriptor={challenge.sceneDescriptor} />
    </Stack>
  </Stack>
}

const VerticalChallengeWorkspace = ({ challenge, challengeIdentifier, blocklyWorkspaceProps }: ChallengeWorkspaceDistributionProps) => {
  const [running, setRunning] = useState(false)
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const [openSolution, setOpenSolution] = useState(false);

  const blocklyWorkspace = useMemo<JSX.Element>(() => {
    return <EditableBlocklyWorkspace blockIds={blocklyWorkspaceProps.blockIds} categorized={blocklyWorkspaceProps.categorized} initialXml={blocklyWorkspaceProps.initialXml} isVertical={true} zoomScale={0.7} />
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Stack position={"relative"} flexWrap={"wrap"} flexGrow={1} >
    
    

      
      <Stack sx={{ position:"absolute", zIndex: 10, right: 15, top: 15 }} direction="column" spacing={1} alignItems="flex-end">
            
           
            <IconButton sx={{backgroundColor:"background.paper", color:"text.primary"}} onClick={() => setOpenSolution(!openSolution)} size="large">
                {openSolution ? <CloseIcon /> : <MoreVert />}
            </IconButton>

            
            <Collapse in={openSolution} orientation="vertical">
                
                <SolutionButtons direction="column" challengeIdentifier={challengeIdentifier} /> 
            </Collapse>
        </Stack>
      {blocklyWorkspace}
    
    
    <Stack direction='row' marginBottom='5px' justifyContent='space-evenly'>
      <SceneView descriptor={challenge.sceneDescriptor} />
      <Stack margin='10px' justifyContent='space-between'>
        <SceneButtons challenge={challenge} vertical={true} running={running} setRunning={setRunning} />
        {shouldShowMultipleScenariosButton(challenge) && (<MultipleScenariosButton challenge={challenge} disabled={running} />)}
        <InfoButton onClick={() => setOpenDrawer(true)} />
        <InfoDrawer open={openDrawer} onClose={() => setOpenDrawer(false)} />
      </Stack>
    </Stack>
    
  </Stack>
}