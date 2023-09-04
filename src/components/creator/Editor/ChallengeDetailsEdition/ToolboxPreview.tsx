import "./prueba.css";
import { BlocklyWorkspace } from "react-blockly";
import Blockly from "blockly";
import { useTranslation } from "react-i18next";
import { BlockType } from "../../../blocks";
import { categoryToolboxFromBlocks, setupBlocklyBlocks } from "../../../../blockly";


export const ToolboxPreview = () => {
  const {t} = useTranslation()

  setupBlocklyBlocks(t)

  const toolboxBlocks: BlockType[] = [
    {
      id: 'MoverACasillaDerecha',
      intlId: 'moveRight',
      categoryId: 'primitives'
  },
  {
      id: 'MoverACasillaIzquierda',
      intlId: 'moveLeft',
      categoryId: 'primitives'
  },
  {
      id: 'MoverACasillaArriba',
      intlId: 'moveUp',
      categoryId: 'primitives'
  },
  {
      id: 'MoverACasillaAbajo',
      intlId: 'moveDown',
      categoryId: 'primitives'
  },
  ]

  return (
      <>
      <div style={{ height: "600px", width: "800px"}}>
          <BlocklyWorkspace
          toolboxConfiguration={categoryToolboxFromBlocks(toolboxBlocks)}
          className="fill-height"
          workspaceConfiguration={{trashcan:false, scrollbars: false}}
          onWorkspaceChange={() => {Blockly.getMainWorkspace().clear()}}
          />
      </div>
      </>
  );
};
