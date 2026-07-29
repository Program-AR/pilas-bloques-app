import { Dialog, DialogContent, DialogTitle, Paper, Stack, Typography } from "@mui/material"
import { useThemeContext } from "../../../theme/ThemeContext"
import { useTranslation } from "react-i18next"
import ConfettiExplosion from 'react-confetti-explosion';
import { Repeat, CheckCircle, CloseOutlined, Error, ArrowForward } from '@mui/icons-material';
import { IconButtonTooltip } from "../../creator/Editor/SceneEdition/IconButtonTooltip"
import { MulangExpectationResult } from "../../blockly/mulang/mulangResults"
import { Challenge } from "../../../staticData/challenges"
import { ReactNode } from "react";

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

const renderMarkdownLite = (text: string): ReactNode[] => {
  const normalizedText = text.replace(/<br\s*\/?>/gi, '\n')

  const parts = normalizedText.split(/(:point_right:|:repeat:|\*\*.*?\*\*|_.*?_|\n)/gi)

  return parts.map((part, index) => {
    if (!part) {
      return null
    }

    const normalizedPart = part.toLowerCase()

    if (normalizedPart === ':point_right:') {
      return (
        <ArrowForward key={index} aria-label="Sugerencia" fontSize="inherit" sx={{ display: 'inline-block', verticalAlign: 'middle', mx: 0.4 }} />
      )
    }

    if (normalizedPart === ':repeat:') {
      return (
        <Repeat key={index} aria-label="Repetición" fontSize="inherit" sx={{ display: 'inline-block', verticalAlign: 'middle', mx: 0.4 }} />
      )
    }

    if (part === '\n') {
      return <br key={index} />
    }

    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index}>
          {part.slice(2, -2)}
        </strong>
      )
    }

    if (part.startsWith('_') && part.endsWith('_')) {
      return (
        <em key={index}>
          {part.slice(1, -1)}
        </em>
      )
    }

    return <span key={index}>{part}</span>
  })
}

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
    scroll="paper"
    onClose={() => setShowModal(false)}
  >
    <DialogTitle
      id="draggable-dialog"
      sx={{
        cursor: 'auto',
        fontWeight: 'bold',
        minHeight: '50px',
        py: 2,
        px: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Typography component="span" sx={{ fontSize: '1.25rem', fontWeight: 'bold', lineHeight: 1.25}}>
        {title}
      </Typography>
      <IconButtonTooltip
        onClick={() => setShowModal(false)}
        icon={<CloseOutlined />}
        tooltip={t('close', { ns: 'challenge' })}
      />
    </DialogTitle>

    <DialogContent sx={{ overflowY: "auto", maxHeight: "70vh", backgroundColor: theme.palette.background.default }}>
      <Stack spacing={2}>
        {allPassed && (
          <ConfettiExplosion {...{ force: 0.8, duration: 3000, particleCount: 250, width: 1600 }} />
        )}
        <Paper elevation={2} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: 2 }}>
          <img
            alt={(challenge as any).title || (challenge as any).titulo || 'challenge'}
            src={coverSrc}
            style={{ width: 100, height: 80, objectFit: 'contain' }}
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
                sx={{ color: passed ? 'success.main' : 'error.main', fontSize: '1rem' }}
              >
                {passed ? (
                  <CheckCircle fontSize="small" />
                ) : (
                  <Error fontSize="small" />
                )}

                <Typography component="div" sx={{ fontSize: '1rem', color: passed ? 'success.main' : 'error.main', lineHeight: 1.5 }}>
                  {renderMarkdownLite(text)}
                </Typography>
              </Stack>
            )
          })}
        </Stack>
      </Stack>
    </DialogContent>
  </Dialog>
}