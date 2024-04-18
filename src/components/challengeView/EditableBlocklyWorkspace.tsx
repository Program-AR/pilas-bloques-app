import { PBBlocklyWorkspace, PBBlocklyWorkspaceProps } from "../blockly/PBBlocklyWorkspace"

export const EditableBlocklyWorkspace = ({blockIds, categorized, sx, ...props}: PBBlocklyWorkspaceProps) => {
    return <PBBlocklyWorkspace
            sx={{flexGrow:1, ...sx}} 
            blockIds={blockIds}
            categorized={categorized} 
            workspaceConfiguration={{trashcan:true, scrollbars: true}}
            {...props}
        />
}