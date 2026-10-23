import { Button, Stack, Typography } from "@mui/material"
import ContentCutIcon from '@mui/icons-material/ContentCut';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useTranslation } from "react-i18next"
import styles from './pbdCards.module.css';

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdD8c1rYbFu4rm0ENgCwZaVafpSzHUa9_1f6Ok1gVr7zxrIzg/viewform"

type PBDCardProps = {
	url: string,
	title: string,
	subtitle: string,
	image: string,
	color: string
}

const PBDCard = ({ url, title, subtitle, image, color }: PBDCardProps) => {
	const { t } = useTranslation("pbd")

	return (
		<div className={styles['pbd-card']}>
			<div className={styles['pbd-card-image']} style={{ borderColor: color }}>
				<img
					src={`imagenes/pbd/${image}`}
					alt={`${title} ${subtitle}`}
					onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
				/>
			</div>
			<Typography className={styles['pbd-card-title']} style={{ color }}>{title}</Typography>
			<Typography className={styles['pbd-card-subtitle']} style={{ color }}>{subtitle}</Typography>
			<Button
				className={styles['pbd-card-button']}
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				variant="contained"
				disableElevation
				style={{ backgroundColor: color }}
			>
				{t("download")}
			</Button>
		</div>
	)
}

const FormBanner = () => {
	const { t } = useTranslation("pbd")

	return (
		<div className={styles['pbd-banner']}>
			<div>
				<Typography className={styles['pbd-banner-text']}>{t("form.question")}</Typography>
				<Typography className={styles['pbd-banner-text']}>{t("form.help")}</Typography>
			</div>
			<Button
				className={styles['pbd-banner-button']}
				href={FORM_URL}
				target="_blank"
				rel="noopener noreferrer"
				variant="contained"
				disableElevation
				startIcon={<FavoriteBorderIcon />}
			>
				{t("form.button")}
			</Button>
		</div>
	)
}

export const PBDCards = () => {
	const { t } = useTranslation("pbd")

	return (
		<section className={styles['pbd-section']}>
			<Typography component="h2" className={styles['pbd-title']}>
				<ContentCutIcon className={styles['pbd-title-icon']} />
				<span className={styles['pbd-title-text']}>{t("title")}</span>
			</Typography>

			<Stack direction='row' className={styles['pbd-cards']}>
				<PBDCard
					url="https://drive.google.com/file/d/1oSrfMRJeAIDLi-Znj6yvXeuL-lIl6W1f/view?usp=sharing"
					title={t("game.title")}
					subtitle={t("game.subtitle")}
					image="dorsos_cartas_1.png"
					color="#0f9b45"
				/>
				<PBDCard
					url="https://drive.google.com/file/d/1yJ5QGkaZD3CuhssSORCg-lLjMPP2nrjz/view?usp=sharing"
					title={t("instructions.title")}
					subtitle={t("instructions.subtitle")}
					image="dorsos_cartas_2.png"
					color="#e8681e"
				/>
				<PBDCard
					url="https://drive.google.com/file/d/18X0oVrWb9cw0pZiSFXHVGEFwXZKkqE0G/view?usp=sharing"
					title={t("teacher.title")}
					subtitle={t("teacher.subtitle")}
					image="dorsos_cartas_3.png"
					color="#c8202f"
				/>
			</Stack>

			<FormBanner />
		</section>
	)
}
