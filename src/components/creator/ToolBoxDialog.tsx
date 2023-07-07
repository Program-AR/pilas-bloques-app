import { Button, Box, Switch, Icon, FormControlLabel } from "@mui/material";
import { useState } from "react";
import { LocalStorage } from "../../localStorage";
import { BlockType, commonBlocks, sceneBlocks } from "../blocks";
import { sceneObjectByType, SerializedChallenge, defaultChallenge } from "../serializedChallenge";
import { useTranslation } from "react-i18next";
import { GenericModalDialog } from "../modalDialog/GenericModalDialog";

const BlockIcon = () => 
            <Icon>
                <img src="imagenes/block.png" 
                    alt="BlockIcon"
                    style={{width:"100%", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center"}}/>
            </Icon>


export const ToolBoxDialog = () => {

    const { t } = useTranslation('creator');
    const tb = useTranslation('blocks').t;

    const storageChallenge = LocalStorage.getCreatorChallenge()
    const challenge: SerializedChallenge =  storageChallenge ? storageChallenge : defaultChallenge('Duba')

    const currentToolBox = challenge!.toolbox

    const [toolBoxInProgress, setToolBoxInProgress] = useState(currentToolBox);
    const [open, setOpen] = useState(false);

    const blocks: BlockType[] = [...commonBlocks,
        ...sceneBlocks.filter(block => sceneObjectByType(challenge!.scene.type).specificBlocksIds.includes(block.id))]
    .sort((a, b) => {
        if (a.categoryId > b.categoryId) {
            return -1;
        }
        if (a.categoryId < b.categoryId) {        
            return 1;
        }
      return 0;
    })

    const handleToolBoxOnChange = () => {
        /*
        if( clueCheck ) setClueInProgress('')
        setClueCheck(!clueCheck )*/
    }

    const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        if(!open) {
            setToolBoxInProgress(currentToolBox)
            setOpen(true)
        }
    }    

    const handleOnCancel = () => {
        setOpen(false)
    }
    const handleOnConfirm = () => {
        challenge!.toolbox = toolBoxInProgress
        LocalStorage.saveCreatorChallenge(challenge)
        setOpen(false)
    }

    return <>
        <Button 
            variant="outlined" 
            size="large"
            style={{margin:"6px", textTransform:"none"}} 
            startIcon={<BlockIcon/>}
            data-testid="toolbox-button" 
            onClick={handleButtonClick}>{t('toolbox.button')}</Button>
        <GenericModalDialog
                        isOpen={open}
                        onConfirm={handleOnConfirm}
                        onCancel={handleOnCancel}
                        title={t('toolbox.title')}>
            <Box style={{justifyContent:'center'}}>
            {blocks.map((block, j) =>
                    <>
                    <FormControlLabel key={block.id} 
                    control={<Switch checked={false}
                                     onChange={handleToolBoxOnChange}/>} label={tb(block.intlId)} />
                    <br/>
                    </>)}
            </Box>
        </GenericModalDialog>
    </>
}
