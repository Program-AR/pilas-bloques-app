import { Button, Container, Dialog, DialogContent, Grid, Stack, Typography } from "@mui/material"
import { Header } from "../header/Header"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import styles from "./selection.module.css"
import { HomeCard } from "../home/HomeCard"

type CharacterCardProps = {
	name: string
	color: string
}

const characters: CharacterCardProps[] = [
	{
		name: "lita",
		color: "#fc5e3e",
	},
	{
		name: "duba",
		color: "#fcaa3e",
	},
	{
		name: "chuy",
		color: "#6e3efc",
	},
	{
		name: "manic",
		color: "#3ed0fc",
	},
	{
		name: "capy",
		color: "#3efc6a",
	},
	{
		name: "yvoty",
		color: "#e33efc",
	},
]

const CharacterCard = (props: CharacterCardProps) => {
	const { t } = useTranslation("creator")
	const navigate = useNavigate()

	const goToCreator = () => {
		localStorage.setItem("PB_CREATOR_CHALLENGE", JSON.stringify({ sceneType: props.name }))
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
	const thereIsChallengeInCreation: boolean = !!localStorage.getItem("PB_CREATOR_CHALLENGE")
	const [openModal, setOpenModal] = useState(thereIsChallengeInCreation)
	const { t } = useTranslation("creator")

	const onDiscard = () => {
		setOpenModal(false)
		localStorage.removeItem("PB_CREATOR_CHALLENGE")
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