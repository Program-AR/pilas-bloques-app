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

const ShareUrlButton = () => {

    const shareChallenge = async (): Promise<string> => {
        const challenge: SerializedChallenge = LocalStorage.getCreatorChallenge()!
        const sharedChallenge = await PilasBloquesApi.shareChallenge(challenge)
        return sharedChallenge.sharedId
    }

    return <ChallengeUpsertButton Icon={<ShareIcon />} nametag="shareUrl" challengeUpsert={shareChallenge} />
}
const SaveButton = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false)

    const { t } = useTranslation('creator');

    const saveChallenge = async (): Promise<string> => {
        const savedChallenge = await PilasBloquesApi.saveChallenge(LocalStorage.getCreatorChallenge()!)
        setOpenSnackbar(true)
        return savedChallenge.sharedId
    }

    return <>
        <ChallengeUpsertButton Icon={<SaveIcon />} nametag="save" challengeUpsert={saveChallenge} />
        <Snackbar
            open={openSnackbar}
            onClose={() => setOpenSnackbar(false)}
            autoHideDuration={2000}
            message={t('editor.buttons.savedCorrectly')}
        />
    </>
}

export const ChallengeUpsertButton = ({ Icon, challengeUpsert, nametag }: { Icon: ReactNode, nametag: string, challengeUpsert: () => Promise<string> }) => {

    const { setSharedId } = useContext(CreatorContext)
    const userLoggedIn = !!LocalStorage.getUser()
    const [serverError, setServerError] = useState<boolean>(false)
    const { t } = useTranslation('creator');

    const handleClick = async () => {
        try {
            setSharedId(await challengeUpsert())
        }
        catch (error) {
            setServerError(true)
        }
    }

    return <>
        <Tooltip title={!userLoggedIn ? t('editor.loginWarning') : ''} followCursor>
            <div>
                <CreatorActionButton data-testid="upsertButton" onClick={handleClick} disabled={!userLoggedIn} startIcon={Icon} variant='contained' nametag={nametag} />
            </div>
        </Tooltip>
        <DialogSnackbar open={serverError} onClose={() => setServerError(false)} message={t('editor.serverError')} />
    </>
}