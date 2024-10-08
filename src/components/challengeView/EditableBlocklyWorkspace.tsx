import { PBBlocklyWorkspace, PBBlocklyWorkspaceProps } from "../blockly/PBBlocklyWorkspace"
import { xmlBloqueEmpezarAEjecutar } from "../blockly/blockly"

type EditableBlocklyWorkspaceProps = {
    isVertical: boolean
}

export const EditableBlocklyWorkspace = ({ blockIds, categorized, sx, isVertical, ...props }: PBBlocklyWorkspaceProps & EditableBlocklyWorkspaceProps) => {
    return <PBBlocklyWorkspace
        sx={{ flexGrow: 1}}
        blockIds={blockIds}
        categorized={categorized}
        initialXml={xmlBloqueEmpezarAEjecutar}
        workspaceConfiguration={{ toolboxPosition: isVertical ? 'end' : 'start', trashcan: true, zoom: {controls: true, wheel: true}, scrollbars: true, horizontalLayout: isVertical }}
        {...props}
    />
}
