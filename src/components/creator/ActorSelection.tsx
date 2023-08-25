import { Button, Card, CardContent, darken, useMediaQuery, Dialog, DialogContent, CardMedia, Stack, Typography } from "@mui/material"
import { Header, HeaderText } from "../header/Header"
import { MouseEvent, useState } from "react"
import { Interests, Psychology, Place, FactCheck, EmojiEvents } from '@mui/icons-material'
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import styles from "./selection.module.css"
import UploadIcon from '../home/UploadIcon';
import { LocalStorage } from "../../localStorage"
import { SceneType, SerializedChallenge, isValidChallenge, defaultChallenge } from "../serializedChallenge"
import { DialogSnackbar } from "../dialogSnackbar/DialogSnackbar";
import { BetaBadge } from "./BetaBadge"
import PaintbrushIcon from "../home/PaintBrushIcon";
import theme from "../../theme"
import { Carousel } from 'react-carousel3';
import { StyledCreatorActionButton } from "./Editor/ActionButtons/CreatorActionButton"

const baseUrlImage = 'imagenes/selection/'
const baseObjectUrlImage = 'imagenes/sceneImages/'

type GoalDataType = {
    key: string
    object: string
}

type ActorDataType = {
	name: SceneType
    color: string
    goals: GoalDataType[]
}

const actorsData: ActorDataType[] = [
	{
		name: "Lita",
        color: "#FF9C5D",
        goals: [ 
            { key: "letucce",
              object: "L.png"
            },
            { key: "tomato",
              object: "T.png"
            },
            { key: "salad",
              object: "E.png"
            }
        ]
	},
	{
		name: "Duba",
        color: "#FED473",
        goals: [ 
            { key: "steak",
              object: "P.png"
            }
        ]
    },
	{
		name: "Chuy",
        color: "#FFB4E0",
        goals: [ 
            { key: "paddle",
              object: "E.png"
            },
            { key: "trophy",
              object: "T.png"
            },
            { key: "pingpong",
              object: "P.png"
            },
            { key: "pulpito",
              object: "U.png"
            },
            { key: "football",
              object: "G.png"
            },
        ]
    },
	{
		name: "Manic",
        color: "#FFFBB1",
        goals: [ 
            { key: "telescope",
              object: "T.png"
            },
            { key: "star",
              object: "E.png"
            },
            { key: "planet",
              object: "P.png"
            }
        ]
    },
	{
		name: "Capy",
        color: "#B0E092",
        goals: [ 
            { key: "can",
              object: "L.png"
            },
            { key: "paper",
              object: "P.png"
            }
        ]
    },
	{
		name: "Yvoty",
        color: "#ABDEDB",
        goals: [ 
            { key: "firefly",
              object: "L.png"
            },
            { key: "butterfly",
              object: "M.png"
            },
            { key: "unlockCellphone",
              object: "C.png"
            },
            { key: "charger",
              object: "K.png"
            },
            { key: "chargeCellphone",
              object: "P.png"
            }
        ]
    }
]

const LoadChallengeCard = () => {
	const { t } = useTranslation("creator")
    const isSmallScreen: boolean = useMediaQuery(theme.breakpoints.down('sm'));
	const navigate = useNavigate()
    const [snackbarOpen, setSnackbarOpen] = useState(false);

	const goToCreatorChallenge = (challenge: SerializedChallenge) => {
		LocalStorage.saveCreatorChallenge(challenge)
		navigate("/creador/editar")
	}

    const showErrorSnackbar = () => {
        setSnackbarOpen(true)
    }

    const readFile = async (event: any) => {
        const file: File = event.target.files[0]
        const content: string = await file.text()
        const challengeJson: unknown = JSON.parse(content)

        event.target.value = null // Without this Chrome seems to cache the file and prevents reruns of this function. 

        if (isValidChallenge(challengeJson)) {
            goToCreatorChallenge(challengeJson)
        }
        else {
            showErrorSnackbar()
        }
    }
	return (
        <Button variant="outlined" sx={{
            textTransform: "none",
            marginRight: '10px',
            whiteSpace: 'nowrap',
            backgroundColor: '#ffffff', 
            fontWeight: 'bold', 
            fontSize: 16,
                '&:hover': {
                    backgroundColor: darken('#ffffff', 0.2),
                  } }}
            component="label"
            startIcon={<UploadIcon />}>
            {t(`editor.buttons.loadChallenge${isSmallScreen ? 'Short' : ''}`)}
            <input data-testid="import-input" hidden accept=".dpbq" type="file" onChange={readFile} />
            <DialogSnackbar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                message={t('selection.importError')} /> 
        </Button>            
	)
}

type ActorType = {
	id: SceneType
    image: string
    color: string
    goals: GoalDataType[]
}

class ActorClass {
    isSelected: boolean
    actor: ActorType

