import styles from "./ToolboxPreview.module.css";
import { BlocklyWorkspace } from "react-blockly";
import { useTranslation } from "react-i18next";
import { BlockType, getBlockFromId } from "../blocks";
import { categorizedToolbox, setupBlocklyBlocks, uncategorizedToolbox } from "../../blockly";
import Blockly from "blockly";
import { PBCard } from "../PBCard";
import { PaperProps } from "@mui/material";

type ToolboxPreviewProps = {
  blocksToPreview: string[]
  categorized: boolean
  sx?: PaperProps["sx"]
}

export const ToolboxPreview = ({blocksToPreview, categorized, sx}: ToolboxPreviewProps) => {
  const {t} = useTranslation("blocks")
    
  const blocksWithCategories: BlockType[] = blocksToPreview.map(getBlockFromId)

  setupBlocklyBlocks(t)

  return <PBCard sx={{...sx}}>
        <BlocklyWorkspace
          key={blocksToPreview.join("") + categorized} //rerenders on toolbox or categorization changes
          toolboxConfiguration={categorized ? categorizedToolbox(blocksWithCategories) : uncategorizedToolbox(blocksWithCategories)}
          className={styles.fill}
          workspaceConfiguration={{trashcan:false, scrollbars: false}} //Needed to make it look like this is only the toolbox
          onWorkspaceChange={() => {Blockly.getMainWorkspace().clear()}} //Needed to make it look like this is only the toolbox
        />
      </PBCard>
}
