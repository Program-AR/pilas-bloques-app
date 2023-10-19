import { Stack } from "@mui/material"
import { LinkCard } from "./HomeCard"
import { useTranslation } from "react-i18next"
import styles from './home.module.css';

const shouldShow = process.env.NODE_ENV !== 'production'

const InitialBookCard = () => {
	const {t} = useTranslation("home")
	return <LinkCard url="/libros/1" text={t("cards.initial")} color="#FCE43E" image={"toto-initial-level.svg"} />
}

const IntermediateBookCard = () => {
	const {t} = useTranslation("home")
	return <LinkCard url="/libros/2" text={t("cards.intermediate")} color="#53BF24" image={"toto-intermediate-level.svg"} />
}

const AdvancedBookCard = () => {
	const {t} = useTranslation("home")
	return <LinkCard url="/libros/3" text={t("cards.advanced")} color="#32CFC1" image={"toto-advanced-level.svg"} />
}

const NewChallengesBookCard = () => {
	const {t} = useTranslation("home")
	return <LinkCard url="/libros/1000" text={t("cards.newChallenges")} color="#C469FF" image={"new-challenges-level.png"} />
}

export const BookCards = () => (
	<Stack direction='row' className={styles['home-container']}>
		<InitialBookCard />
		<IntermediateBookCard />
		<AdvancedBookCard />
		{shouldShow ? <NewChallengesBookCard />:<></>}
	</Stack>
)
