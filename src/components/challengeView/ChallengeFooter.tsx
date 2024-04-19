import { Button, Dialog, DialogContent, DialogTitle, IconButton, Stack } from "@mui/material"
import { PBCard } from "../PBCard"
import { Link, useNavigate } from "react-router-dom"
import { PBLink, Version } from "../footer/Footer"
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';
import CloseIcon from '@mui/icons-material/Close';
import styles from "./challengeFooter.module.css"
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { PBMailLink } from "../users/userForm";

export const ChallengeFooter = () => {

    const { t } = useTranslation("footer")
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(false);

    const PROGRAMAR_LINK = 'https://program.ar/'

    return <>
        <BugReportModal open={openModal} handleOnClose={() => setOpenModal(false)} />
        <PBCard className={styles.card}>
            <Stack direction={'row'} className={styles.footer}>
                <Stack direction={'row'} gap={2} >
                    <Link to={PROGRAMAR_LINK} style={{ display: 'flex' }}>
                        <img src="imagenes/programar-short.png" className={styles.image} alt="logos" />
                    </Link>
                    <Version />
                </Stack>
                <Stack direction={'row'} gap={2}>
                    <Button
                        className={styles.button}
                        size="small"
                        startIcon={<HelpIcon />}
                        onClick={() => { setOpenModal(true) }}><b>{t("problemWithChallenge")}</b></Button>
                    <Button
                        className={styles.button}
                        size="small"
                        startIcon={<InfoIcon />}
                        onClick={() => navigate('/acercade')}><b>{t("about")}</b></Button>
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