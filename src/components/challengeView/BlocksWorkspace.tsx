import { ToolboxPreview } from "../blockly/ToolboxPreview"

export const BlocksWorkspace = () => {
    return <ToolboxPreview
            sx={{flexGrow:1}} 
            blocksToPreview={["MoverACasillaDerecha"]}
            categorized={false} 
        />
}