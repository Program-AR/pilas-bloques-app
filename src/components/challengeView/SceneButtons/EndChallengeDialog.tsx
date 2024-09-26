import { Dialog, DialogContent, DialogTitle, Stack, Typography } from "@mui/material"
import { useThemeContext } from "../../../theme/ThemeContext"
import { useTranslation } from "react-i18next"
import ConfettiExplosion from 'react-confetti-explosion';
import { CloseOutlined } from '@mui/icons-material';
import { IconButtonTooltip } from "../../creator/Editor/SceneEdition/IconButtonTooltip"

interface EndDialogProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void
}

export const EndDialog = ({ showModal, setShowModal }: EndDialogProps) => {
  const { t } = useTranslation('challenge')
  const { theme } = useThemeContext()

  return <Dialog
    open={showModal}
    disableRestoreFocus
    fullWidth={true}
    maxWidth="md"
    onClose={() => setShowModal(false)}>
    <DialogTitle id="draggable-dialog" sx={{ cursor: 'auto', fontWeight: 'bold', height: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>{t('congratulationsModal.title')}
      <IconButtonTooltip onClick={() => setShowModal(false)} icon={<CloseOutlined />} tooltip={t('close')} />
    </DialogTitle>
    <DialogContent sx={{ overflow: "hidden", backgroundColor: theme.palette.background.default }}>
      <Stack alignItems="center">
        <ConfettiExplosion {...{ force: 0.8, duration: 3000, particleCount: 250, width: 1600 }} />
        <img alt="register" width="25%" src="imagenes/primer-ciclo.png"></img>
        <Stack display='flex' flexDirection='row' flexWrap='wrap' justifyContent='center' alignItems='center'>
          <Typography style={{ display: 'inline-block', fontSize: '1.1rem', fontWeight: 'bold', fontStyle: 'italic' }}>{t("congratulationsModal.subtitle")}&nbsp;</Typography>
          <Typography style={{ display: 'inline-block', fontSize: '1.1rem' }}>{t("congratulationsModal.text1")}</Typography>
        </Stack>
        <Typography style={{ fontSize: '1.1rem' }}>{t("congratulationsModal.text2")}</Typography>
      </Stack>
    </DialogContent>
  </Dialog>
}