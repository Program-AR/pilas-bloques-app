import { CreatorActionButton } from "../CreatorActionButton";
import DownloadIcon from '@mui/icons-material/Download';
import { useContext, useState } from "react";
import { Dialog, DialogContent, DialogTitle, InputAdornment, Stack, TextField } from "@mui/material";
import { CreatorContext } from "../../CreatorContext";
import { Buttons, CopyToClipboardButton } from "./ShareModalButtons";

export const ShareButton = () => {

    const [dialogOpen, setDialogOpen] = useState<boolean>(false)

    return <>
        <ShareDialog open={dialogOpen} setDialogOpen={setDialogOpen} />
        <CreatorActionButton onClick={() => { setDialogOpen(true) }} startIcon={<DownloadIcon />} nametag='share' isshortversion={true} />
    </>

}

const ShareDialog = ({ open, setDialogOpen }: { open: boolean, setDialogOpen: (open: boolean) => void }) => {
    return <>
        <Dialog open={open} onClose={() => { setDialogOpen(false) }}>
            <DialogTitle>Compartir desafio</DialogTitle>
            <DialogContent sx={{ minWidth: '500px' }}>
                <ShareModal />
            </DialogContent>
        </Dialog >
    </>
}

const ShareModal = () => {
    const { shareId } = useContext(CreatorContext)

    const link: string = `http://localhost:3000/#/desafio/guardado/${shareId}`

    return <Stack>
        {shareId ?
            <Stack direction='row' justifyContent='space-between' sx={{ margin: 1 }}>
                <TextField
                    sx={{ width: '100%' }}
                    defaultValue={link}
                    InputProps={{
                        readOnly: true,
                        endAdornment: (
                            <InputAdornment position="start">
                                <CopyToClipboardButton textToCopy={link} />
                            </InputAdornment>
                        )
                    }}
                />
            </Stack>
            : <></>
        }
        <Buttons />
    </Stack>

}




