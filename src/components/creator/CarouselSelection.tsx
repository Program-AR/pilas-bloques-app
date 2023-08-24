import { Button, Card, CardContent, darken, useMediaQuery, Dialog, DialogContent, CardMedia, Stack, Typography } from "@mui/material"
import { Header } from "../header/Header"
import { MouseEvent, useState } from "react"
import { Interests, Psychology, Place, FactCheck, EmojiEvents } from '@mui/icons-material'
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import styles from "./selection.module.css"
import UploadIcon from '../home/UploadIcon';
import { LocalStorage } from "../../localStorage"
import { MiniCreatorCard, CreatorCard } from "../home/CreateChallengeCard"
import { SceneType, SerializedChallenge, isValidChallenge, defaultChallenge } from "../serializedChallenge"
import { DialogSnackbar } from "../dialogSnackbar/DialogSnackbar";
import { BetaBadge } from "./BetaBadge"
import PaintbrushIcon from "../home/PaintBrushIcon";
import theme from "../../theme"
import { Carousel } from 'react-carousel3';

const baseUrlImage = 'imagenes/selection/'
const baseObjectUrlImage = 'imagenes/sceneImages/'

type ObjectiveDataType = {
    key: string
    object: string
}

type ActorDataType = {
	name: SceneType
    color: string
    objectives: ObjectiveDataType[]
}

const actorsData: ActorDataType[] = [
	{
		name: "Lita",
        color: "#FF9C5D",
        objectives: [ 
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
        objectives: [ 
            { key: "steak",
              object: "P.png"
            }
        ]
    },
	{
		name: "Chuy",
        color: "#FFB4E0",
        objectives: [ 
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
        objectives: [ 
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
        objectives: [ 
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
        objectives: [ 
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
		<Button
			key="loadChallenge" //Needed to prevent react warning
			component="label"
			style={{ margin: "0.5rem", textTransform: "none" }}>
			<CreatorCard text={t("selection.loadChallenge")} color={"#ffffff"} icon={UploadIcon}/>

        	<input data-testid="import-input" hidden accept=".dpbq" type="file" onChange={readFile}/>
			<DialogSnackbar 
            open={snackbarOpen}
            onClose={() => setSnackbarOpen(false)} 
            message={t('selection.importError')}/>

		</Button>
	)
}

type ActorType = {
	id: SceneType
    image: string
    color: string
    objectives: ObjectiveDataType[]
}

class ActorClass {
    isSelected: boolean
    actor: ActorType

    constructor(id: SceneType, isSelected: boolean, image: string, color: string, objectives: ObjectiveDataType[]) {
        this.isSelected = isSelected
        this.actor = { id, image, color, objectives }
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
            actors.color, actors.objectives))
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

type CharacteristicActorProps = {
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

    const NameActor = () =>
        <Typography variant="h5" component="div" color="text.primary" flexWrap="wrap" flexDirection="row" display="flex" alignItems="baseline">
            {t(`selection.cards.${actorSelected.actor.id}.name`)},&nbsp;
            <Typography gutterBottom variant="h6" color="text.primary" >{t(`selection.cards.${actorSelected.actor.id}.definition`)}
            </Typography>
        </Typography>

    const CharacteristicActor = (props: CharacteristicActorProps ) =>
        <>
            <Typography variant="body2" color="text.secondary" display="flex" alignItems="center">
                {props.icon}&nbsp;{t(`selection.${props.which}`)}
            </Typography>
            <Typography marginLeft="6px" paragraph style={{textAlign:"start"}} color="text.primary">{t(`selection.cards.${actorSelected.actor.id}.${props.which}`)}</Typography>
        </>

    const ObjectiveActor = () =>
        <>
            <Typography variant="body2" color="text.secondary" display="flex" alignItems="center">
                <EmojiEvents/>&nbsp;{t('selection.objectives')}
            </Typography>
            {actorSelected.actor.objectives.map(objective => (
                <Typography marginLeft="6px" color="text.primary" display="flex" alignItems="center" style={{textAlign:"start"}}>
                    <img alt={objective.key} width="30px" src={`${baseObjectUrlImage}${actorSelected.actor.id}/${objective.object}`}></img> 
                    &nbsp;{t(`selection.cards.${actorSelected.actor.id}.objectives.${objective.key}`)}
                </Typography>
            ))}
        </>

    const ActorCard = (item: ActorClass ) => {
        console.log(item)
        return (<Stack key={item.actor.id} style={{cursor: "pointer"}} >
            <CardMedia            
                component="img" id={item.actor.id} alt={item.actor.id} style={item.isSelected ? {} : {opacity: 0.5}} height={item.isSelected ? "350px":"200px"} image={item.actor.image} 
                sx={{objectFit: "contain"}}
                onClick={handleActorOnClick} 
                />       
        </Stack>)
    }
return (
    <>
    <Stack margin="20px" flexDirection={isSmallScreen ? "column":"row"} 
         display="flex" textAlign="justify" justifyContent="space-around" alignItems={isSmallScreen ? "center" : "flex-start"}>
        <Stack component="div" sx={{display: 'flex', justifyContent: 'center', alignItems: "center"}}>
            <Carousel height={360} width={isSmallScreen ? 300 : 700} yRadius={10} xRadius={350} >
                {actors.map(ActorCard)}
            </Carousel>
            <Button
                key="goToCreator" //Needed to prevent react warning
                component="label"
                onClick={goToCreator}>
                <MiniCreatorCard visibleBadge={true} 
                    text={t("selection.creator")} color="#ffffff" icon={PaintbrushIcon}/>
            </Button>
        </Stack>
        
        <Card sx={{ alignItems:"flex-start", backgroundColor: darken(`${actorSelected.actor.color}`, 0.2), flexDirection:"column", 
                      maxWidth: "370px", height:"100%", padding: theme.spacing(1), flexGrow:"inherit"}} >
            <Card sx={{backgroundColor: `${actorSelected.actor.color}`}}>
            <CardContent >
                <NameActor/>
                <CharacteristicActor which='interests' icon={<Interests/>}/>
                <CharacteristicActor which='personality' icon={<Psychology/>}/>
                <CharacteristicActor which='origin' icon={<Place/>}/>
                <CharacteristicActor which='curiousFact' icon={<FactCheck/>}/>
                <ObjectiveActor/>
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
        <Header />
        <ChallengeInProgressDialog />
        
        <Stack className={styles['selection']}>
        
            <BetaBadge sx={{marginTop: 2}}>
                <Typography className={styles['selection-text']} variant="h4">{t("selection.title")}</Typography>
            </BetaBadge>
            <Typography className={styles['selection-text']} variant="h5">{t("selection.subtitle")}</Typography>
        
            <ActorCards />
            <LoadChallengeCard />
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

