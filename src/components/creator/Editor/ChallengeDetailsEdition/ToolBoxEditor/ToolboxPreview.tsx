import "./toolboxPreview.css";
import { BlocklyWorkspace } from "react-blockly";
import Blockly from "blockly";
import { useTranslation } from "react-i18next";
import { BlockType, getBlockFromId } from "../../../../blocks";
import { categorizedToolbox, setupBlocklyBlocks, uncategorizedToolbox } from "../../../../../blockly";

type ToolboxPreviewProps = {
  blocksToPreview: string[]
  categorized: boolean
}

export const ToolboxPreview = ({blocksToPreview, categorized}: ToolboxPreviewProps) => {
  const {t} = useTranslation("blocks")

  const blocksWithCategories: BlockType[] = blocksToPreview.map(getBlockFromId)

  setupBlocklyBlocks(t)

  return (
      <>
      <div style={{ height: "600px", width: "800px"}} key={"blockly" + categorized + blocksToPreview.length}> {/* The key is needed to force a rerender on categorized change an blocks change. Without this it crashes or it doesnt update.*/}
          <BlocklyWorkspace
          toolboxConfiguration={categorized ? categorizedToolbox(blocksWithCategories) : uncategorizedToolbox(blocksWithCategories)}
          className="fill-height"
          workspaceConfiguration={{trashcan:false, scrollbars: false}} //Needed to make it look like this is only the toolbox
          onWorkspaceChange={() => {Blockly.getMainWorkspace().clear()}} //Needed to make it look like this is only the toolbox
          />
      </div>
      </>
  );
};
