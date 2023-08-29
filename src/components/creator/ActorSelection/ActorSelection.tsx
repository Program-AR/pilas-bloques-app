import { Stack } from "@mui/material"
import { Header, HeaderText } from "../../header/Header"
import { useTranslation } from "react-i18next"
import styles from "./selection.module.css"
import { BetaBadge } from "./../BetaBadge"
import { Actors } from "./Actors"
import { ChallengeInProgressDialog } from "./InProgressDialog"

export const ActorSelection = () => {
	const { t } = useTranslation("creator")
	return (
        <Stack alignItems="center" height="inherit" sx={{backgroundColor: 'var(--theme-background-secondary-color)'}}>
            <Header CenterComponent={
                <BetaBadge smaller={true}><HeaderText text={t("selection.title")}/></BetaBadge>}/>
            <ChallengeInProgressDialog />
            <Stack className={styles['selection']}>
            <Actors/>
            </Stack>
        </Stack>
)};

