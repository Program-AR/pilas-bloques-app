import "./prueba.css";
import { BlocklyWorkspace } from "react-blockly";
import Blockly from "blockly";
import { useTranslation } from "react-i18next";
import { BlockType } from "./blocks";

type BlocklyBlockDefinition = {
  message0: string
  args0: any[]
  colour: string
  previousStatement?: boolean
  nextStatement?: boolean
}

type Toolbox = { kind: "categoryToolbox" | "flyoutToolbox", contents: ToolboxItem[]}

type ToolboxItem = ToolboxBlock | ToolBoxCategory

type ToolboxBlock = {kind: "block", type: string}
type ToolBoxCategory = {kind: "category", name: string, contents: ToolboxItem[]}


const createPrimitiveBlock = (id: string, message: string, icon?: string) => {
  const colour = '#4a6cd4'

  const jsonInit: BlocklyBlockDefinition = {
    message0: message,
    colour,
    args0: [],
    previousStatement: true,
    nextStatement: true
  }

  if(icon) {
    jsonInit.message0 = `%1 ${message}`
    jsonInit.args0.push({
      "type": "field_image",
      "src": `imagenes/iconos/${icon}`,
      "width": 16,
      "height": 16,
      "alt": "*"
    })
  }

  Blockly.Blocks[id] = {
    init: function () {
      this.jsonInit(jsonInit)
    }}
}


const categoryToolboxFromBlocks = (blocks: BlockType[]): Toolbox => ({
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Primitivas",
      contents: blocks.filter(block => block.categoryId === "primitives").map(blockTypeToToolboxBlock)
    }
  ]
})

const uncategorizedToolboxFromBlocks = (blocks: BlockType[]): Toolbox => ({
  kind: "flyoutToolbox",
  contents: blocks.map(blockTypeToToolboxBlock)
})

const blockTypeToToolboxBlock = (block: BlockType): ToolboxBlock => ({kind: "block", type: block.id})

export const BlocklyPrueba = () => {
  const {t} = useTranslation("blocks")

  createPrimitiveBlock("MoverACasillaArriba", t("blocks.moveUp"), "icono.arriba.png")
  createPrimitiveBlock("MoverACasillaAbajo", t("blocks.moveDown"), "icono.abajo.png")
  createPrimitiveBlock("MoverACasillaIzquierda", t("blocks.moveLeft"), "icono.izquierda.png")
  createPrimitiveBlock("MoverACasillaDerecha", t("blocks.moveRight"), "icono.derecha.png")

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
