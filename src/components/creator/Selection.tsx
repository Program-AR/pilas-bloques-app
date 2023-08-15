import { Button, Container, Dialog, DialogContent, Grid, Stack, Typography } from "@mui/material"
import { Header } from "../header/Header"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import styles from "./selection.module.css"
import { HomeCard } from "../home/HomeCard"
import { LocalStorage } from "../../localStorage"
import { SceneType, defaultChallenge } from "../serializedChallenge"
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

