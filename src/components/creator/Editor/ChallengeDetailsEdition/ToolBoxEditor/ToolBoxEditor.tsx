import { useState } from "react";
import { LocalStorage } from "../../../../../localStorage";
import { SerializedChallenge, defaultChallenge } from "../../../../serializedChallenge";
import { useTranslation } from "react-i18next";
import { GenericModalDialog } from "../../../../modalDialog/GenericModalDialog";
import { PROCEDURE_CATEGORY } from "../../SceneEdition/mapUtils";
import { DetailsEditionButton } from "../DetailsEditionButton";
import { Stack } from "@mui/material";
import { BlocksSelector, CategorizedToggle } from "./BlocksSelector";
import { ToolboxPreview } from "./ToolboxPreview";
import { availableBlocksFor, categories } from "../../../../blockly/blocks";
import { PBCard } from "../../../../PBCard";

export const ToolBoxEditor = () => {

    const shouldShow = process.env.PROD

    const [contentHeight,] = useState(window.innerHeight*0.7)

    const { t } = useTranslation('creator');

    const storageChallenge = LocalStorage.getCreatorChallenge()
    const challenge: SerializedChallenge = storageChallenge ? storageChallenge : defaultChallenge('Duba')

    const currentToolBox = challenge!.toolbox.blocks
    const [toolBoxItems, setToolBoxItems] = useState(currentToolBox);
    const toolboxState = new ToolboxState(challenge!, toolBoxItems)
    const [open, setOpen] = useState(false);

    const currentIsCategorized = challenge!.toolbox.categorized
    const [isCategorized, setIsCategorized] = useState(currentIsCategorized || toolboxState.categorizationShouldBeForced());

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
        challenge!.toolbox.categorized = isCategorized || toolboxState.categorizationShouldBeForced()
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
            title={`${t('toolbox.title')}${t(`selection.cards.${challenge.scene.type}.name`)}`}
            noScrollable={true}
            dialogProps={{ maxWidth: "md"}}>
            <Stack direction="row">
                <PBCard sx={{display:"flex", flexDirection:"column", padding:"5px", maxHeight:`${contentHeight}px`}}> 
                    <CategorizedToggle toolboxState={toolboxState} isCategorized={isCategorized} setIsCategorized={setIsCategorized}/>
                    <BlocksSelector toolboxState={toolboxState} setToolBoxItems={setToolBoxItems} toolBoxItems={toolBoxItems} availableBlocks={availableBlocksFor(challenge!.scene.type)}/>
                </PBCard>
                {shouldShow ? <ToolboxPreview 
                    blockIds={toolBoxItems}
                    categorized={isCategorized || toolboxState.categorizationShouldBeForced()}/>
                    :<></>
                }
            </Stack>
        </GenericModalDialog>
    </>
}


export class ToolboxState {
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

    categorizationShouldBeForced() { 
        return this.isCategorySelected(PROCEDURE_CATEGORY) //If this category is selected, the categorization should always be enabled
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