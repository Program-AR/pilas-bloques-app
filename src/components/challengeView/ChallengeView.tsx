import { useParams } from "react-router-dom"
import { Challenge, PathToChallenge, currentIdFor, getPathToChallenge } from "../../staticData/challenges";
import { Drawer, useMediaQuery, PaperProps, Box, Stack } from "@mui/material";
import { StatementDescription } from "./StatementDescription";
import { EditableBlocklyWorkspace } from "./EditableBlocklyWorkspace";
import { InfoButton, SceneButtons, SceneButtonsVertical } from "./SceneButtons/SceneButtons";
import { SceneView } from "./SceneView";
import { ChallengeFooter } from "./Info/ChallengeFooter";
import { LocalStorage } from "../../localStorage"
import { Header } from "../header/Header"
import { Scene, SceneMap, SerializedChallenge } from "../serializedChallenge";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../theme/ThemeContext";
import { useState } from "react";
import { StatementTextToShow } from "../creator/Editor/MarkDownEdition/MarkdownEditor";
import { ChallengeBreadcrumb } from "./ChallengeBreadcrumb";

export const serializedSceneToDescriptor = (scene: Scene) => {
  const mapToString = (map: SceneMap) => `"${JSON.stringify(map).replace(/"/g, '')}"`
  const mapsAsString = scene.maps.map(mapToString).join(',')

  return `new Escena${scene.type}([${mapsAsString}])`
}

type ChallengeViewProps = {
  path?: string,
  height?: string
}

export const ChallengeView = ({path, height}: ChallengeViewProps) => {
  var { id } = useParams()

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

  return <Stack height={height ? height : '100%'}>
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
  const { theme } = useThemeContext()
  const [descriptionOrClue, setDescriptionOrClue] = useState(statement!)
  const setToShow = (show: StatementTextToShow) => setDescriptionOrClue(show === StatementTextToShow.CLUE ? clue! : statement!)
  const isSmallScreen: boolean = useMediaQuery(theme.breakpoints.down('sm'));
  const blocklyWorkspaceProps: EditableBlocklyWorkspaceProps = {
    blockIds: challenge.toolboxBlockIds,
    categorized: challenge.toolboxStyle !== 'noCategories'
  }

  return <>
    <Stack flexGrow={1} direction='column' height='100%'>
      <StatementDescription
        text={descriptionOrClue}
        setShowStatement={setToShow}
        clueIsEnabled={clue !== ''}
        urlImage={challenge.imageURL()} />
      {isSmallScreen ? <VerticalChallengeWorkspace blocklyWorkspaceProps={blocklyWorkspaceProps} challenge={challenge} /> : <HorizontalChallengeWorkspace blocklyWorkspaceProps={blocklyWorkspaceProps} challenge={challenge} />}
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
  categorized: boolean
}

const HorizontalChallengeWorkspace = ({ challenge, blocklyWorkspaceProps }: ChallengeWorkspaceDistributionProps) => {
  return <Stack direction="row" flexWrap={"wrap"} flexGrow={1}>
    <EditableBlocklyWorkspace blockIds={blocklyWorkspaceProps.blockIds} categorized={blocklyWorkspaceProps.categorized} isVertical={false} />
    <Stack>
      <SceneButtons />
      <SceneView descriptor={challenge.sceneDescriptor} />
    </Stack>
  </Stack>
}

const VerticalChallengeWorkspace = ({ challenge, blocklyWorkspaceProps }: ChallengeWorkspaceDistributionProps) => {

  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  return <Stack flexWrap={"wrap"} flexGrow={1} >
    <EditableBlocklyWorkspace blockIds={blocklyWorkspaceProps.blockIds} categorized={blocklyWorkspaceProps.categorized} isVertical={true} />
    <Stack direction='row' marginBottom='5px' justifyContent='space-evenly'>
      <SceneView descriptor={challenge.sceneDescriptor} />
      <Stack margin='10px' justifyContent='space-between'>
        <SceneButtonsVertical />
        <InfoButton onClick={() => setOpenDrawer(true)} />
        <InfoDrawer open={openDrawer} onClose={() => setOpenDrawer(false)} />
      </Stack>
    </Stack>
  </Stack>
}

type InfoDrawerProps = {
  open: boolean
  onClose: () => void
}

const InfoDrawer = ({ open, onClose }: InfoDrawerProps) => {
  return <Drawer
    PaperProps={{ sx: { backgroundColor: 'transparent', boxShadow: 'none', justifyContent: 'flex-end' } }}
    anchor='right'
    onClose={onClose}
    open={open}>
    <ChallengeFooter isVertical={true} />
  </Drawer>
}

export { ChallengeBreadcrumb };
