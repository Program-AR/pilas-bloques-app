import { SerializedChallenge } from "../../../serializedChallenge";
import { LocalStorage } from "../../../../localStorage";
import { CreatorActionButton } from "./CreatorActionButton";
import DownloadIcon from '@mui/icons-material/Download';
import { PilasBloquesApi } from "../../../../pbApi";
import { useEffect, useState } from "react";
import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";
import { useLocation } from "react-router-dom";

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
                {url || <CircularProgress/>}
                <Button onClick={handleShareClick} variant='contained'>Compartir</Button>
            </Stack>
        </DialogContent>
    </Dialog>
</>
}

const shareChallenge = () => {
    const challenge: SerializedChallenge = LocalStorage.getCreatorChallenge()!

    return PilasBloquesApi.shareChallenge(challenge)

}