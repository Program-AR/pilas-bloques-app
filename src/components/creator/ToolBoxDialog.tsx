import { Button, Box, Switch, Icon, FormControlLabel } from "@mui/material";
import { useState, useEffect } from "react";
import { LocalStorage } from "../../localStorage";
import { BlockType, commonBlocks, sceneBlocks, categories } from "../blocks";
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

    const blocks: BlockType[] = [
        ...sceneBlocks.filter(block => sceneObjectByType(challenge!.scene.type).specificBlocksIds.includes(block.id)),
        ...commonBlocks]
    .sort((a, b) => {
        const position = (block: BlockType) => categories.indexOf(block.categoryId.toLowerCase())
        return position(a) - position(b)
    })


    let currentToolBox = challenge!.toolbox.blocks

    const [toolBoxItems, setToolBoxItems] = useState(currentToolBox);
    const [toolBoxCategories, setToolBoxCategories] = useState<string[]>([]);
    const [open, setOpen] = useState(false);

    const dataChanged = ((current:string[], newData: string ) => 
            current.filter((data: string) => data !== newData))
    
    const searchCategory = (searchBlock: string) =>
            blocks.find((block) => block.id === searchBlock)?.categoryId.toLowerCase() || ''

    const allItemsInCategory = (category: string, checked: boolean) => {
        let categoryBlocks: string[] = [];
        if( checked )
        {
            blocks.forEach((block)=>
                block.categoryId.toLowerCase() === category && !toolBoxItems.includes(block.id) &&
                categoryBlocks.push(block.id) )

            setToolBoxItems([...toolBoxItems, ...categoryBlocks ])
        }
        else {
            categoryBlocks = toolBoxItems.filter((block) => searchCategory(block) !== category)
            setToolBoxItems([...categoryBlocks ])
        }
    }
    
    const updateToolBoxCategories = ( actualCategory: string, checked: boolean ) => {
        if( checked )
            setToolBoxCategories([...toolBoxCategories, actualCategory ]);    
        else 
            setToolBoxCategories(dataChanged(toolBoxCategories, actualCategory ))
    }

    const blocksCountByCategory = (catBlock: string): number =>
        blocks.filter((block) => block.categoryId.toLowerCase() === catBlock).length

    const itemsCountByCategory = ( items: string[], catBlock: string ): number =>
        items.filter((block) => searchCategory( block ) === catBlock ).length

    const updateToolBoxItems = ( actualBlock: string, checked: boolean ) => {
        if( checked )
        {
            setToolBoxItems([...toolBoxItems, actualBlock])
            if ( blocksCountByCategory( searchCategory( actualBlock )) -
                 itemsCountByCategory( toolBoxItems, searchCategory( actualBlock )) === 1 )
               updateToolBoxCategories( searchCategory(actualBlock), true )
        }
        else
        {
            setToolBoxItems(dataChanged(toolBoxItems, actualBlock ))
            updateToolBoxCategories( searchCategory(actualBlock), false )
        }
    }

    const handleCatOnChange = (event : { target: { name: string; checked: boolean }  }) => {
        updateToolBoxCategories( event.target.name, event.target.checked )
        allItemsInCategory(event.target.name, event.target.checked)
    }

    const handleToolBoxOnChange = (event : { target: { name: string; checked: boolean }  }) => {
        updateToolBoxItems( event.target.name, event.target.checked ) 
    }
  
    const setInitialCategories = () => {
        let initialCategories : string [] = []
        currentToolBox.forEach((block) => {
            const categoryBlock = searchCategory( block )
            if ( !initialCategories.includes( categoryBlock ) &&    
                    blocksCountByCategory( categoryBlock ) -
                        itemsCountByCategory( currentToolBox, categoryBlock ) === 0 )
                    initialCategories.push(categoryBlock)
        })
        setToolBoxCategories([...initialCategories])
    }

    const handleButtonClick = () => {
        if(!open) {
            setToolBoxItems(currentToolBox)
            setInitialCategories()
            setOpen(true)
        }
    }    

    const handleOnCancel = () => {
        setOpen(false)
    }
    const handleOnConfirm = () => {
        challenge!.toolbox.blocks = toolBoxItems
        LocalStorage.saveCreatorChallenge(challenge)
        setOpen(false)
    }

    useEffect(() => {}, [toolBoxItems, toolBoxCategories]);  

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
                {categories.map((cat, i) => {
                    return( <div key={cat}>
                    <FormControlLabel key={cat+i}  
                    control={<Switch checked={toolBoxCategories.includes(cat)}
                                     name={cat}
                                     key={cat+i} 
                                     onChange={handleCatOnChange}/>} label={tb('categories.' + cat)}/>
                    {blocks.map((block) => {
                            return( (cat === block.categoryId.toLowerCase()) && <div key={block.id} style={{paddingLeft: "20px"}}>
                            <FormControlLabel key={block.id} 
                            control={<Switch checked={toolBoxItems.includes(block.id)}
                                            name={block.id}
                                            key={block.id} 
                                            onChange={handleToolBoxOnChange}/>} label={tb('blocks.' + block.intlId)} />
                            <br/>
                            </div>)})}
                </div>)})}
            </Box>
        </GenericModalDialog>
    </>
}
