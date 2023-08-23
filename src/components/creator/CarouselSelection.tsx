import { Button, Card, CardContent, darken, lighten, Paper, Container, useMediaQuery, Box, Dialog, DialogContent, CardMedia, Stack, Typography } from "@mui/material"
import { Header } from "../header/Header"
import { useState } from "react"
import { Interests, Psychology, Place, FactCheck } from '@mui/icons-material'
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import styles from "./selection.module.css"
import UploadIcon from '../home/UploadIcon';
import { LocalStorage } from "../../localStorage"
import { CreatorCard } from "../home/CreateChallengeCard"
import { PBCard } from "../PBCard";
import { SceneType, SerializedChallenge, isValidChallenge } from "../serializedChallenge"
import { DialogSnackbar } from "../dialogSnackbar/DialogSnackbar";
import { BetaBadge } from "./BetaBadge"
import theme from "../../theme"
import { Carousel } from 'react-carousel3';

const style = {
  //width: "100%",
  //height: "100%",
  cursor: "pointer"
};

type ActorCardType = {
	name: SceneType
    color: string
    objectives: string
}

const actors: ActorCardType[] = [
	{
		name: "Lita",
        color: "#FF9C5D",
        objectives: "Reparar todos los telescopios. Observar todas las estrellas. Observar todos los planetas."
        
	},
	{
		name: "Duba",
        color: "#FED473",
        objectives: "Reparar todos los telescopios. Observar todas las estrellas. Observar todos los planetas."
    },
	{
		name: "Chuy",
        color: "#FFB4E0",
        objectives: "Reparar todos los telescopios. Observar todas las estrellas. Observar todos los planetas."
    },
	{
		name: "Manic",
        color: "#FFFBB1",
        objectives: "Reparar todos los telescopios. Observar todas las estrellas. Observar todos los planetas."
    },
	{
		name: "Capy",
        color: "#B0E092",
            objectives: "Reparar todos los telescopios. Observar todas las estrellas. Observar todos los planetas."
    },
	{
		name: "Yvoty",
        color: "#ABDEDB",
        objectives: "Reparar todos los telescopios. Observar todas las estrellas. Observar todos los planetas."
    },
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

export const ActorCards = () => {
  const { t } = useTranslation("creator")
  const [info, setInfo] = useState<ActorCardType>(actors[0])
  const isSmallScreen: boolean = useMediaQuery(theme.breakpoints.down('sm'));
  
  const ActorCard = (props: ActorCardType) => {
        const handleActor = () => {
            setInfo(props);
        }

      return(
        <Stack key={props.name} style={style} >
            {/*<img alt="" onClick={() => handleActor()} src={`imagenes/selection/${props.name}.png`}/>
            */}
            <CardMedia            
                component="img" alt={props.name} height="200px" image={`imagenes/selection/svg/${props.name}.svg`} 
                sx={{objectFit: "contain"}}
                onClick={() => handleActor()} 
                />       
        </Stack>)
    }
  
return (
    <>
    <Stack flexDirection={isSmallScreen ? "column":"row"}  
           sx={{display:"flex", textAlign:"justify", alignItems: "center", background:"var(--home-background)"}}>
    {/*
    
    // display="block" flexDirection="row" textAlign="justify">

         <Stack> 
             sx={{display: 'block',
             width: '100%',
             padding: "40px 24px",
                    justifyContent: 'center',      
                    background: "var(--home-background)"}}>
*/}

    <Stack component="div" style={{display: 'flex', justifyContent: 'center'}}>
            <Carousel height={430} width={isSmallScreen ? 300 : 700} yRadius={10} xRadius={350} autoPlay={false} >
                {actors.map(ActorCard)}
            </Carousel>
        </Stack>
        
        <PBCard sx={{ alignItems:"flex-start", backgroundColor: darken(`${info.color}`, 0.2), flexDirection:"column", 
                      maxWidth: "400px", height:"100%", padding: theme.spacing(1), flexGrow:"inherit"}} >
        <Card sx={{backgroundColor: `${info.color}`}}>
        <CardContent >
        <Typography variant="body2" color="text.secondary" >
            {t(`selection.name`)}
        </Typography>
        <Typography variant="h5" component="div" color="text.primary" flexWrap="wrap" flexDirection="row" display="flex" alignItems="baseline">
            {t(`selection.cards.${info.name}.name`)},&nbsp;
            <Typography gutterBottom variant="h6" color="text.primary" >{t(`selection.cards.${info.name}.definition`)}
            </Typography>
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {t(`selection.interests`)}
        </Typography>
        <Typography gutterBottom  color="text.primary" display="flex" alignItems="stretch" ><Interests/>&nbsp;{t(`selection.cards.${info.name}.interests`)}</Typography>
        <Typography variant="body2" color="text.secondary">
            {t(`selection.personality`)}
        </Typography>
        <Typography gutterBottom  color="text.primary" display="flex" alignItems="stretch" ><Psychology/>&nbsp;{t(`selection.cards.${info.name}.personality`)}</Typography>
        <Typography variant="body2" color="text.secondary">
            {t(`selection.origin`)}
        </Typography>
        <Typography gutterBottom  color="text.primary" display="flex" alignItems="stretch" ><Place/>&nbsp;{t(`selection.cards.${info.name}.origin`)}</Typography>
        <Typography variant="body2" color="text.secondary">
            {t(`selection.curiousFact`)}
        </Typography>
        <Typography gutterBottom color="text.primary"display="flex" alignItems="stretch" ><FactCheck/>&nbsp;{t(`selection.cards.${info.name}.curiousFact`)}</Typography>
        </CardContent>
        </Card>
        {/*
        <Paper elevation={3} sx={{ flexDirection:"column", backgroundColor:`${info.color}`, display: 'flex', 
                                   width:"100%", alignItems:"flex-start", padding: theme.spacing(0.5), margin: theme.spacing(0.5)}}> 
            <Typography sx={{margin: "3px", marginTop:"-16px"}} >{t(`selection.name`)}</Typography>
            <Typography variant="h3">{t(`selection.cards.${info.name}.name`)}</Typography>
        </Paper>
        <Paper elevation={3} sx={{ flexDirection:"column", backgroundColor:`${info.color}`, display: 'flex', 
                                   width:"100%", alignItems:"flex-start", padding: theme.spacing(0.5), margin: theme.spacing(0.5)}}> 
            <Typography sx={{margin: "3px", marginTop:"-16px"}} >{t(`selection.interests`)}</Typography>
            <Typography ><Interests/>{t(`selection.cards.${info.name}.interests`)}</Typography>
        </Paper>
        <Paper elevation={3} sx={{ flexDirection:"column", backgroundColor:`${info.color}`, display: 'flex', 
                                   width:"100%", alignItems:"flex-start", padding: theme.spacing(0.5), margin: theme.spacing(0.5)}}> 
            <Typography sx={{margin: "3px", marginTop:"-16px"}} >{t(`selection.personality`)}</Typography>
            <Typography><Psychology/>{t(`selection.cards.${info.name}.personality`)}</Typography>
        </Paper>
        <Paper elevation={3} sx={{ flexDirection:"column", backgroundColor:`${info.color}`, display: 'flex', 
                                   width:"100%", alignItems:"flex-start", padding: theme.spacing(0.5), margin: theme.spacing(0.5)}}> 
            <Typography sx={{margin: "3px", marginTop:"-16px"}} >{t(`selection.origin`)}</Typography>
            <Typography ><Place/>{t(`selection.cards.${info.name}.origin`)}</Typography>
        </Paper>
        <Paper elevation={3} sx={{ flexDirection:"column", backgroundColor:`${info.color}`, display: 'flex', 
                                   width:"100%", alignItems:"flex-start", padding: theme.spacing(0.5), margin: theme.spacing(0.5)}}> 
            <Typography sx={{margin: "3px", marginTop:"-16px"}} >{t(`selection.curiousFact`)}</Typography>
            <Typography ><FactCheck/>{t(`selection.cards.${info.name}.curiousFact`)}</Typography>
            </Paper>
*/}
        </PBCard>
        </Stack>
</>    
)};

export const ActorSelection = () => {
	const { t } = useTranslation("creator")

	return (
        <>
        <Header />
        <ChallengeInProgressDialog />
        {/*
        <Container className={styles['selection']}>
            <BetaBadge sx={{marginTop: 2}}>
                <Typography className={styles['selection-text']} variant="h4">{t("selection.title")}</Typography>
            </BetaBadge>
            <Typography className={styles['selection-text']} variant="h5">{t("selection.subtitle")}</Typography>
        */}
            <ActorCards />
        {/*
        <LoadChallengeCard />
        </Container>
        */}
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

