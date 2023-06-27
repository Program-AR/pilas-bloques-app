import { Button, Container, Dialog, DialogContent, Grid, Stack, Typography } from "@mui/material"
import { Header } from "../header/Header"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import styles from "./selection.module.css"
import { HomeCard } from "../home/HomeCard"
import { LocalStorage } from "../../localStorage"
import { Scene, SceneType, SerializedChallenge } from "../serializedChallenge"

type CharacterCardProps = {
	name: SceneType
	color: string
}

const characters: CharacterCardProps[] = [
	{
		name: "Lita",
		color: "#fc5e3e",
	},
	{
		name: "Duba",
		color: "#fcaa3e",
	},
	{
		name: "Chuy",
		color: "#6e3efc",
	},
	{
		name: "Manic",
		color: "#3ed0fc",
	},
	{
		name: "Capy",
		color: "#3efc6a",
	},
	{
		name: "Yvoty",
		color: "#e33efc",
	},
]

const defaultScene = (type: SceneType): Scene => {
	return {
		type: type,
		maps: [[['A', '-', '-'],
		['-', '-', '-'],
		['-', '-', '-']]]
	}
}

export const defaultChallenge = (type: SceneType): SerializedChallenge => {
	return {
		fileVersion: 1,
		title: "",
		statement: {
			description: ""
		},
		scene: defaultScene(type),
		toolbox: {
			blocks: []
		}
	}
}

const CharacterCard = (props: CharacterCardProps) => {
	const { t } = useTranslation("creator")
	const navigate = useNavigate()

	const goToCreator = () => {
		LocalStorage.saveCreatorChallenge(defaultChallenge(props.name))
		navigate("/creador/editar")
	}

	return (
		<Button
			key={props.name} //Needed to prevent react warning
			component="label"
			style={{ margin: "3rem", textTransform: "none" }}
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
				<Typography variant="h4">{t("selection.title")}</Typography>
				<Typography variant="h5">{t("selection.subtitle")}</Typography>

				<CharacterCards />
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
						<br />
						<b>{t("selection.discardWarning")}</b>
						<div>
							<Link to="/creador/editar">
								<Button>{t("selection.continueEditing")}</Button>
							</Link>
							<Button onClick={onDiscard}>{t("selection.discard")}</Button>
						</div>
					</Stack>
				</DialogContent>
			</Dialog>
		</>
	)
}
