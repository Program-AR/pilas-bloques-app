import { BlockType } from "./blocks"
import Es from 'blockly/msg/es';
import Blockly from "blockly/core"

Blockly.setLocale(Es); // TODO: this needs to be taken from chosen intl

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

const blockTypeToToolboxBlock = (block: BlockType): ToolboxBlock => ({kind: "block", type: block.id})

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
  
  
export const categorizedToolbox = (blocks: BlockType[]): Toolbox => ({
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: "Primitivas",
        contents: blocks.filter(block => block.categoryId === "primitives").map(blockTypeToToolboxBlock)
      }
    ]
})
  
export const uncategorizedToolbox = (blocks: BlockType[]): Toolbox => ({
    kind: "flyoutToolbox",
    contents: blocks.map(blockTypeToToolboxBlock)
})

export const setupBlocklyBlocks = (t: (key: string) => string) => {
  createPrimitiveBlock("MoverACasillaArriba", t("blocks.moveUp"), "icono.arriba.png")
  createPrimitiveBlock("MoverACasillaAbajo", t("blocks.moveDown"), "icono.abajo.png")
  createPrimitiveBlock("MoverACasillaIzquierda", t("blocks.moveLeft"), "icono.izquierda.png")
  createPrimitiveBlock("MoverACasillaDerecha", t("blocks.moveRight"), "icono.derecha.png")

}