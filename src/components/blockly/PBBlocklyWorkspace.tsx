import styles from "./PBBlocklyWorkspace.module.css";
import { BlocklyWorkspace } from "react-blockly";
import { useTranslation } from "react-i18next";
import { BlockType, getBlockFromId } from "./blocks";
import { categorizedToolbox, setupBlocklyBlocks, uncategorizedToolbox } from "./blockly";
import { PBCard } from "../PBCard";
import { PaperProps, Typography } from "@mui/material";
import { BlocklyWorkspaceProps } from "react-blockly/dist/BlocklyWorkspaceProps";
import { useThemeContext } from "../../theme/ThemeContext";

export type PBBlocklyWorkspaceProps = {
  blockIds: string[]
  categorized: boolean
  sx?: PaperProps["sx"]
  title?: boolean
} & Partial<BlocklyWorkspaceProps>

export const PBBlocklyWorkspace = ({ blockIds, categorized, sx, title, ...props }: PBBlocklyWorkspaceProps) => {
  const { t } = useTranslation("blocks")
  const { isSmallScreen } = useThemeContext()
 
  const blocksWithCategories: BlockType[] = blockIds.map(getBlockFromId)

  setupBlocklyBlocks(t)
    
  // con la version de scroll en las categorias del toolbox en la visualizacion del desafio en pantalla chica se hace con esto en el sx ".blocklyToolboxContents": { flexWrap: "noWrap" }, 
  
  return <PBCard sx={ isSmallScreen ? {...sx, ".blocklyToolboxDiv": { position: "relative !important"  }, 
                                              ".blocklyNonSelectable.blocklyToolboxDiv": { height: "auto !important"  }, 
                                              ".blocklyFlyout": { transform: "translate(0px, 0px) !important" },
                                              ".blocklyBlockCanvas": { scale: "0.8 !important" }} 
                                    : { ...sx  }}>
                                                                       
  {title && <Typography>{t('preview')}</Typography>}
  <BlocklyWorkspace
    data-testid={blockIds.join(",")}
    key={blockIds.join("") + categorized} //rerenders on toolbox or categorization changes
    toolboxConfiguration={categorized ? categorizedToolbox(t, blocksWithCategories) : uncategorizedToolbox(blocksWithCategories)}
    workspaceConfiguration={{}}
    onWorkspaceChange={() => { }}
    onImportXmlError={() => { }}
    onImportError={() => { }}
    onXmlChange={() => { }}
    onJsonChange={() => { }}
    onInject={() => { }}
    onDispose={() => { }}
    className={styles.fill}
    {...props}
  />
</PBCard>
}
