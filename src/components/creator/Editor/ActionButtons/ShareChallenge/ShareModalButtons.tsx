import ShareIcon from '@mui/icons-material/Share';
import SaveIcon from '@mui/icons-material/Save';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ReactNode, useContext, useState } from "react"
import { IconButtonTooltip } from "../../SceneEdition/IconButtonTooltip"
import { Snackbar, Stack, Tooltip } from "@mui/material"
import { CreatorContext } from '../../CreatorContext';
import { LocalStorage } from '../../../../../localStorage';
import { PilasBloquesApi } from '../../../../../pbApi';
import { CreatorActionButton } from '../CreatorActionButton';
import { DialogSnackbar } from '../../../../dialogSnackbar/DialogSnackbar';
import { useTranslation } from 'react-i18next';
import { SerializedChallenge } from '../../../../serializedChallenge';
import { DownloadButton } from '../DownloadButton';

export const CopyToClipboardButton = ({ textToCopy }: { textToCopy: string }) => {

    const [openSnackbar, setOpenSnackbar] = useState(false)

    const { t } = useTranslation('creator');

    const handleClick = () => {
        setOpenSnackbar(true)
        navigator.clipboard.writeText(textToCopy)
    }

    return <>
        <IconButtonTooltip icon={<ContentCopyIcon />} onClick={handleClick} tooltip={t('editor.buttons.copyToClipboard')} />
        <Snackbar
            open={openSnackbar}
            onClose={() => setOpenSnackbar(false)}
            autoHideDuration={2000}
            message={t('editor.buttons.copiedToClipboard')}
        />
    </>
}

export const ShareButtons = () => {
    const { sharedId } = useContext(CreatorContext)

    return <>
        <Stack direction="row" justifyContent="space-between" alignItems='center'>
            {sharedId ? <SaveButton /> : <ShareUrlButton />}
            <DownloadButton />
        </Stack>
    </>
}

const ShareUrlButton = () => 
    <ChallengeUpsertButton Icon={<ShareIcon />} nametag="shareUrl" challengeUpsert={PilasBloquesApi.shareChallenge} />

const SaveButton = () => 
    <ChallengeUpsertButton Icon={<SaveIcon />} nametag="save" challengeUpsert={PilasBloquesApi.saveChallenge} />

export const ChallengeUpsertButton = ({ Icon, challengeUpsert, nametag }: { Icon: ReactNode, nametag: string, challengeUpsert: (challenge: SerializedChallenge) => Promise<SerializedChallenge> }) => {

    const { setSharedId } = useContext(CreatorContext)
    const userLoggedIn = !!LocalStorage.getUser()
    const [serverError, setServerError] = useState<boolean>(false)
    const { t } = useTranslation('creator');
    const [savedSnackbar, setSavedSnackbarOpen] = useState(false)

    const handleClick = async () => {
        try {
            const savedChallenge = await challengeUpsert(LocalStorage.getCreatorChallenge()!)
            setSharedId(savedChallenge.sharedId!)
            setSavedSnackbarOpen(true)
        }
        catch (error) {
            setServerError(true)
        }
    }

    return <>
        <Snackbar
            open={savedSnackbar}
            onClose={() => setSavedSnackbarOpen(false)}
            autoHideDuration={2000}
            message={t('editor.buttons.savedCorrectly')}
        />
        <Tooltip title={!userLoggedIn ? t('editor.loginWarning') : ''} followCursor>
            <div>
                <CreatorActionButton data-testid="upsertButton" onClick={handleClick} disabled={!userLoggedIn} startIcon={Icon} variant='contained' nametag={nametag} />
            </div>
        </Tooltip>
        <DialogSnackbar open={serverError} onClose={() => setServerError(false)} message={t('editor.serverError')} />
    </>
}