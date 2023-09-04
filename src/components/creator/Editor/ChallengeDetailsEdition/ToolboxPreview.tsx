import "./prueba.css";
import { BlocklyWorkspace } from "react-blockly";
import Blockly from "blockly";
import { useTranslation } from "react-i18next";
import { BlockType } from "../../../blocks";
import { categorizedToolbox, setupBlocklyBlocks, uncategorizedToolbox } from "../../../../blockly";

type ToolboxPreviewProps = {
  availableBlocks: BlockType[]
  categorized: boolean
}

export const ToolboxPreview = ({availableBlocks, categorized}: ToolboxPreviewProps) => {
  const {t} = useTranslation()

  setupBlocklyBlocks(t)

  return (
      <>
      <div style={{ height: "600px", width: "800px"}}>
          <BlocklyWorkspace
          toolboxConfiguration={categorized ? categorizedToolbox(availableBlocks) : uncategorizedToolbox(availableBlocks)}
          className="toolbox-preview"
          workspaceConfiguration={{trashcan:false, scrollbars: false}} //Needed to make it look like this is only the toolbox
          onWorkspaceChange={() => {Blockly.getMainWorkspace().clear()}} //Needed to make it look like this is only the toolbox
          />
      </div>
      </>
  );
};
