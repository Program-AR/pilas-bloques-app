import { ToolboxPreview } from "../creator/Editor/ChallengeDetailsEdition/ToolBoxEditor/ToolboxPreview"

export const BlocksWorkspace = () => {
    return <ToolboxPreview
            sx={{flexGrow:1}} 
            blocksToPreview={["MoverACasillaDerecha"]}
            categorized={false} 
        />
}