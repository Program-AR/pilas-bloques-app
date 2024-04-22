import { PBBlocklyWorkspace } from "../blockly/PBBlocklyWorkspace"
import { commonBlocks } from "../blockly/blocks"

export const EditableBlocklyWorkspace = () => {
    return <PBBlocklyWorkspace
            sx={{flexGrow:1}} 
            blockIds={commonBlocks.map(block => block.id)} //  ["MoverACasillaDerecha"]
            categorized={true} 
            workspaceConfiguration={{trashcan:true, scrollbars: true}}
        />
}