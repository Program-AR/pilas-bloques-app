import { Stack } from "@mui/material"
import { LinkCardCreator } from "./CreateChallengeCard"
import { ImportChallengeCard } from "./ImportChallengeCard"
import styles from "./home.module.css"
import { useTranslation } from "react-i18next"

const CreateChallengeCard = () => {
    const {t} = useTranslation("home")

	return (
		<LinkCardCreator url="creador/seleccionar" text={t("cards.creator")} color="#ffffff" image={"paintbrush-solid.svg"}/>
		
	)
}

export const CreatorCards = () => {
	const shouldShow = process.env.NODE_ENV != 'production'
	
	return shouldShow ? (
	<Stack direction="row" className={styles["home-container"]}>
		<CreateChallengeCard />
		<ImportChallengeCard />
	</Stack>)
	:
	<></>
	
}


