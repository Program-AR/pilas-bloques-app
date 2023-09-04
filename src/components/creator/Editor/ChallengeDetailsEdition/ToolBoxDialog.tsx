import { Box, Switch, FormControlLabel, Typography, Stack } from "@mui/material";
import { useState } from "react";
import { LocalStorage } from "../../../../localStorage";
import { categories, availableBlocksFor } from "../../../blocks";
import { SerializedChallenge, defaultChallenge } from "../../../serializedChallenge";
import { useTranslation } from "react-i18next";
import { GenericModalDialog } from "../../../modalDialog/GenericModalDialog";
import { PROCEDURE_CATEGORY } from "../SceneEdition/mapUtils";
import { DetailsEditionButton } from "./DetailsEditionButton";
import { ToolboxPreview } from "./ToolboxPreview";

export const ToolBoxDialog = () => {

    const { t } = useTranslation('creator');

    const storageChallenge = LocalStorage.getCreatorChallenge()
    const challenge: SerializedChallenge = storageChallenge ? storageChallenge : defaultChallenge('Duba')

    let currentToolBox = challenge!.toolbox.blocks
    const [toolBoxItems, setToolBoxItems] = useState(currentToolBox);
    const toolboxState = new ToolboxState(challenge!, toolBoxItems)
    const [open, setOpen] = useState(false);

    const currentIsCategorized = challenge!.toolbox.categorized
    const [isCategorized, setIsCategorized] = useState(currentIsCategorized || toolboxState.shouldDisableCategorization());

    const handleButtonClick = () => {
        if (!open) {
            setToolBoxItems(currentToolBox)
            setOpen(true)
        }
    }

    const handleOnCancel = () => {
        setOpen(false)
    }
    const handleOnConfirm = () => {
        challenge!.toolbox.blocks = toolBoxItems
        challenge!.toolbox.categorized = isCategorized || toolboxState.shouldDisableCategorization()
        LocalStorage.saveCreatorChallenge(challenge)
        setOpen(false)
    }

    return <>
        <DetailsEditionButton
            imageurl="imagenes/selector-bloques.svg"
            text={t('toolbox.button')}
            onClick={handleButtonClick}
            data-testid="toolbox-button"
        />
        <GenericModalDialog
            isOpen={open}
            onConfirm={handleOnConfirm}
            onCancel={handleOnCancel}
            title={t('toolbox.title')}>
            <Stack direction="row">
                <div>
                    <CategorizedToggle toolboxState={toolboxState} isCategorized={isCategorized} setIsCategorized={setIsCategorized}/>
                    <BlocksSelection toolboxState={toolboxState} setToolBoxItems={setToolBoxItems} toolBoxItems={toolBoxItems} availableBlocks={availableBlocksFor(challenge!.scene.type)}/>
                </div>
                <ToolboxPreview availableBlocks={[]} categorized={isCategorized || toolboxState.shouldDisableCategorization()}/>
            </Stack>
        </GenericModalDialog>
    </>
}


const CategorizedToggle = ({toolboxState, isCategorized, setIsCategorized}: any) => {
    const {t} = useTranslation('blocks')

    const handleIsCategorizedOnChange = (event: { target: { checked: boolean } }) => {
        setIsCategorized(event.target.checked)
    }

    return <>
        <Stack alignItems="flex-end">
            <FormControlLabel key="isCategorized" labelPlacement="start"
                disabled={toolboxState.shouldDisableCategorization()}
                control={<Switch color="secondary" checked={isCategorized || toolboxState.shouldDisableCategorization()}
                                key="isCategorized"
                                onChange={handleIsCategorizedOnChange} />} 
                label={t('categories.categorized')} />
            <Typography width="60%" textAlign="right" lineHeight="1.2" variant="caption">{t('toolbox.categoriesHint')}</Typography>
        </Stack>
</>
}

const BlocksSelection = ({toolboxState, setToolBoxItems, availableBlocks, toolBoxItems}: any) => {
    const {t} = useTranslation('blocks')


    const handleCatOnChange = (event: { target: { name: string; checked: boolean } }) => {
        toolboxState.categoryChanged(event.target.name, event.target.checked)
        setToolBoxItems(toolboxState.selectedBlockIds())
    }

    const handleToolBoxOnChange = (event: { target: { name: string; checked: boolean } }) => {
        toolboxState.blockChanged(event.target.name, event.target.checked)
        setToolBoxItems(toolboxState.selectedBlockIds())
    }

    return <>
        <Box style={{ justifyContent: 'center' }}>
            {categories.map((cat, i) => {
                return (<div key={cat}>
                    <FormControlLabel key={cat + i}
                        control={<Switch checked={toolboxState.isCategorySelected(cat)}
                                        color="secondary"
                                        name={cat}
                                        key={cat + i}
                                        onChange={handleCatOnChange} />}
                        label={<Typography variant="h6">{t('categories.' + cat)}</Typography>} />
                    {availableBlocks.map((block: any) => {
                        return ((cat === block.categoryId.toLowerCase()) && <div key={block.id} style={{ paddingLeft: "20px" }}>
                            <FormControlLabel key={block.id}
                                control={<Switch checked={toolBoxItems.includes(block.id)}
                                                color="secondary"
                                                name={block.id}
                                                key={block.id}
                                                onChange={handleToolBoxOnChange} />} 
                                label={t('blocks.' + block.intlId)} />
                            <br />
                        </div>)
                    })}
                </div>)
            })}
        </Box>
</>

}


class ToolboxState {
    categories: CategorySelection[] = [];

    // This constructor handles the annoying part of mapping from an id - based model
    // to a model where each category has its blocks.
    // If we decide to go for this solution, we can avoid this constructor by modelling differently from a start.
    constructor(challenge: SerializedChallenge, toolboxBlockIds: string[]) {
        this.categories = categories.map(category => new CategorySelection(category))
        this.categories.forEach(category => {
            category.blocks = availableBlocksFor(challenge.scene.type)
                .filter(block => block.categoryId === category.id)
                .map(block => new BlockSelection(block.id, toolboxBlockIds.includes(block.id)))
        })
    }

    selectedBlockIds() {
        return this.categories.flatMap(category => category.selectedBlockIds())
    }
    blockChanged(blockId: string, checked: boolean) {
        this.categories.find(category => category.hasBlock(blockId))!.blockChanged(blockId, checked)
    }
    categoryChanged(categoryId: string, checked: boolean) {
        this.categories.find(category => category.id === categoryId)!.checked(checked)
    }
    isCategorySelected(categoryId: string) {
        return this.categories.find(category => category.id === categoryId)!.isSelected()
    }

    shouldDisableCategorization() {
        return this.isCategorySelected(PROCEDURE_CATEGORY)
    }
}

class CategorySelection {
    id: string
    blocks: BlockSelection[] = []

    constructor(id: string) {
        this.id = id
    }

    selectedBlockIds() {
        return this.blocks.filter(block => block.isSelected).map(block => block.id)
    }
    hasBlock(blockId: string) {
        return this.blocks.find(block => block.id === blockId)
    }
    blockChanged(blockId: string, checked: boolean) {
        this.blocks.find(block => block.id === blockId)!.isSelected = checked
    }
    checked(checked: boolean) {
        this.blocks.forEach(block => block.isSelected = checked)
    }
    isSelected() {
        return this.blocks.every(block => block.isSelected)
    }
}

class BlockSelection {
    isSelected: boolean
    id: string

    constructor(id: string, isSelected: boolean) {
        this.id = id
        this.isSelected = isSelected
    }
}