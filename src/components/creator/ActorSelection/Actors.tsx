import { Card, CardContent, darken, useMediaQuery, CardMedia, Stack, Typography } from "@mui/material"
import React, { MouseEvent, useState } from "react"
import { Interests, Psychology, Place, FactCheck, SportsScore } from '@mui/icons-material'
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import styles from "./selection.module.css"
import { LocalStorage } from "../../../localStorage"
import { SceneType, defaultChallenge } from "../../serializedChallenge"
import PaintbrushIcon from "../../home/PaintBrushIcon";
import theme from "../../../theme"
import { Carousel } from 'react-carousel3';
import { StyledCreatorActionButton } from "./../Editor/ActionButtons/CreatorActionButton"
import { LoadChallengeButton } from "./LoadChallenge"

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

type ActorCommonCardProps = {
    color: string
    isSmallScreen: boolean
    children: React.ReactNode
}

type ActorInfoProps = {
    which: string
    icon: React.ReactNode
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

const ActorContentCard = (props: ActorCommonCardProps) => 
    <Card sx={{ display:"flex", alignItems:"stretch", backgroundColor: darken(`${props.color}`, 0.2), 
                flexDirection: `${props.isSmallScreen ? 'column' : 'row'}`,
                transition: "2s",
                zIndex:"998",
                width: `${props.isSmallScreen ? 'auto' : '600px'}`,
                height: `${props.isSmallScreen ? 'inherit' : '100%'}`,
                flexGrow:"inherit"}} >
        {props.children}
    </Card>


const ActorSubContentCard = (props: ActorCommonCardProps) => 
    <Card sx={{ minWidth: "200px", 
                width: `${props.isSmallScreen ? 'auto' : '300px'}`,
                margin: theme.spacing(1), backgroundColor: `${props.color}`, transition: "2s"}}
          >
        <CardContent>
            {props.children}
        </CardContent>
    </Card>


export const Actors = () => {
    const { t } = useTranslation("creator")
    const navigate = useNavigate()
    const actorState = new ActorState(actorsData)
    
    const [actors, setActors] = useState(actorState.getActors);

    const [actorSelected, setActorSelected] = useState(actorState.getActorSelected)

    const isSmallScreen: boolean = useMediaQuery(theme.breakpoints.down('md'));

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
        <Typography className={styles['selection-text-info']} color="text.primary" variant="h5" component="div" flexWrap="wrap" flexDirection="row" alignItems="baseline">
            {t(`selection.cards.${actorSelected.actor.id}.name`)},&nbsp;
            <Typography gutterBottom variant="h6" textAlign="start" color="text.primary" >{t(`selection.cards.${actorSelected.actor.id}.definition`)}
            </Typography>
        </Typography>

    const ActorInfo = (props: ActorInfoProps ) =>
        <>
            <Typography className={styles['selection-text-info']} color="text.primary" variant="body2">
                {props.icon}&nbsp;{t(`selection.${props.which}`)}
            </Typography>
            <Typography className={styles['selection-text-info']} color="text.primary" marginLeft="6px" paragraph textAlign="start">
                {t(`selection.cards.${actorSelected.actor.id}.${props.which}`)}
            </Typography>
        </>

    const ActorGoal = () =>
        <>
            <Typography className={styles['selection-text-info']} gutterBottom color="text.primary" variant="h5">
                <SportsScore/>&nbsp;{t('selection.goals')}
            </Typography>
            {actorSelected.actor.goals.map(goal => (
                <Typography className={styles['selection-text-info']} paragraph key={goal.key} color="text.primary" textAlign="start">
                    <img alt={goal.key} key={goal.key} width="30px" style={{marginRight:"5px"}} src={`${baseObjectUrlImage}${actorSelected.actor.id}/${goal.object}`}></img> 
                    {t(`selection.cards.${actorSelected.actor.id}.goals.${goal.key}`)}
                </Typography>
            ))}
        </>

    const ActorImage = (item: ActorClass ) => 
        <Stack key={item.actor.id} style={{cursor: "pointer"}} >
            <CardMedia            
                component="img" id={item.actor.id} alt={item.actor.id} 
                style={item.isSelected ? {} : {opacity: 0.6}} 
                height={item.isSelected ? "350px" : "200px"} 
                image={item.actor.image} 
                sx={{transition: "2s", objectFit: "contain", width: "300px"}}
                onClick={handleActorOnClick} 
                />       
        </Stack>

    const GoToCreatorButton = () =>
        <StyledCreatorActionButton style={{marginTop:"45px", 
                        marginBottom:"10px"}} 
                        onClick={goToCreator} 
                        startIcon={<PaintbrushIcon/>} nametag="creator"/>

    const ActorInfoCard = () => 
        <ActorContentCard isSmallScreen={isSmallScreen} 
                          color={actorSelected.actor.color}>
            <ActorSubContentCard isSmallScreen={isSmallScreen} color={actorSelected.actor.color}>
                <ActorName/>
                <ActorInfo which='interests' icon={<Interests/>}/>
                <ActorInfo which='personality' icon={<Psychology/>}/>
                <ActorInfo which='origin' icon={<Place/>}/>
                <ActorInfo which='curiousFact' icon={<FactCheck/>}/>
            </ActorSubContentCard>            
            <ActorSubContentCard isSmallScreen={isSmallScreen} color={actorSelected.actor.color}>
                <ActorGoal/>
            </ActorSubContentCard>
        </ActorContentCard>

return (
    <Stack className={styles["selection-background"]}
        flexDirection={isSmallScreen ? "column":"row"}
        height={isSmallScreen ? "100%": "600px"} 
        width={isSmallScreen ? "100%" : "inherit"} >
        <Stack component="div" 
            className={styles["selection-background-actors"]}
            style={isSmallScreen ? {width: "100%"} : {}}
            sx={{backgroundImage: `url("${baseUrlImage}fondos/${actorSelected.actor.id}.svg")`}}>
            <Carousel height={350} width={isSmallScreen ? 300 : 700} yRadius={10} xRadius={300} >
                {actors.map(ActorImage)}
            </Carousel>
            <GoToCreatorButton/>        
            <LoadChallengeButton />
        </Stack>     
        <ActorInfoCard/>
    </Stack>
    )
}

