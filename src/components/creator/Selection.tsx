import { Button, Dialog, DialogContent, Stack, Typography } from "@mui/material"
import { Header } from "../header/Header"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import Placeholder from "../../assets/placeholder.png"

export const CreatorSelection = () => {
  return (
    <>
      <Header />
      <ChallengeInProgressDialog />
      <img alt={"neco"} src={`.${Placeholder}`} />
    </>
  )
}

const ChallengeInProgressDialog = () => {
  const thereIsChallengeInCreation: boolean = !!localStorage.getItem("PB_CREATOR_CHALLENGE")
  const [openModal, setOpenModal] = useState(thereIsChallengeInCreation)
  const { t } = useTranslation("creator")

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
            {t("selection.challengeBeingCreated")}
            <br />
            <b>{t("selection.discardWarning")}</b>
            <div>
              <Link to="/creador/editar">
                <Button>{t("selection.continueEditing")}</Button>
              </Link>
              <Button onClick={onDiscard}>{t("selection.discard")}</Button>
            </div>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  )
}
