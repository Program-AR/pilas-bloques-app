import { PBBlocklyWorkspace } from "../blockly/PBBlocklyWorkspace"

export const EditableBlocklyWorkspace = () => {
    return <PBBlocklyWorkspace
            sx={{flexGrow:1}} 
            blockIds={["MoverACasillaDerecha"]}
            categorized={false} 
            workspaceConfiguration={{trashcan:true, scrollbars: true}}
        />
}