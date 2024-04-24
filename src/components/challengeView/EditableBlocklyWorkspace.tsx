import { PBBlocklyWorkspace } from "../blockly/PBBlocklyWorkspace"

type EditableBlocklyWorkspaceProps = {
    horizontalLayout: boolean
}

export const EditableBlocklyWorkspace = ({ horizontalLayout }: EditableBlocklyWorkspaceProps) => {
    return <PBBlocklyWorkspace
        sx={{ flexGrow: 1}}
        blockIds={["MoverACasillaDerecha"]}
        categorized={false}
        workspaceConfiguration={{ trashcan: true, scrollbars: true, horizontalLayout: horizontalLayout }}
    />
}