    constructor(id: SceneType, isSelected: boolean, image: string, color: string, goals: GoalDataType[]) {
        this.isSelected = isSelected
        this.actor = { id, image, color, goals }
    }
}

class ActorState {
    actors: ActorClass[] = []

    constructor(actorList: ActorDataType[]) {
        this.actors = actorList.map((actors, index) => 
          new ActorClass(actors.name, (index === 0), 
            ((index === 0 ) ?
                `${baseUrlImage}gifs/${actors.name}.gif` :
                `${baseUrlImage}svg/${actors.name}.svg`),
            actors.color, actors.goals))
        }

    actorChanged = (actorId: string) => (
        this.actors.forEach(item => {
            if( item.actor.id === actorId) {
                item.actor.image = `${baseUrlImage}gifs/${item.actor.id}.gif`
                item.isSelected = true
            }})
    )
    
    getActorSelected = () => this.actors.find( actor => actor.isSelected )!

    getActors = () => this.actors

    restoreActorImages = () => 
        this.actors.forEach(item => { item.actor.image = `${baseUrlImage}svg/${item.actor.id}.svg`; item.isSelected = false })

}

type ActorInfoProps = {
    which: string
    icon: React.ReactNode
}

export const ActorCards = () => {
    const { t } = useTranslation("creator")
    const navigate = useNavigate()
    const actorState = new ActorState(actorsData)
    
    const [actors, setActors] = useState(actorState.getActors);

    const [actorSelected, setActorSelected] = useState(actorState.getActorSelected)

    const isSmallScreen: boolean = useMediaQuery(theme.breakpoints.down('sm'));

    const goToCreator = () => {
        LocalStorage.saveCreatorChallenge(defaultChallenge(actorSelected.actor.id, t("statement.defaultDescription")!))
        navigate("/creador/editar")
    }
  
    const handleActorOnClick = (event: MouseEvent<HTMLImageElement, globalThis.MouseEvent>) => {
        actorState.restoreActorImages()
        
        if(event.target instanceof HTMLElement)
            actorState.actorChanged(event.target.id)

        setActors(actorState.getActors)

        setActorSelected(actorState.getActorSelected)
    }

    const ActorName = () =>
        <Typography className={styles['selection-textAnim']} variant="h5" component="div" color="text.primary" flexWrap="wrap" flexDirection="row" display="flex" alignItems="baseline">
            {t(`selection.cards.${actorSelected.actor.id}.name`)},&nbsp;
            <Typography gutterBottom variant="h6" textAlign="start" color="text.primary" >{t(`selection.cards.${actorSelected.actor.id}.definition`)}
            </Typography>
        </Typography>

    const ActorInfo = (props: ActorInfoProps ) =>
        <>
            <Typography className={styles['selection-textAnim']} variant="body2" color="text.primary" display="flex" alignItems="center">
                {props.icon}&nbsp;{t(`selection.${props.which}`)}
            </Typography>
            <Typography  className={styles['selection-textAnim']} marginLeft="6px" paragraph style={{textAlign:"start"}} color="text.primary">{t(`selection.cards.${actorSelected.actor.id}.${props.which}`)}</Typography>
        </>

    const ActorGoal = () =>
        <>
            <Typography className={styles['selection-textAnim']} gutterBottom variant="h5" color="text.primary" display="flex" alignItems="center">
                <EmojiEvents/>&nbsp;{t('selection.goals')}
            </Typography>
            {actorSelected.actor.goals.map(goal => (
                <Typography className={styles['selection-textAnim']} paragraph key={goal.key} color="text.primary" display="flex" justifyContent="" alignItems="center" textAlign="start">
                    <img alt={goal.key} key={goal.key} width="30px" style={{marginRight:"5px"}} src={`${baseObjectUrlImage}${actorSelected.actor.id}/${goal.object}`}></img> 
                    {t(`selection.cards.${actorSelected.actor.id}.goals.${goal.key}`)}
                </Typography>
            ))}
        </>

    const ActorCard = (item: ActorClass ) => 
        <Stack key={item.actor.id} style={{cursor: "pointer"}} >
            <CardMedia            
                component="img" id={item.actor.id} alt={item.actor.id} style={item.isSelected ? {} : {opacity: 0.7}} height={item.isSelected ? "350px":"200px"} image={item.actor.image} 
                sx={{transition: "2s", objectFit: "contain", width: "300px"}}
                onClick={handleActorOnClick} 
                />       
        </Stack>

return (
    <>
    <Stack padding="20px" margin="4px" flexDirection={isSmallScreen ? "column":"row"} 
        sx={{backgroundImage: `url("imagenes/selection/fondos/${actorSelected.actor.id}.png")`,
        transition: "background-image 2s",
        backgroundRepeat: "no-repeat", backgroundSize: "cover"}}
        display="flex" textAlign="justify" justifyContent="space-around" 
        width={isSmallScreen ? "100%" : "inherit"}
        alignItems="center">
        
        <Stack component="div" sx={{display: 'flex', justifyContent: 'center', alignItems: "center"}}>
            <Carousel height={350} width={isSmallScreen ? 300 : 700} yRadius={10} xRadius={350} >
                {actors.map(ActorCard)}
            </Carousel>
            <StyledCreatorActionButton style={{marginTop:"50px", marginBottom:"10px"}} onClick={goToCreator} startIcon={<PaintbrushIcon/>} nametag="creator"/>
            <LoadChallengeCard />
        </Stack>     
{/*
Dos cards 
        <Card sx={{ alignItems:"flex-start", backgroundColor: darken(`${actorSelected.actor.color}`, 0.2), flexDirection:"column",
                    transition: "2s",
                    zIndex:"998",
                    margin:"10px",
                    maxWidth: "300px", height:"100%", padding: theme.spacing(2), flexGrow:"inherit"}} >
            <Card sx={{backgroundColor: `${actorSelected.actor.color}`, transition: "2s"}}>
            <CardContent >
                <ActorName/>
                <ActorInfo which='interests' icon={<Interests/>}/>
                <ActorInfo which='personality' icon={<Psychology/>}/>
                <ActorInfo which='origin' icon={<Place/>}/>
                <ActorInfo which='curiousFact' icon={<FactCheck/>}/>
            </CardContent>
            </Card>            
        </Card>


        <Card sx={{ alignItems:"flex-start", backgroundColor: darken(`${actorSelected.actor.color}`, 0.2), flexDirection:"column",
                    transition: "2s",
                    zIndex:"999",
                    margin:"10px",
                    maxWidth: "250px", height:"100%", padding: theme.spacing(2), flexGrow:"inherit"}} >
            <Card sx={{backgroundColor: `${actorSelected.actor.color}`, transition: "2s"}}>
            <CardContent >
                <ActorGoal/>
            </CardContent>
            </Card>
        </Card>
*/}

        <Card sx={{ display:"flex", alignItems:"stretch", backgroundColor: darken(`${actorSelected.actor.color}`, 0.2), 
                    flexDirection: `${isSmallScreen ? 'column' : 'row'}`,
                    transition: "2s",
                    zIndex:"998",
                    margin: theme.spacing(1),
                    padding: theme.spacing(1),
                    maxWidth: "650px", height:"100%", flexGrow:"inherit"}} >
            <Card sx={{maxWidth: "300px", minWidth: "200px", margin: theme.spacing(1), backgroundColor: `${actorSelected.actor.color}`, transition: "2s"}}>
            <CardContent>
                <ActorName/>
                <ActorInfo which='interests' icon={<Interests/>}/>
                <ActorInfo which='personality' icon={<Psychology/>}/>
                <ActorInfo which='origin' icon={<Place/>}/>
                <ActorInfo which='curiousFact' icon={<FactCheck/>}/>
            </CardContent>
            </Card>            
            <Card sx={{maxWidth: "300px", minWidth: "200px", margin: theme.spacing(1), backgroundColor: `${actorSelected.actor.color}`, transition: "2s"}}>
            <CardContent >
                <ActorGoal/>
            </CardContent>
            </Card>
        </Card>

    </Stack>
</>    
)};

