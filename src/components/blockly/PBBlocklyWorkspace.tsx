import { useTranslation } from "react-i18next";
import { BlockType, getBlockFromId } from "./blocks";
import { Toolbox, categorizedToolbox, setupBlocklyBlocks, uncategorizedToolbox } from "./blockly";
import { PBCard } from "../PBCard";
import { Box, PaperProps, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import Blockly from "blockly/core"
import { useThemeContext } from "../../theme/ThemeContext";

/* inject options https://developers.google.com/blockly/reference/js/blockly.blocklyoptions_interface.md

collapse
comments
css
disable
grid
horizontalLayout
maxBlocks
maxInstances
media
move
oneBasedIndex
readOnly
renderer
rtl
scrollbars
sounds
theme
toolbox
toolboxPosition
trashcan
maxTrashcanContents
plugins
zoom
*/

export type PBBlocklyWorkspaceProps = {
  blockIds: string[]
  categorized: boolean
  sx?: PaperProps["sx"]
  title?: boolean
  initialXml?: string;
  workspaceConfiguration?: Blockly.BlocklyOptions;
}

export const PBBlocklyWorkspace = ({ blockIds, categorized, sx, title, ...props }: PBBlocklyWorkspaceProps) => {
  const wrapperRef = useRef();
  const [workspace, setWorkspace] = useState<Blockly.WorkspaceSvg>();
  const [wasCategorized, setWasCategorized] = useState<Boolean | null>(null)

  const { t } = useTranslation("blocks")
  const { blocklyTheme } = useThemeContext()

  const blocksWithCategories: BlockType[] = blockIds.map(getBlockFromId)

  const toolbox: Toolbox = categorized ? categorizedToolbox(t, blocksWithCategories) : uncategorizedToolbox(blocksWithCategories)

  setupBlocklyBlocks(t)

  useEffect(() => {
    if (workspace)
      workspace.setTheme(blocklyTheme)
  }, [blocklyTheme]);

  useEffect(() => {
    if (wrapperRef.current && workspace) {
      if (wasCategorized !== null && categorized !== wasCategorized) {
        workspace.dispose()

        setWorkspace(Blockly.inject(wrapperRef.current, {
          theme: blocklyTheme,
          toolbox: toolbox,
          ...props.workspaceConfiguration
        }));
      }
      else {
        workspace.updateToolbox(toolbox)
        workspace.getToolbox()?.clearSelection()
      }

      setWasCategorized(categorized)
    }
  }, [blockIds, categorized]);

  useEffect(() => {
    if (wrapperRef.current && !workspace) {
      setWasCategorized(categorized)
      setWorkspace(Blockly.inject(wrapperRef.current, {
        theme: blocklyTheme,
        toolbox: toolbox,
        ...props.workspaceConfiguration
      }));
    }

    if (props.initialXml) {
      Blockly.Xml.domToWorkspace(
        Blockly.utils.xml.textToDom(props.initialXml),
        Blockly.getMainWorkspace(),
      );
    }

    return () => {
      if (workspace)
        (workspace as Blockly.WorkspaceSvg).dispose();
    };
  }, []);

  return (
    <PBCard sx={{ ...sx }}>
      {title && <Typography>{t('preview')}</Typography>}
      <Box width="100%" height="100%" ref={wrapperRef} className="blockly" />
    </PBCard>
  )
}
