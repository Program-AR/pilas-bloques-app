import { PaperProps } from "@mui/material";
import { useThemeContext } from "../../../../../theme/ThemeContext";
import { PBBlocklyWorkspace } from "../../../../blockly/PBBlocklyWorkspace"

type ToolboxPreviewProps = {
  categorized: boolean,
  blockIds: string[]
}

export const ToolboxPreview = ({ categorized, blockIds }: ToolboxPreviewProps) => {
  const { isSmallScreen } = useThemeContext()

  const sx: PaperProps["sx"] = isSmallScreen ? {
    ".blocklyToolboxDiv": { position: "relative !important" },
    ".blocklyNonSelectable.blocklyToolboxDiv": { height: "auto !important" },
    ".blocklyFlyout": { transform: "translate(0px, 0px) !important" },
    ".blocklyBlockCanvas": { scale: "0.8 !important" }
  } : {} // used only in toolboxpreview to show blocks under the categories

  return <PBBlocklyWorkspace
    sx={{ minWidth: isSmallScreen ? "auto" : "50%", padding: "5px", display: "flex", flexDirection: "column", ...sx }}
    title
    blockIds={blockIds}
    categorized={categorized}
    workspaceConfiguration={{ trashcan: false, scrollbars: false }} //Needed to make it look like this is only the toolbox
  />

}