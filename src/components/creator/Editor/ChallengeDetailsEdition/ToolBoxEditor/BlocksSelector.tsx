import { Box, Switch, FormControlLabel, Typography, Stack } from "@mui/material";
import { useTranslation } from "react-i18next"
import { BlockType, categories } from "../../../../blocks"
import { ToolboxState } from "./ToolBoxEditor";

type BlocksSelectorProps = {
    toolboxState: ToolboxState
    availableBlocks: BlockType[]
    setToolBoxItems: (blocks: string[]) => void
    toolBoxItems: string[]
}

export const BlocksSelector = ({toolboxState, setToolBoxItems, availableBlocks, toolBoxItems}: BlocksSelectorProps) => {

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
            {categories.map((cat) => {
                return (
                <div key={cat}>
                    <CategoryToggle checked={toolboxState.isCategorySelected(cat)} categoryName={cat} handleCatOnChange={handleCatOnChange}/>
                    {availableBlocks.map((block: any) => 
                    {
                        return (cat === block.categoryId.toLowerCase() && <div key={block.id} style={{ paddingLeft: "20px" }}>
                                <BlockToggle block={block} handleToolBoxOnChange={handleToolBoxOnChange} checked={toolBoxItems.includes(block.id)}/>
                            <br />
                        </div>)
                    }
                    
                    )}

                </div>
                
                )
            })}
        </Box>
</>

}

const CategoryToggle = ({categoryName, checked, handleCatOnChange}: any) => {
    const {t} = useTranslation('blocks')


    return <>
        <FormControlLabel key={categoryName}
            control={<Switch checked={checked}
            color="secondary"
            name={categoryName}
            key={categoryName}
            onChange={handleCatOnChange} />}
            label={<Typography variant="h6">{t('categories.' + categoryName)}</Typography>} 
        />
    </>
}


const BlockToggle = ({block, checked, handleToolBoxOnChange}: any) => {
    const {t} = useTranslation('blocks')

    return <>
        <FormControlLabel key={block.id}
            control={<Switch checked={checked}
                            color="secondary"
                            name={block.id}
                            key={block.id}
                            onChange={handleToolBoxOnChange} />} 
            label={t('blocks.' + block.intlId)} />
    </>
}


type CategorizedToggleProps = {
    toolboxState: ToolboxState
    isCategorized: boolean
    setIsCategorized: (categorized: boolean) => void

}

export const CategorizedToggle = ({toolboxState, isCategorized, setIsCategorized}: CategorizedToggleProps) => {
    const {t} = useTranslation('blocks')

    const handleIsCategorizedOnChange = (event: { target: { checked: boolean } }) => {
        setIsCategorized(event.target.checked)
    }

    return <>
        <Stack alignItems="flex-end">
            <FormControlLabel key="isCategorized" labelPlacement="start"
                disabled={toolboxState.categorizationShouldBeForced()}
                control={<Switch color="secondary" checked={isCategorized || toolboxState.categorizationShouldBeForced()}
                                key="isCategorized"
                                onChange={handleIsCategorizedOnChange} />} 
                label={t('categories.categorized')} />
            <Typography width="60%" textAlign="right" lineHeight="1.2" variant="caption">{t('toolbox.categoriesHint')}</Typography>
        </Stack>
</>
}