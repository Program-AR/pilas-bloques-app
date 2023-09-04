import "./prueba.css";
import { BlocklyWorkspace } from "react-blockly";
import Blockly from "blockly";
import { useTranslation } from "react-i18next";

type BlocklyBlockDefinition = {
  message0: string
  args0: any[]
  colour: string
  previousStatement?: boolean
  nextStatement?: boolean
}

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


const categoryToolboxFromBlocks = (blocks: any[]) => ({
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Primitivas",
      contents: blocks.filter(block => block.categoryId === "primitives")
    
    }
  ]
})

const uncategorizedToolboxFromBlocks = (blocks: any[]) => ({
  kind: "flyoutToolbox",
  contents: blocks
})


export const BlocklyPrueba = () => {
  const {t} = useTranslation("blocks")

  createPrimitiveBlock("moveUp", t("blocks.moveUp"), "icono.arriba.png")
  createPrimitiveBlock("moveDown", t("blocks.moveDown"), "icono.abajo.png")
  createPrimitiveBlock("moveLeft", t("blocks.moveLeft"), "icono.izquierda.png")
  createPrimitiveBlock("moveRight", t("blocks.moveRight"), "icono.derecha.png")

  const toolboxBlocks = [
    {
      kind: "block",
      type: "moveUp",
      categoryId: 'primitives'
    },
    {
      kind: "block",
      type: "moveDown",
      categoryId: 'primitives'
    },
    {
      kind: "block",
      type: "moveLeft",
      categoryId: 'primitives'
    },
    {
      kind: "block",
      type: "moveRight",
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
