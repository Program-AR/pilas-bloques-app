import styles from "./PBBlocklyWorkspace.module.css";
import { BlocklyWorkspace } from "react-blockly";
import { useTranslation } from "react-i18next";
import { BlockType, getBlockFromId } from "./blocks";
import { categorizedToolbox, setupBlocklyBlocks, uncategorizedToolbox, xmlBloqueEmpezarAEjecutar } from "./blockly";
import { PBCard } from "../PBCard";
import { Box, Button, Paper, PaperProps, Typography } from "@mui/material";
import { BlocklyWorkspaceProps } from "react-blockly/dist/BlocklyWorkspaceProps";
import React, { useEffect, useState, RefObject, useRef, useMemo } from "react";
import Blockly from "blockly/core"

export type PBBlocklyWorkspaceProps = {
  blockIds: string[]
  categorized: boolean
  sx?: PaperProps["sx"]
  title?: boolean
  initialXml?: string;
  workspaceConfiguration?: Blockly.BlocklyOptions;
}

const MyBlockly = ({ blockIds, categorized, sx, title, ...props }: PBBlocklyWorkspaceProps) => {
  const wrapperRef = useRef();
  const [workspace, setWorkspace] = useState<Blockly.WorkspaceSvg>();
  const [wasCategorized, setWasCategorized] = useState<Boolean | null>(null)
  
  const { t } = useTranslation("blocks")
  
  const blocksWithCategories: BlockType[] = blockIds.map(getBlockFromId)

  setupBlocklyBlocks(t)

  useEffect(() => {
    if (wrapperRef.current && workspace) {
      if(wasCategorized !== null && categorized !== wasCategorized)
        {
        workspace.dispose()
        setWorkspace(Blockly.inject(wrapperRef.current, {
          toolbox: categorized ? categorizedToolbox(t, blocksWithCategories) : uncategorizedToolbox(blocksWithCategories),
          //...props.workspaceConfiguration
        })); 
        }
      else 
        workspace.updateToolbox(categorized ? categorizedToolbox(t, blocksWithCategories) : uncategorizedToolbox(blocksWithCategories))
      
      setWasCategorized(categorized)
    }
  }, [blockIds, categorized]);

  useEffect(() => {
    if (wrapperRef.current && !workspace) {
      setWasCategorized(categorized)
      setWorkspace(Blockly.inject(wrapperRef.current, {
        toolbox: categorized ? categorizedToolbox(t, blocksWithCategories) : uncategorizedToolbox(blocksWithCategories),
        //...props.workspaceConfiguration
      }));
   /*
    if (props.initialXml && workspace ) {
      let block = (workspace as Blockly.WorkspaceSvg).newBlock(xmlBloqueEmpezarAEjecutar);
      block.initSvg();
//      workspace.render();
    }*/
  }

    return () => {
      if (workspace)
        (workspace as Blockly.WorkspaceSvg).dispose();
    };
  }, []);

  return (<Box width="100%" height="100%" ref={wrapperRef} className="blockly" />)
}



export const PBBlocklyWorkspace = ({ blockIds, categorized, sx, title, ...props }: PBBlocklyWorkspaceProps) => {
  const { t } = useTranslation("blocks")
  return <PBCard sx={{ ...sx }}>
    {title && <Typography>{t('preview')}</Typography>}
    <MyBlockly
      blockIds={blockIds}
      categorized={categorized} />    
  </PBCard>
}
