import { SerializedChallenge } from "../../../serializedChallenge";
import { LocalStorage } from "../../../../localStorage";
import { CreatorActionButton } from "./CreatorActionButton";
import DownloadIcon from '@mui/icons-material/Download';
import { PilasBloquesApi } from "../../../../pbApi";
import { useState } from "react";
import { GenericModalDialog } from "../../../modalDialog/GenericModalDialog";
import { Dialog } from "@mui/material";

export const ShareButton = () => {

    const [dialogOpen, setDialogOpen] = useState<boolean>(false)

    return <>
        <Dialog
            isOpen={dialogOpen}

        
        >

        </Dialog>
        <CreatorActionButton onClick={shareChallenge} startIcon={<DownloadIcon />} nametag='share' isshortversion={true} />
    </>

}

const shareChallenge = async () => {
    const challenge: SerializedChallenge = LocalStorage.getCreatorChallenge()!

    await PilasBloquesApi.shareChallenge(challenge)

}