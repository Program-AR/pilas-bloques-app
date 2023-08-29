import { Stack, useMediaQuery } from "@mui/material"
import { Header, HeaderText } from "../../header/Header"
import { useTranslation } from "react-i18next"
import styles from "./selection.module.css"
import { BetaBadge } from "./../BetaBadge"
import { Actors } from "./Actors"
import theme from "../../../theme"
import { ChallengeInProgressDialog } from "./InProgressDialog"

export const ActorSelection = () => {
	const { t } = useTranslation("creator")
    const isSmallScreen: boolean = useMediaQuery(theme.breakpoints.down('sm'));

	return (
        <Stack alignItems="center" height="inherit" sx={{backgroundColor: 'var(--theme-background-secondary-color)'}}>
            <Header CenterComponent={
                <BetaBadge smaller={true}><HeaderText text={t("selection.title")}/></BetaBadge>}/>
            <ChallengeInProgressDialog />
            <Stack className={styles['selection']}
                   style={isSmallScreen ? {} : {height: "100%"}}>
            <Actors/>
            </Stack>
        </Stack>
)};

