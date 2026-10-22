/**
 * Pilas Bloques Desenchufado (PBD) - FIX TEMPORAL.
 *
 * Todo lo de PBD vive en esta carpeta (src/components/pbd) + locales/<lng>/pbd.json.
 * Para borrarlo:
 *   1. Borrar src/components/pbd/
 *   2. Borrar locales/{es-ar,en-us,pt-br}/pbd.json
 *   3. Quitar el import y la ruta PBD_PATH en src/App.tsx
 *   4. Quitar el import y <PBDHomeButton/> en src/components/home/Home.tsx
 */
import { Header, HeaderText } from "../header/Header";
import { Footer } from "../footer/Footer";
import { useTranslation } from "react-i18next";
import { PBDCards } from "./PBDCards";
import styles from './pbdCards.module.css';

export const PBD_PATH = "/pilas-bloques-desenchufado"

export const PBDView = () => {
	const { t } = useTranslation("pbd")

	return <>
		<Header CenterComponent={<HeaderText text={t("header")} />} />
		<main className={styles['pbd-page']}>
			<PBDCards />
		</main>
		<Footer />
	</>
}
