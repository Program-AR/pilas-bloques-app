import { PBBlocklyWorkspace } from "../blockly/PBBlocklyWorkspace"

export const EditableBlocklyWorkspace = () => {
    return <PBBlocklyWorkspace
            sx={{flexGrow:1}} 
            blocksToPreview={["MoverACasillaDerecha"]}
            categorized={false} 
        />
}