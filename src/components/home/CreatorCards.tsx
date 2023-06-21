import { Stack } from "@mui/material"
import { LinkCard } from "./HomeCard"
import { ImportChallengeCard } from "./ImportChallengeCard"
import styles from "./home.module.css"
import { useTranslation } from "react-i18next"

const CreateChallengeCard = () => {
    const {t} = useTranslation("home")

	return (
		<LinkCard url="creador/seleccionar" text={t("cards.creator")} color="#ec3efc" image={"placeholder.png"} />
	)
}

export const CreatorCards = () => {
	const shouldShow = process.env.NODE_ENV !== 'production'
	
	return shouldShow ? (
	<Stack direction="row" className={styles["home-container"]}>
		<CreateChallengeCard />
		<ImportChallengeCard />
	</Stack>)
	:
	<></>
	
}


