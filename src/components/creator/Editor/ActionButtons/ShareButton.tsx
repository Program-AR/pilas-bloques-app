import { SerializedChallenge } from "../../../serializedChallenge";
import { LocalStorage } from "../../../../localStorage";
import { CreatorActionButton } from "./CreatorActionButton";
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import SaveIcon from '@mui/icons-material/Save';
import { PilasBloquesApi } from "../../../../pbApi";
import { useContext, useState } from "react";
import { Dialog, DialogContent, DialogTitle, Stack, Tooltip } from "@mui/material";
import { DownloadButton } from "./DownloadButton";
import { CreatorContext } from "../CreatorContext";

export const ShareButton = () => {

    const [dialogOpen, setDialogOpen] = useState<boolean>(false)

    return <>
        <ShareDialog open={dialogOpen} setDialogOpen={setDialogOpen} />
        <CreatorActionButton onClick={() => { setDialogOpen(true) }} startIcon={<DownloadIcon />} nametag='share' isshortversion={true} />
    </>

}

const ShareDialog = ({ open, setDialogOpen }: { open: boolean, setDialogOpen: (open: boolean) => void }) => {
    const { shareId, setShareId } = useContext(CreatorContext)

    const handleShareClick = async () => {
        const challengeId: string = (await shareChallenge()).sharedId
        setShareId(challengeId)
    }

    return <>
        <Dialog open={open} onClose={() => { setDialogOpen(false) }}>
            <DialogTitle>Compartir desafio</DialogTitle>
            <DialogContent>
                <Stack>
                    {`https://${window.location.hostname}/online/#/desafio/guardado/${shareId}`}
                    <Buttons handleShareClick={handleShareClick} />
                </Stack>
            </DialogContent>
        </Dialog>
    </>
}

const Buttons = ({ handleShareClick }: { handleShareClick: () => void }) => {
    const { shareId } = useContext(CreatorContext)

    return <>
        <Stack direction="row" justifyContent="space-between">
            {shareId ? <SaveButton /> : <ShareUrlButton handleShareClick={handleShareClick} />}
            <DownloadButton />
        </Stack>
    </>
}

const ShareUrlButton = ({ handleShareClick }: { handleShareClick: () => void }) => {

    const userLoggedIn = !!LocalStorage.getUser()

    return <CreatorActionButton onClick={handleShareClick} disabled={!userLoggedIn} startIcon={<ShareIcon />} variant='contained' nametag="shareUrl"/>
}

const SaveButton = () => {
    const { setShareId } = useContext(CreatorContext)

    const handleClick = async () => {
        const challenge = await PilasBloquesApi.saveChallenge(LocalStorage.getCreatorChallenge()!)
        setShareId(challenge.sharedId)
    }

    return <CreatorActionButton onClick={handleClick} startIcon={<SaveIcon />} variant='contained' nametag="save" />
}

const shareChallenge = () => {
    const challenge: SerializedChallenge = LocalStorage.getCreatorChallenge()!

    return PilasBloquesApi.shareChallenge(challenge)

}