import { CreatorActionButton } from "../CreatorActionButton";
import { useContext, useState } from "react";
import { Dialog, DialogContent, DialogTitle, InputAdornment, Stack, TextField } from "@mui/material";
import { CreatorContext } from "../../CreatorContext";
import { ShareButtons, CopyToClipboardButton } from "./ShareModalButtons";
import { useTranslation } from "react-i18next";
import ShareIcon from '@mui/icons-material/Share';

export const ShareButton = () => {

    const [dialogOpen, setDialogOpen] = useState<boolean>(false)

    return <>
        <ShareDialog open={dialogOpen} setDialogOpen={setDialogOpen} />
        <CreatorActionButton onClick={() => { setDialogOpen(true) }} startIcon={<ShareIcon />} nametag='share' />
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
    const { sharedId } = useContext(CreatorContext)
    
    const sharedLink = process.env.VITE_PB_APP_URL  + `/#/desafio/guardado/${sharedId}`

    return <Stack>
        {sharedId ?
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




