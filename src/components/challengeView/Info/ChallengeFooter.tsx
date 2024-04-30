import { Button, Dialog, DialogContent, DialogTitle, IconButton, Stack } from "@mui/material"
import { PBCard } from "../../PBCard"
import { PBLink, Version } from "../../footer/Footer"
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';
import CloseIcon from '@mui/icons-material/Close';
import styles from "./challengeFooter.module.css"
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { PBMailLink } from "../../users/userForm";

type ChallengeFooterProps = {
    isVertical?: boolean
}

export const ChallengeFooter = ({ isVertical = false}: ChallengeFooterProps) => {

    const { t } = useTranslation("footer")
    const [openModal, setOpenModal] = useState(false);

    const stackDirection = isVertical ? 'column' : 'row'
    const shortText = isVertical ? 'Short' : ''
    const PROGRAMAR_LINK = 'https://program.ar/'
    const stackGap = isVertical ? 1 : 2

    return <>
        <BugReportModal open={openModal} handleOnClose={() => setOpenModal(false)} />
        <PBCard className={styles.card} sx={isVertical ? {height: '30vh'} : {}}>
            <Stack  direction={stackDirection} className={styles.footer} gap={1}>
                <Stack direction={stackDirection} gap={stackGap} >
                    <a href={PROGRAMAR_LINK} target='_blank' style={{ display: 'flex', alignSelf:'center' }}>
                        <img src="imagenes/programar-short.png" className={styles.image} alt="logos" />
                    </a>
                    <Version />
                </Stack>
                <Stack direction={stackDirection} gap={stackGap}>
                    <Button
                        className={styles.button}
                        size="small"
                        startIcon={<HelpIcon />}
                        onClick={() => { setOpenModal(true) }}><b>{t(`problemWithChallenge${shortText}`)}</b></Button>
                    <Button
                        className={styles.button}
                        size="small"
                        startIcon={<InfoIcon />}
                        onClick={() => window.open('#/acercade', '_blank')}><b>{t(`about`)}</b></Button>
                </Stack>
            </Stack>
        </PBCard>
    </>
}

type BugReportModalProps = {
    open: boolean,
    handleOnClose: () => void
}

const BugReportModal = ({ open, handleOnClose }: BugReportModalProps) => {

    const { t } = useTranslation("footer")

    const ISSUE_TRACKER = "https://github.com/Program-AR/pilas-bloques-app/issues"

    return <Dialog
        open={open}
        className={styles.dialog}
        maxWidth='md'
        onClose={handleOnClose}>
        <DialogTitle className={styles['dialog-header']}>
            <b>{t("bugReportModal.problem")}</b>
            <IconButton onClick={handleOnClose}>
                <CloseIcon />
            </IconButton></DialogTitle>
        <DialogContent>
            <p>{t("bugReportModal.error")}</p>
            <p>{t("bugReportModal.askTeacher")}</p>
            <p>{t("bugReportModal.mail")}<PBMailLink /></p>
            <p>{t("bugReportModal.githubReport")} <PBLink to={ISSUE_TRACKER}>{t("bugReportModal.issueTracker")}.</PBLink></p>
        </DialogContent>
    </Dialog>
}