import { SerializedChallenge } from "../../../serializedChallenge";
import { LocalStorage } from "../../../../localStorage";
import { CreatorActionButton } from "./CreatorActionButton";
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import { PilasBloquesApi } from "../../../../pbApi";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";
import { DownloadButton } from "./DownloadButton";

export const ShareButton = () => {

    const [dialogOpen, setDialogOpen] = useState<boolean>(false)

    return <>
        <ShareDialog open={dialogOpen} setDialogOpen={setDialogOpen}/>
        <CreatorActionButton onClick={() => {setDialogOpen(true)}} startIcon={<DownloadIcon />} nametag='share' isshortversion={true} />
    </>

}

const ShareDialog = ({open, setDialogOpen} : {open: boolean, setDialogOpen: (open: boolean) => void}) => {

    const [url, setUrl] = useState<any>()

    const handleShareClick = async () => {
        const challengeId = (await shareChallenge())._id

        setUrl(`https://${window.location.hostname}/#/sharedChallenge/${challengeId}`)
    }

    return <>
    <Dialog open={open} onClose={() => {setDialogOpen(false)}}>
        <DialogTitle>Compartir desafio</DialogTitle>
        <DialogContent>
            <Stack>
                {url}
                <Buttons handleShareClick={handleShareClick}/>
            </Stack>
        </DialogContent>
    </Dialog>
</>
}

const Buttons = ({handleShareClick}: {handleShareClick: () => void}) => <>
    <Stack direction="row" justifyContent="space-between">
        <CreatorActionButton onClick={handleShareClick} startIcon={<ShareIcon/>} variant='contained' nametag="shareUrl"/>
        <DownloadButton/>
    </Stack>


</>

const shareChallenge = () => {
    const challenge: SerializedChallenge = LocalStorage.getCreatorChallenge()!

    return PilasBloquesApi.shareChallenge(challenge)

}