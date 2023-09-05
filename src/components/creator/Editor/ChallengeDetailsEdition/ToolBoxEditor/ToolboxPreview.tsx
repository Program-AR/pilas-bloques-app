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
  const {t} = useTranslation()

  const blocksWithCategories: BlockType[] = blocksToPreview.map(getBlockFromId)

  console.log(categorizedToolbox(blocksWithCategories))

  setupBlocklyBlocks(t)

  return (
      <>
      <div style={{ height: "600px", width: "800px"}}>
          <BlocklyWorkspace
          toolboxConfiguration={categorized ? categorizedToolbox(blocksWithCategories) : categorizedToolbox(blocksWithCategories)}
          className="fill-height"
          workspaceConfiguration={{trashcan:false, scrollbars: false}} //Needed to make it look like this is only the toolbox
          onWorkspaceChange={() => {Blockly.getMainWorkspace().clear()}} //Needed to make it look like this is only the toolbox
          />
      </div>
      </>
  );
};
