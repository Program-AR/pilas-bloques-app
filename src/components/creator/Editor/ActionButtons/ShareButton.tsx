import { SerializedChallenge } from "../../../serializedChallenge";
import { LocalStorage } from "../../../../localStorage";
import { CreatorActionButton } from "./CreatorActionButton";
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import SaveIcon from '@mui/icons-material/Save';
import { PilasBloquesApi } from "../../../../pbApi";
import { useContext, useState } from "react";
import { Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";
import { DownloadButton } from "./DownloadButton";
import { CreatorContext } from "../CreatorContext";

export const ShareButton = () => {

    const [dialogOpen, setDialogOpen] = useState<boolean>(false)

    return <>
        <ShareDialog open={dialogOpen} setDialogOpen={setDialogOpen}/>
        <CreatorActionButton onClick={() => {setDialogOpen(true)}} startIcon={<DownloadIcon />} nametag='share' isshortversion={true} />
    </>

}

const ShareDialog = ({open, setDialogOpen} : {open: boolean, setDialogOpen: (open: boolean) => void}) => {
    const { setShareId } = useContext(CreatorContext)
    const [url, setUrl] = useState<string>()

    const handleShareClick = async () => {
        const challengeId: string = (await shareChallenge())._id
        setShareId(challengeId)

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

const Buttons = ({handleShareClick}: {handleShareClick: () => void}) => {
    const { shareId } = useContext(CreatorContext)

    return <>
    <Stack direction="row" justifyContent="space-between">
        {shareId ? <SaveButton/> : <ShareUrlButton handleShareClick={handleShareClick}/>}
        <DownloadButton/>
    </Stack>
</>
}

const ShareUrlButton = ({handleShareClick}: {handleShareClick: () => void}) => 
    <CreatorActionButton onClick={handleShareClick} startIcon={<ShareIcon/>} variant='contained' nametag="shareUrl"/>

const SaveButton = () => {
    const handleClick = async () => {
        PilasBloquesApi.saveChallenge(LocalStorage.getCreatorChallenge()!)
    }

    return <CreatorActionButton onClick={handleClick} startIcon={<SaveIcon/>} variant='contained' nametag="save"/>
}

const shareChallenge = () => {
    const challenge: SerializedChallenge = LocalStorage.getCreatorChallenge()!

    return PilasBloquesApi.shareChallenge(challenge)

}