import { PBBlocklyWorkspace } from "../blockly/PBBlocklyWorkspace"

type EditableBlocklyWorkspaceProps = {
    isVertical: boolean
}

export const EditableBlocklyWorkspace = ({ isVertical }: EditableBlocklyWorkspaceProps) => {
    return <PBBlocklyWorkspace
        sx={{ flexGrow: 1}}
        blockIds={["MoverACasillaDerecha"]}
        categorized={false}
        workspaceConfiguration={{ toolboxPosition: isVertical ? 'end' : 'start', trashcan: true, scrollbars: true, horizontalLayout: isVertical }}
    />
}