import { Button, Container, Dialog, DialogContent, Stack, Typography } from "@mui/material"
import { Header } from "../header/Header"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import styles from './selection.module.css';

export const CreatorSelection = () => {
  const { t } = useTranslation("creator")

  return (
    <>
      <Header CenterComponent={<p>{t("selection.workshop")}</p>}/>
      <ChallengeInProgressDialog />
      <Container className={styles.selection}>
        <p>Holaaa :)</p>
      </Container>
    </>
  )
}

const ChallengeInProgressDialog = () => {
  const thereIsChallengeInCreation: boolean = !!localStorage.getItem("PB_CREATOR_CHALLENGE")
  const [openModal, setOpenModal] = useState(thereIsChallengeInCreation)
  const { t } = useTranslation("creator/selection")

  const onDiscard = () => {
    setOpenModal(false)
    localStorage.removeItem("PB_CREATOR_CHALLENGE")
  }

  return (
    <>
      <Dialog
        scroll="paper"
        maxWidth={false}
        open={openModal}
        onClose={() => setOpenModal(false)}
        data-testid="challenge-progress-warning"
      >
        <DialogContent>
          <Stack direction="column">
            {t("challengeBeingCreated")}
            <br />
            <b>{t("discardWarning")}</b>
            <div>
              <Link to="/creador/editar">
                <Button>{t("continueEditing")}</Button>
              </Link>
              <Button onClick={onDiscard}>{t("discard")}</Button>
            </div>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  )
}
