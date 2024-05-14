import styles from "./PBBlocklyWorkspace.module.css";
import { BlocklyWorkspace } from "react-blockly";
import { useTranslation } from "react-i18next";
import { BlockType, getBlockFromId } from "./blocks";
import { categorizedToolbox, setupBlocklyBlocks, uncategorizedToolbox, xmlBloqueEmpezarAEjecutar } from "./blockly";
import { PBCard } from "../PBCard";
import { Box, Button, Paper, PaperProps, Typography } from "@mui/material";
import { BlocklyWorkspaceProps } from "react-blockly/dist/BlocklyWorkspaceProps";
import React, { useEffect, useState, RefObject } from "react";
import Blockly from "blockly/core"

export type PBBlocklyWorkspaceProps = {
  blockIds: string[]
  categorized: boolean
  sx?: PaperProps["sx"]
  title?: boolean
} & Partial<BlocklyWorkspaceProps>


const MyBlocklyWorkspace = () => {
 return <Box  id="blocklyDiv" height="100%" width="100%">
   </Box>
}
 

export const PBBlocklyWorkspace = ({blockIds, categorized, sx, title, ...props}: PBBlocklyWorkspaceProps) => {
  const {t} = useTranslation("blocks")
    
  const blocksWithCategories: BlockType[] = blockIds.map(getBlockFromId)
  const [view, setView] = useState<boolean>(false)

  setupBlocklyBlocks(t)

/*
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

  useEffect(() => {
    if (view) 
    Blockly.inject('blocklyDiv', {
        toolbox: categorized ? categorizedToolbox(t, blocksWithCategories) : uncategorizedToolbox(blocksWithCategories),
        //initialXml: {xmlBloqueEmpezarAEjecutar},
        toolboxPosition: 'start', 
        trashcan: true, 
        scrollbars: true, 
        horizontalLayout: false
      })
  }, [view])

  return <PBCard sx={{...sx}}>
        <MyBlocklyWorkspace/>
        <Button onClick={() => setView(!view)}>activar</Button>
        {title && <Typography>{t('preview')}</Typography>}
{/*}
        <BlocklyWorkspace
          data-testid={blockIds.join(",")}
          key={blockIds.join("") + categorized} //rerenders on toolbox or categorization changes
          toolboxConfiguration={categorized ? categorizedToolbox(t, blocksWithCategories) : uncategorizedToolbox(blocksWithCategories)}
          workspaceConfiguration={{}}
          onWorkspaceChange={()=>{}}
          onImportXmlError={()=>{}}
          onImportError={()=>{}}
          onXmlChange={()=>{}}
          onJsonChange={()=>{}}
          onInject={()=>{}}
          onDispose={()=>{}}
          className={styles.fill}
          {...props}
/>*/}
      </PBCard>
}
