import { CreatorActionButton } from "../CreatorActionButton";
import DownloadIcon from '@mui/icons-material/Download';
import { useContext, useState } from "react";
import { Dialog, DialogContent, DialogTitle, InputAdornment, Stack, TextField } from "@mui/material";
import { CreatorContext } from "../../CreatorContext";
import { ShareButtons, CopyToClipboardButton } from "./ShareModalButtons";
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

export const ShareModal = () => {
    const { shareId } = useContext(CreatorContext)

    const APP_URL = 'https://pilasbloques.program.ar/online'
    const DEV_URL = 'localhost:3000'
    
    const sharedLink = (process.env.NODE_ENV === 'production' ? APP_URL : DEV_URL)  + `/#/desafio/guardado/${shareId}`

    //const link: string = `http://localhost:3000/#/desafio/guardado/${shareId}`

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
        <ShareButtons />
    </Stack>
}




