import { Button, Container, Dialog, DialogContent, Grid, Stack, Typography } from "@mui/material"
import { Header } from "../header/Header"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import styles from "./selection.module.css"
import { HomeCard } from "../home/HomeCard"
import { LocalStorage } from "../../localStorage"
import { SceneType, SerializedChallenge, isValidChallenge, defaultChallenge } from "../serializedChallenge"
import { DialogSnackbar } from "../dialogSnackbar/DialogSnackbar";
import theme from "../../theme"
import { BetaBadge } from "./BetaBadge"

type CharacterCardProps = {
	name: SceneType
	color: string
}

const characters: CharacterCardProps[] = [
	{
		name: "Lita",
		color: "#FF9C5D",
	},
	{
		name: "Duba",
		color: "#FED473",
	},
	{
		name: "Chuy",
		color: "#FFB4E0",
	},
	{
		name: "Manic",
		color: "#FFFBB1",
	},
	{
		name: "Capy",
		color: "#B0E092",
	},
	{
		name: "Yvoty",
		color: "#ABDEDB",
	},
]

const CharacterCard = (props: CharacterCardProps) => {
	const { t } = useTranslation("creator")
	const navigate = useNavigate()

	const goToCreator = () => {
		LocalStorage.saveCreatorChallenge(defaultChallenge(props.name, t("statement.defaultDescription")!))
		navigate("/creador/editar")
	}

	return (
		<Button
			key={props.name} //Needed to prevent react warning
			component="label"
			style={{ margin: "0.5rem", textTransform: "none" }}
			onClick={goToCreator}
		>
			<HomeCard
				text={t(`selection.cards.${props.name}`)}
				image={`selection/${props.name}.png`}
				color={props.color}
			/>
		</Button>
	)
}

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
			style={{ margin: "0.5rem", textTransform: "none" }}
		>
			<HomeCard
				text={t(`selection.loadChallenge`)}
				image="load-challenge.png"
				color="#cc7024"
			/>
        	<input data-testid="import-input" hidden accept=".dpbq" type="file" onChange={readFile}/>
			<DialogSnackbar 
            open={snackbarOpen}
            onClose={() => setSnackbarOpen(false)} 
            message={t('selection.importError')}/>

		</Button>
	)
}

const CharacterCards = () => {
	return (
		<Grid>
			{characters.map(CharacterCard)}
		</Grid>
	)
}

export const CreatorSelection = () => {
	const { t } = useTranslation("creator")

	return (
		<>
			<Header />
			<ChallengeInProgressDialog />
			<Container className={styles.selection} maxWidth={"xl"}>
				<BetaBadge sx={{marginTop: 2}}>
					<Typography variant="h4">{t("selection.title")}</Typography>
				</BetaBadge>
				<Typography variant="h5">{t("selection.subtitle")}</Typography>

				<CharacterCards />
				<LoadChallengeCard />
			</Container>
		</>
	)
}

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
export { defaultChallenge }

