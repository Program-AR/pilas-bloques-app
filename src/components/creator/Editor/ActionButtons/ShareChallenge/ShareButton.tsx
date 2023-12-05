import { CreatorActionButton } from "../CreatorActionButton";
import DownloadIcon from '@mui/icons-material/Download';
import { useContext, useState } from "react";
import { Dialog, DialogContent, DialogTitle, InputAdornment, Stack, TextField } from "@mui/material";
import { CreatorContext } from "../../CreatorContext";
import { Buttons, CopyToClipboardButton } from "./ShareModalButtons";
import { useTranslation } from "react-i18next";

export const ShareButton = () => {

    const [dialogOpen, setDialogOpen] = useState<boolean>(false)

    return <>
        <ShareDialog open={dialogOpen} setDialogOpen={setDialogOpen} />
        <CreatorActionButton onClick={() => { setDialogOpen(true) }} startIcon={<DownloadIcon />} nametag='share' isshortversion={true} />
    </>

}

const ShareDialog = ({ open, setDialogOpen }: { open: boolean, setDialogOpen: (open: boolean) => void }) => {

    const { t } = useTranslation('creator');

    return <>
        <Dialog open={open} onClose={() => { setDialogOpen(false) }}>
            <DialogTitle>{t('editor.buttons.share')}</DialogTitle>
            <DialogContent >
                <ShareModal />
            </DialogContent>
        </Dialog >
    </>
}

const ShareModal = () => {
    const { shareId } = useContext(CreatorContext)
    
    const sharedLink = process.env.REACT_APP_PB_APP_URL  + `/#/desafio/guardado/${shareId}`

    return <Stack>
        {shareId ?
            <Stack direction='row'>
                <TextField
                    sx={{ width: '100%', margin: 1}}
                    defaultValue={sharedLink}
                    InputProps={{
                        readOnly: true,
                        endAdornment: (
                            <InputAdornment position="end">
                                <CopyToClipboardButton textToCopy={sharedLink} />
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




