import { useTranslation } from "react-i18next";
import { BlockType, getBlockFromId } from "./blocks";
import { Toolbox, categorizedToolbox, setupBlockly, setupBlocklyBlocks, setXml, uncategorizedToolbox } from "./blockly";
import { PBCard } from "../PBCard";
import { Box, PaperProps, Typography } from "@mui/material";
import { useState } from "react";
import Blockly from "blockly/core"
import { useThemeContext } from "../../theme/ThemeContext";

// inject options https://developers.google.com/blockly/reference/js/blockly.blocklyoptions_interface.md

export type PBBlocklyWorkspaceProps = {
  blockIds: string[]
  categorized: boolean
  sx?: PaperProps["sx"]
  title?: boolean
  initialXml?: string;
  workspaceConfiguration?: Blockly.BlocklyOptions;
}

export const PBBlocklyWorkspace = ({ blockIds, categorized, sx, title, ...props }: PBBlocklyWorkspaceProps) => {
  const { t } = useTranslation("blocks")

  const { blocklyTheme, isSmallScreen } = useThemeContext()

  const [blocklyContainer, setBlocklyContainer] = useState<Element>()

  const blocksWithCategories: BlockType[] = blockIds.map(getBlockFromId)

  const toolbox: Toolbox = categorized ? categorizedToolbox(t, blocksWithCategories) : uncategorizedToolbox(blocksWithCategories)

  setupBlocklyBlocks(t)

  if (blocklyContainer) setupBlockly(blocklyContainer, { theme: blocklyTheme, toolbox, ...props.workspaceConfiguration }) 
  
  if (blocklyContainer && props.initialXml) setXml(props.initialXml)

  return (
    <PBCard sx={{ ...sx }}>
      {title && <Typography>{t('preview')}</Typography>}
      <Box width="100%" height="100%" ref={setBlocklyContainer} data-testid='pb-blockly' className="blockly" />
    </PBCard>
  )
}



