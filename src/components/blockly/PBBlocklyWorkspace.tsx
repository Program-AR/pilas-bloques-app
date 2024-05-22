import { useTranslation } from "react-i18next";
import { BlockType, getBlockFromId } from "./blocks";
import { Toolbox, categorizedToolbox, setupBlocklyBlocks, uncategorizedToolbox } from "./blockly";
import { PBCard } from "../PBCard";
import { Box, PaperProps, Typography } from "@mui/material";
import { useEffect, useState, useRef, MutableRefObject, Ref } from "react";
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

  const [wrapperRef, setWrapperRef] = useState<Element>()

  const { t } = useTranslation("blocks")
  const { blocklyTheme } = useThemeContext()

  const blocksWithCategories: BlockType[] = blockIds.map(getBlockFromId)

  const toolbox: Toolbox = categorized ? categorizedToolbox(t, blocksWithCategories) : uncategorizedToolbox(blocksWithCategories)

  setupBlocklyBlocks(t)


  if (wrapperRef) {

    wrapperRef.replaceChildren() //Removes previous injection, otherwise it will keep inserting below the current workspace

    Blockly.inject(wrapperRef, {
      theme: blocklyTheme,
      toolbox: toolbox,
      ...props.workspaceConfiguration
    })
  }

  if (props.initialXml) {
    Blockly.Xml.domToWorkspace(
      Blockly.utils.xml.textToDom(props.initialXml),
      Blockly.getMainWorkspace()
    );
  }

  return (
    <PBCard sx={{ ...sx }}>
      {title && <Typography>{t('preview')}</Typography>}
      <Box width="100%" height="100%" ref={setWrapperRef} className="blockly" />
    </PBCard>
  )
}
