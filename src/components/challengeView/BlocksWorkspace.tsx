import { PBCard } from "../PBCard"
import { ToolboxPreview } from "../creator/Editor/ChallengeDetailsEdition/ToolBoxEditor/ToolboxPreview"

export const BlocksWorkspace = () => {
    return <PBCard sx={{flexGrow: 1}}>
        <ToolboxPreview blocksToPreview={["MoverACasillaDerecha"]} categorized={false} />
    </PBCard>
}