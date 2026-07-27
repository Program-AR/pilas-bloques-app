import { Dialog, DialogContent, DialogTitle, Paper, Stack, Typography } from "@mui/material"
import { useThemeContext } from "../../../theme/ThemeContext"
import { useTranslation } from "react-i18next"
import ConfettiExplosion from 'react-confetti-explosion';
import { CheckCircle, CloseOutlined, Error, TouchAppOutlined } from '@mui/icons-material';
import { IconButtonTooltip } from "../../creator/Editor/SceneEdition/IconButtonTooltip"
import { MulangExpectationResult } from "../../blockly/mulang/mulangResults"
import { Challenge } from "../../../staticData/challenges"

interface EndDialogProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void
  challenge: Challenge
  mulangResults: MulangExpectationResult[]
  solved: boolean
}

const solutionWorksId = 'solution_works'

const groupScoreableResults = (
  mulangResults: MulangExpectationResult[],
  solved: boolean
): MulangExpectationResult[] => {
  const grouped = mulangResults
    .filter(result => result.isScoreable)
    .reduce<Record<string, MulangExpectationResult[]>>((acc, result) => {
      acc[result.id] = acc[result.id] || []
      acc[result.id].push(result)
      return acc
    }, {})

  const combined = Object.values(grouped).map(group => {
    return group.find(result => !result.result) || group[0]
  })

  return [
    {
      id: solutionWorksId,
      result: solved,
      isScoreable: true,
    },
    ...combined,
  ].sort((left, right) => Number(right.result) - Number(left.result))
}

const markdownLite = (text: string) =>
  text
    .replace(/<br\/?>/gi, '\n')
    .replace(/:point_right:/gi, '👉')
    .replace(/:repeat:/gi, '🔁')
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
    .replace(/_(.*?)_/g, '<i>$1</i>')

export const EndDialog = ({
  showModal,
  setShowModal,
  challenge,
  mulangResults,
  solved,
}: EndDialogProps) => {
  const { t } = useTranslation(['challenge', 'mulang'])
  const { theme, simpleReadModeEnabled } = useThemeContext()

  const scoreableResults = groupScoreableResults(mulangResults, solved)
  const failedScoreable = scoreableResults.filter(result => result.result === false)
  const allPassed = failedScoreable.length === 0

  const title = allPassed
    ? t('expectationsModal.scoredExpectations.allPassed.title', { ns: 'challenge' })
    : t('expectationsModal.scoredExpectations.notAllPassed.title', { ns: 'challenge' })

  const description = allPassed
    ? t('expectationsModal.scoredExpectations.allPassed.description', { ns: 'challenge' })
    : t('expectationsModal.scoredExpectations.notAllPassed.description', { ns: 'challenge' })

  const coverSrc =
    (challenge as any).imageURL() ||
    'imagenes/primer-ciclo.png'

  return <Dialog
    open={showModal}
    disableRestoreFocus
    fullWidth={true}
    maxWidth="md"
    onClose={() => setShowModal(false)}
  >
    <DialogTitle
      id="draggable-dialog"
      sx={{
        cursor: 'auto',
        fontWeight: 'bold',
        height: '50px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      {title}
      <IconButtonTooltip
        onClick={() => setShowModal(false)}
        icon={<CloseOutlined />}
        tooltip={t('close', { ns: 'challenge' })}
      />
    </DialogTitle>

    <DialogContent sx={{ overflow: "hidden", backgroundColor: theme.palette.background.default }}>
      <Stack spacing={2}>
        {allPassed && (
          <ConfettiExplosion {...{ force: 0.8, duration: 3000, particleCount: 250, width: 1600 }} />
        )}

        <Paper
          elevation={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 2,
            borderRadius: 2,
          }}
        >
          <img
            alt={(challenge as any).title || (challenge as any).titulo || 'challenge'}
            src={coverSrc}
            style={{
              width: 100,
              height: 80,
              objectFit: 'contain',
            }}
          />
          <Typography sx={{ fontSize: '1.1rem' }}>
            {description}
          </Typography>
        </Paper>

        <Stack spacing={1}>
          {scoreableResults.map((result, index) => {
            const passed = result.result === true

            let text = t(`scoreable.${result.id}`, {
              ns: 'mulang',
              context: result.result ? 'passed' : 'failed',
              defaultValue: t(`suggestions.${result.id}`, {
                ns: 'mulang',
                defaultValue: t('suggestions.check_out_this_block', { ns: 'mulang' }),
              }),
            })

            if (simpleReadModeEnabled) {
              text = text.toUpperCase()
            }

            return (
              <Stack
                key={`${result.id}-${result.declaration || 'global'}-${index}`}
                direction="row"
                alignItems="flex-start"
                spacing={1}
                sx={{
                  color: passed ? 'success.main' : 'error.main',
                  fontSize: '1rem',
                }}
              >
                {passed ? (
                  <CheckCircle fontSize="small" />
                ) : (
                  <Error fontSize="small" />
                )}

                <Typography
                  sx={{
                    fontSize: '1rem',
                    color: passed ? 'success.main' : 'error.main',
                    whiteSpace: 'pre-line',
                  }}
                  dangerouslySetInnerHTML={{ __html: markdownLite(text) }}
                />
              </Stack>
            )
          })}
        </Stack>
      </Stack>
    </DialogContent>
  </Dialog>
}