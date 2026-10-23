// FIX TEMPORAL PBD - ver instrucciones de borrado en PBDView.tsx
import { Button } from "@mui/material";
import ContentCutIcon from '@mui/icons-material/ContentCut';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PBD_PATH } from "./PBDView";
import styles from './pbdCards.module.css';

export const PBDHomeButton = () => {
	const { t } = useTranslation("pbd")

	return <div className={styles['pbd-home-button-container']}>
		<Button
			component={Link}
			to={PBD_PATH}
			variant="contained"
			size="large"
			disableElevation
			className={styles['pbd-home-button']}
			startIcon={<ContentCutIcon />}
		>
			{t("homeButton")}
		</Button>
	</div>
}
