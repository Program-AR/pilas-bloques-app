import { Stack, Typography } from "@mui/material"
import { Link } from "react-router-dom";
import { CreatorCard } from "./CreateChallengeCard"
import { ImportChallengeCard } from "./ImportChallengeCard"
import styles from "./home.module.css"
import { useTranslation } from "react-i18next"
import PaintbrushIcon from "./PaintBrushIcon";

const CreateChallengeCard = () => {
    const {t} = useTranslation("home")

	return (
		<Link to="creador/seleccionar" style={{ textDecoration: 'none' }}>
        	<CreatorCard visibleBadge={true} text={t("cards.creator")} color="#ffffff" icon={PaintbrushIcon} />
    	</Link>
	)
}

export const CreatorCards = () => {
	const {t} = useTranslation("home")
	
	return <>
			<Typography className={styles.title} variant="h5">{t("creatorTitle")}</Typography>
			<Stack direction="row" className={styles["home-container"]}>
				<CreateChallengeCard />
				<ImportChallengeCard />
			</Stack>
		</>
}