export const ActorSelection = () => {
	const { t } = useTranslation("creator")
	return (
        <>
            <Header CenterComponent={
                <BetaBadge smaller={true}><HeaderText text={t("selection.title")}/></BetaBadge>}/>
            <ChallengeInProgressDialog />
            <Stack className={styles['selection']}>
                <ActorCards />
            </Stack>
        </>
)};

const ChallengeInProgressDialog = () => {
	const thereIsChallengeInCreation: boolean = !!LocalStorage.getCreatorChallenge()
	const [openModal, setOpenModal] = useState(thereIsChallengeInCreation)
	const { t } = useTranslation("creator")

	const onDiscard = () => {
		setOpenModal(false)
		LocalStorage.saveCreatorChallenge(null)
	}

	return (
		<>
			<Dialog
				scroll="paper"
				maxWidth={false}
				open={openModal}
				onClose={() => setOpenModal(false)}
				data-testid="challenge-progress-warning"
			>
				<DialogContent>
					<Stack direction="column">
						{t("selection.challengeBeingCreated")}
						<b>{t("selection.discardWarning")}</b>
						<Stack sx={{ marginTop: theme.spacing(1) }} direction='row' gap={theme.spacing(1)} justifyContent='flex-end'>
							<Button variant="contained" color='error' onClick={onDiscard}>{t("selection.discard")}</Button>
							<Link to="/creador/editar">
								<Button variant="contained" color="success" >{t("selection.continueEditing")}</Button>
							</Link>
						</Stack>
					</Stack>
				</DialogContent>
			</Dialog>
		</>
	)
}

