import { PBBlocklyWorkspace } from "../../../../blockly/PBBlocklyWorkspace"
import Blockly from "blockly";

type ToolboxPreviewProps = {
    categorized: boolean,
    blockIds: string[]
}

export const ToolboxPreview = ( {categorized, blockIds} : ToolboxPreviewProps ) => {
    return <>
        <PBBlocklyWorkspace 
            sx={{display: "flex", flexDirection:"column", minWidth: "400px", padding:"5px"}}
            title
            blockIds={blockIds}
            categorized={categorized}
            workspaceConfiguration={{trashcan:false, scrollbars: false}} //Needed to make it look like this is only the toolbox
            onWorkspaceChange={() => {Blockly.getMainWorkspace().clear()}} //Needed to make it look like this is only the toolbox
        />
    </>
}