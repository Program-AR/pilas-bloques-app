import { useParams, Link } from "react-router-dom"
import { PathToChallenge, currentIdFor, getPathToChallenge } from "../../staticData/challenges";
import { Typography, useMediaQuery, PaperProps, Box, Stack } from "@mui/material";
import { StatementDescription } from "./StatementDescription";
import { Footer } from "../footer/Footer";
import { EditableBlocklyWorkspace } from "./EditableBlocklyWorkspace";
import { SceneButtons } from "./SceneButtons";
import { SceneView } from "./SceneView";
import { LocalStorage } from "../../localStorage"
import { Header } from "../header/Header"
import { Challenge } from "../../staticData/challenges";
import { Scene, SceneMap, SerializedChallenge } from "../serializedChallenge";
import { useTranslation } from "react-i18next";
import HomeIcon from '@mui/icons-material/Home';
import { PBreadcrumbs } from "../PBreadcrumbs";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { IconButtonTooltip } from "../creator/Editor/SceneEdition/IconButtonTooltip";
import { useThemeContext } from "../../theme/ThemeContext";

type ChallengeViewProps = {
  path?: string,
  height?: string
}

type ChallengeWorkspaceProps = {
  challenge: Challenge,
  statement?: string,
  clue?: string,
  style?: PaperProps["style"]
}


export const ChallengeBreadcrumb = (path: PathToChallenge) => {

  const { t } = useTranslation(["books", "challenges", "chapters", "groups", "others"])
  const {theme} = useThemeContext()
  const isSmallScreen: boolean = useMediaQuery('(max-width:1100px)');
  const isVerySmallScreen: boolean = useMediaQuery('(max-width:700px)');

  const shouldShowGroup = path.book.id === 1 && !isVerySmallScreen
  const shouldShowChapter = !isSmallScreen
  const hasPrevChallenge = path.group.previousChallenge(path.challenge) 
  const hasNextChallenge = path.group.nextChallenge(path.challenge) 

  return <Stack direction="row" alignItems="center">
      <PBreadcrumbs>

          <Link to="/">
              <HomeIcon style={{ display: 'flex', color: '#787878' }} />

          </Link>

          <Link to={`/libros/${path.book.id}`}>
              <Typography>{t(`${path.book.id}.title`, { ns: "books" })}</Typography>
          </Link>

          {shouldShowChapter &&
              <Typography>{t(`${path.chapter.id}.title`, { ns: "chapters" })}</Typography>
          }

          {shouldShowGroup &&
              <Typography>{t(`${path.group.id}.title`, { ns: "groups" })}</Typography>
          }

          <Typography>{t(`${path.challenge.id}.title`, { ns: "challenges" })}</Typography>

      </PBreadcrumbs>
      <Stack marginLeft={theme.spacing(5)} direction='row'>
          {hasPrevChallenge && 
              <Link to={`/desafio/${hasPrevChallenge!.id}`}>
                  <IconButtonTooltip icon={<KeyboardDoubleArrowLeftIcon />} tooltip={t('previousChallenge', { ns: "others" })} />
              </Link>
          }
          {hasNextChallenge && 
              <Link to={`/desafio/${hasNextChallenge!.id}`}>
                  <IconButtonTooltip icon={<KeyboardDoubleArrowRightIcon />} tooltip={t('nextChallenge', { ns: "others" })} />
              </Link>
          }
      </Stack>
  </Stack>
}

export const serializedSceneToDescriptor = (scene: Scene) => {
  const mapToString = (map: SceneMap) => `"${JSON.stringify(map).replace(/"/g, '')}"` 
  const mapsAsString = scene.maps.map(mapToString).join(',')

  return `new Escena${scene.type}([${mapsAsString}])`
}


// Repeats code with components/ChallengeView.ts, should replace it eventually.
export const ChallengeView = (props: ChallengeViewProps) => {
  var { id } = useParams()

  const { t }  = useTranslation('challenges')

  const impChallenge: boolean = props.path?.includes("react-imported-challenge") ? true : false

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
  
  const path: PathToChallenge | null = !impChallenge ? getPathToChallenge(currentIdFor(Number(id))) : null

  const workspace: ChallengeWorkspaceProps = { challenge: (impChallenge ? serializedChallengeToChallenge( LocalStorage.getCreatorChallenge()! ) : 
                              path!.challenge), 
                              statement: impChallenge ? LocalStorage.getCreatorChallenge()!.statement.description : t(`${id}.statement`)!,
                              clue: impChallenge ? LocalStorage.getCreatorChallenge()!.statement.clue || '' : t(`${id}.clue`)! }

                              

return <Box height={props.height ? props.height : '100%'}>
  {!impChallenge && <Header CenterComponent={ChallengeBreadcrumb(path!)} shouldShowSimpleReadSwitch={!path!.book.simpleReadMode} />}
  <ChallengeWorkspace challenge={workspace.challenge} statement={workspace.statement} clue={workspace.clue} />
</Box>
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