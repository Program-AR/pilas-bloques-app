import { BlockType, categories } from "./blocks"
import * as Es from 'blockly/msg/es';
import * as Blockly from 'blockly/core'
import { javascriptGenerator, Order } from 'blockly/javascript'
import { enableUnwantedProcedureBlocks, disableUnwantedProcedureBlocks, optionType, createCommonBlocklyBlocks, validateRequiredOptions } from "./utils";
import 'blockly/blocks';
//@ts-ignore
import { ProcedsBlocklyInit } from "blockly-proceds";


Blockly.setLocale(Es); // TODO: this needs to be taken from chosen intl

type BlocklyBlockDefinition = {
  type?: string
  inputs?: any
  message0: string
  args0: any[]
  message1?: string
  args1?: any[]
  colour: string
  toolbox?: string
  previousStatement?: any
  nextStatement?: any
  inputsInline?: any
  output?: any
  helpUrl?: any
  code?: string
}

export type Toolbox = { kind: "categoryToolbox" | "flyoutToolbox", contents: ToolboxItem[] }
type ToolboxItem = ToolboxBlock | ToolBoxCategory
type ToolboxBlock = { kind: "block", type: string }
type ToolBoxCategory = { kind: "category" | '', name: string, contents: ToolboxItem[], custom?: string }

const primitivesColor = '#4a6cd4';
const controlColor = '#ee7d16';
const sensorsColor = '#2ca5e2';
const directionsColor = '#2ba4e2';
const othersColor = '#cc5b22';
const eventsColor = '#00a65a'; // == boton ejecutar

export const xmlBloqueEmpezarAEjecutar = `<xml xmlns="http://www.w3.org/1999/xhtml">
              <block type="al_empezar_a_ejecutar" x="15" y="15"></block>
            </xml>`

const blockTypeToToolboxBlock = (block: BlockType): ToolboxBlock => ({ kind: "block", type: block.id })

const createGenericJSCode = (id: string, customCode: string) => {
  javascriptGenerator.forBlock[id] = function (block: { getFieldValue: (arg0: string) => any; }, generator: { statementToCode: (arg0: any, arg1: string) => any; valueToCode: (arg0: any, arg1: string, arg2: any) => any; }) {
    let variables = customCode.match(/\$(\w+)/g);
    let code = customCode;

    if (variables) {
      variables.forEach((v) => {
        let regex = new RegExp('\\' + v, "g");
        let variable_name = v.slice(1);

        var variable_object = null;

        if (variable_name === "DO") {
          variable_object = generator.statementToCode(block, variable_name);
        } else {
          variable_object = generator.valueToCode(block, variable_name, Order.ATOMIC) || block.getFieldValue(variable_name) || null;
        }

        code = code.replace(regex, variable_object);
      });
    }

    return code;
  };
}

const messageBlock = (message: string) => {
  if (message.includes('%1'))
    return `%2 ${message}`
  return `%1 ${message}`
}

const createPrimitiveBlock = (id: string, message: string, options: optionType, icon?: string, blockDefinition?: BlocklyBlockDefinition) => {
  validateRequiredOptions(id, options, ['comportamiento', 'argumentos']);

  const jsonInit: BlocklyBlockDefinition = (blockDefinition ? blockDefinition : {
    message0: `${message}`,
    colour: primitivesColor,
    previousStatement: true,
    nextStatement: true,
    args0: [],
  })

  if (icon) {
    jsonInit.message0 = messageBlock(message)
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
    }
  }

  createGenericJSCode(id, jsonInit.code || `hacer(actor_id, "${options.comportamiento}", ${options.argumentos});`)

}

const createSensorBlock = (id: string, message: string, options: optionType, icon?: string, blockDefinition?: BlocklyBlockDefinition) => {
  validateRequiredOptions(id, options, ['funcionSensor']);

  const jsonInit: BlocklyBlockDefinition = (blockDefinition ? blockDefinition : {
    message0: `${message}`,
    colour: sensorsColor,
    inputsInline: true,
    args0: [],
    output: null,
  })

  if (icon) {
    jsonInit.message0 = messageBlock(message)
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
    }
  }

  javascriptGenerator.forBlock[id] = function () {
    const codigo = `evaluar(${JSON.stringify(options['funcionSensor'])})`;
    return [codigo, Order.ATOMIC];
  }

}

const createValueBlock = (id: string, message: string, options: optionType, icon: string, blockDefinition?: BlocklyBlockDefinition) => {
  validateRequiredOptions(id, options, ['valor']);

  const jsonInit: BlocklyBlockDefinition = (blockDefinition ? blockDefinition : {
    message0: `${message}`,
    colour: directionsColor,
    args0: [],
    output: 'String'
  })

  if (icon) {
    jsonInit.message0 = messageBlock(message)
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
    }
  }

  javascriptGenerator.forBlock[id] = function () {
    return [`'${options.valor}'`, Order.ATOMIC];
  };

}

const createFirstBlock = (t: (key: string) => string) => {
  Blockly.Blocks['al_empezar_a_ejecutar'] = {
    init: function () {
      this.setColour(eventsColor);
      this.appendDummyInput().appendField(t('blocks.program'));
      this.appendStatementInput('program');
      this.setDeletable(false);
      this.setEditable(false);
      this.setMovable(false);
    },
  };

  javascriptGenerator.forBlock['al_empezar_a_ejecutar'] = function (block: any, generator: { statementToCode: (arg0: any, arg1: string) => any; }) {
    const program = generator.statementToCode(block, 'program');
    const code = `${program}`;
    return code;
  };

}

const createPrimitiveBlocks = (t: (key: string) => string) => {

  createPrimitiveBlock("MoverACasillaArriba", t("blocks.moveUp"), {
    'comportamiento': 'MoverACasillaArriba',
    'argumentos': '{}'
  }, "icono.arriba.png")

  createPrimitiveBlock("MoverACasillaAbajo", t("blocks.moveDown"), {
    'comportamiento': 'MoverACasillaAbajo',
    'argumentos': '{}'
  }, "icono.abajo.png")

  createPrimitiveBlock("MoverACasillaIzquierda", t("blocks.moveLeft"), {
    'comportamiento': 'MoverACasillaIzquierda',
    'argumentos': '{}'
  }, "icono.izquierda.png")

  createPrimitiveBlock("MoverACasillaDerecha", t("blocks.moveRight"), {
    'comportamiento': 'MoverACasillaDerecha',
    'argumentos': '{}'
  }, "icono.derecha.png")

  createPrimitiveBlock('RecogerTrofeo', t("blocks.pickTrophy"), {
    'comportamiento': 'Recolectar',
    'argumentos': '{etiqueta: "Trofeo", "mensajeError": "Acá no hay un trofeo"}',
  },
    'icono.trofeo.png');

  createPrimitiveBlock('RecogerPaleta', t("blocks.pickPaddle"), {
    'comportamiento': 'Recolectar',
    'argumentos': '{etiqueta: "Paleta", "mensajeError": "Acá no hay una paleta"}',
  }, 'icono.paleta.png'
  );

  createPrimitiveBlock('RebotarPingPong', t("blocks.bouncePingPong"), {
    'comportamiento': 'Recolectar',
    'argumentos': '{etiqueta: "PingPong", nombreAnimacion:"usarPaleta", animacionInteractuadoMientras: "desaparecer", "mensajeError": "Acá no hay una pelota de ping pong"}',
  }, 'icono.pelota-pingpong.png'
  );

  createPrimitiveBlock('PatearPulpito', t("blocks.bounceRubberBall"), {
    'comportamiento': 'Recolectar',
    'argumentos': '{etiqueta: "Pulpito", nombreAnimacion:"rebotarPulpito", animacionInteractuadoMientras: "desaparecer", "mensajeError": "Acá no hay una pelota"}',
  }, 'icono.pelota-pulpo.png'
  )

  createPrimitiveBlock('RevolearPulpito', t("blocks.volleyRubberBall"), {
    'comportamiento': 'Interactuar',
    'argumentos': '{etiqueta: "Pulpito", nombreAnimacion:"revolearPulpito", "mensajeError": "Acá no hay una pelota", idTransicion: "revolearPulpito"}',
  }, 'icono.pelota-pulpo.png'
  )

  createPrimitiveBlock('RebotarPiePulpito', t("blocks.bounceFootRubberBall"), {
    'comportamiento': 'Interactuar',
    'argumentos': '{etiqueta: "Pulpito", nombreAnimacion:"rebotarPulpito", "mensajeError": "Acá no hay una pelota", idTransicion: "rebotarPiePulpito"}',
  }, 'icono.pelota-pulpo.png'
  )

  createPrimitiveBlock('RecogerPulpito', t("blocks.pickRubberBall"), {
    'comportamiento': 'Interactuar',
    'argumentos': '{etiqueta: "Pulpito", nombreAnimacion: "recoger", animacionInteractuadoMientras: "desaparecer", "mensajeError": "Acá no hay una pelota", idTransicion: "recoger"}',
  },
    'icono.pelota-pulpo.png'
  )

  createPrimitiveBlock('RebotarUnaVezPingPong', t("blocks.bouncePingPong"), {
    'comportamiento': 'PingPongAnimado',
    'argumentos': '{mensaje: "Rebotando...", etiqueta: "PingPong", nombreAnimacion:"usarPaletaUnaVez", animacionInteractuadoMientras: "desaparecer" }',
  },
    'icono.paleta.png'
  );

  createPrimitiveBlock('DespertarLuciernaga', t("blocks.wakeUpFirefly"), {
    'comportamiento': 'SacarFoto',
    'argumentos': "{'etiqueta':'Luciernaga'}"
  }, 'icono.luciernaga-prendida.png'
  );

  createPrimitiveBlock('FotografiarMariposa', t("blocks.photographButterfly"), {
    'comportamiento': 'Recolectar',
    'argumentos': '{etiqueta: "Mariposa", nombreAnimacion: "sacarFoto", "mensajeError": "Acá no hay una mariposa"}',
  }, 'icono.mariposa.png'
  );

  createPrimitiveBlock('DesbloquearCelular', t("blocks.unlockCellphone"), {
    'comportamiento': 'Recolectar',
    'argumentos': `{
      etiqueta: "Celular",
      nombreAnimacion: "usarCelu",
      "mensajeError": "Acá no hay un celular",
      animacionInteractuadoMientras: "desaparecer"
    }`,
  }, 'icono.celular-prendido.png'
  );

  createPrimitiveBlock('AgarrarCargador', t("blocks.pickCharger"), {
    'comportamiento': 'Recolectar',
    'argumentos': `{ etiqueta: "Cargador" }`
  }, 'icono.cargador.png'
  );

  createPrimitiveBlock('CargarCelular', t("blocks.chargeCellphone"), {
    'comportamiento': 'CargarCelular',
    'argumentos': `{ etiqueta: "Celular", animacionInteractuadoMientras: "desaparecer" }`,
  }, 'icono.celular-prendido.png'
  );

  createPrimitiveBlock('ObservarEstrella', t("blocks.watchStar"), {
    'comportamiento': 'ObservoEstrella',
    'argumentos': '{etiqueta: "Estrella", nombreAnimacion: "usarCatalejo", "mensajeError": "Acá no hay una estrella"}',
  }, 'icono.estrella.png'
  );

  createPrimitiveBlock('ObservarPlaneta', t("blocks.watchPlanet"), {
    'comportamiento': 'ObservoPlaneta',
    'argumentos': '{etiqueta: "Planeta", nombreAnimacion: "usarCatalejo", "mensajeError": "Acá no hay un planeta"}',
  }, 'icono.planeta.png'
  );

  createPrimitiveBlock('RepararTelescopio', t("blocks.repairTelescope"), {
    'comportamiento': 'RepararTelescopio',
    'argumentos': `{ etiqueta: "Telescopio" }`,
  }, 'icono.telescopio.png'
  );

  createPrimitiveBlock('AlinearTelescopio', t("blocks.repairTelescope"), {
    'comportamiento': 'RepararTelescopio',
    'argumentos': `{ etiqueta: "Telescopio" }`,
  }, 'icono.telescopio.png'
  );

  createPrimitiveBlock('RecogerLata', t("blocks.pickCan"), {
    'comportamiento': 'RecojoLata',
    'argumentos': '{etiqueta: "Lata", nombreAnimacion: "recoger", "mensajeError": "Acá no hay una lata"}',
  }, 'icono.lata.png'
  );

  createPrimitiveBlock('SubirPajarito', t("blocks.pickBird"), {
    'comportamiento': 'SubirPajarito',
    'argumentos': '{etiqueta: "Guyra", nombreAnimacion: "recoger", "mensajeError": "Guyra no está aca"}',
  }, 'icono.guyra.png'
  );

  createPrimitiveBlock('RecogerPapel', t("blocks.pickPaper"), {
    'comportamiento': 'RecojoPapel',
    'argumentos': '{etiqueta: "Papel", nombreAnimacion: "recoger", "mensajeError": "Acá no hay un papel"}',
  }, 'icono.papel.png'
  );

  createPrimitiveBlock('SostenerPapel', t("blocks.holdPaper"), {
    'comportamiento': 'Sostener',
    'argumentos': `{
      etiqueta: "Papel",
      nombreAnimacion: "recoger",
      "mensajeError": "Acá no hay un papel"
    }`,
  }, 'icono.papel.png'
  );

  createPrimitiveBlock('LlenarTacho', t("blocks.fillBin"), {
    'comportamiento': 'LlenarTacho',
    'argumentos': `{ etiqueta: "Tacho", nombreAnimacion: "recoger" }`,
  }, 'icono.tacho.png'
  );

  createPrimitiveBlock('Volver', t("blocks.return"), {
    'comportamiento': 'MovimientoAnimado',
    'argumentos': '{direccion: [-1,0], distancia: 50, idTransicion: "volver"}',
  }, 'icono.izquierda.png'
  );

  createPrimitiveBlock('Avanzar', t("blocks.advance"), {
    'comportamiento': 'MovimientoAnimado',
    'argumentos': '{direccion: [1,0], distancia: 50, idTransicion: "avanzar"}',
  }, 'icono.derecha.png'
  );

  createPrimitiveBlock('Retroceder', t("blocks.back"), {
    'comportamiento': 'MovimientoAnimado',
    'argumentos': '{direccion: [-1,0], distancia: 50, idTransicion: "retroceder"}',
  }, 'icono.izquierda.png'
  );

  createPrimitiveBlock('VolverABordeIzquierdo', t("blocks.goToLeftBorder"), {
    'comportamiento': 'MoverTodoAIzquierda',
    'argumentos': '{}',
  }, 'icono.izquierdaTope.png'
  );

  createPrimitiveBlock('TomarEstrella', t("blocks.takeStar"), {
    'comportamiento': 'Recolectar',
    'argumentos': '{etiqueta: "EstrellaAnimada", "mensajeError": "Acá no hay una estrella"}',
  }, 'icono.estrella.png'
  );

  createPrimitiveBlock('PasarASiguienteComputadora', t("blocks.nextComputer"), {
    'comportamiento': 'MoverACasillaDerecha',
    'argumentos': '{}',
  }, 'icono.derecha.png'
  );

  createPrimitiveBlock('PrenderComputadora', t("blocks.turnComputerOn"), {
    'comportamiento': 'PrenderComputadora',
    'argumentos': '{}',
  }, 'icono.turn_on.svg',
  );

  createPrimitiveBlock('ApagarComputadora', t("blocks.turnComputerOff"), {
    'comportamiento': 'ApagarComputadora',
    'argumentos': '{}'
  }, 'icono.turn_off.svg',
  );

  createPrimitiveBlock('InstalarJuego', t("blocks.installGame"), {
    'comportamiento': 'InstalarJuegoEnComputadora',
    'argumentos': '{}'
  }, 'icono.installation.svg',
  );

  createPrimitiveBlock('AgarrarTelescopio', t("blocks.takeTelescope"), {
    'comportamiento': 'AgregarASeguidores',
    'argumentos': `{
      etiqueta: "TelescopioEntregable",
      nombreAnimacion: "recoger",
      idTransicion: "agarrarTelescopio"
    }`,
  }, 'icono.telescopio.png'
  );

  createPrimitiveBlock('EntregarTelescopio', t("blocks.giveTelescope"), {
    'comportamiento': 'AgregarASeguidores',
    'argumentos': `{
      etiqueta: "ManicConPelota",
      queSoltar: "TelescopioEntregable",
      nombreAnimacion: "recoger",
      idTransicion: "entregarTelescopio"
    }`,
  }, 'icono.pelota-pulpo.png'
  );

  createPrimitiveBlock('EntregarPelota', t("blocks.giveBall"), {
    'comportamiento': 'AgregarASeguidores',
    'argumentos': `{
      etiqueta: "ChuyConCargador",
      queSoltar: "Pulpito",
      nombreAnimacion: "recoger",
      idTransicion: "entregarPelota"
    }`,
  }, 'icono.cargador.png'
  );

  createPrimitiveBlock('EntregarCargador', t("blocks.giveCharger"), {
    'comportamiento': 'AgregarASeguidores',
    'argumentos': `{
      etiqueta: "YvotySinEntregable",
      queSoltar: "Cargador",
      nombreAnimacion: "recoger",
      idTransicion: "entregarCargador"
    }`,
  }, 'icono.yvoty.png'
  );

  createPrimitiveBlock('Colocar', t("blocks.putIntoTheTrashBin"), {
    'comportamiento': 'Soltar',
    'argumentos': `{
      idTransicion: "colocar",
      etiqueta: "Tacho",
    }`,
  }, 'icono.tacho.png'
  );

  createPrimitiveBlock('IrseEnYacare', t("blocks.goInAlligator"), {
    'comportamiento': 'IrseEnYacare',
    'argumentos': '{}',
  }, 'icono.yacare.png'
  );

  createPrimitiveBlock('TomarLata', t("blocks.takeCan"), {
    'comportamiento': 'Sostener',
    'argumentos': `{
      etiqueta: "Lata",
      nombreAnimacion: "recoger"
    }`,
  }, 'icono.lata.png'
  );

  createPrimitiveBlock('TomarPapel', t("blocks.takePaper"), {
    'comportamiento': 'Sostener',
    'argumentos': `{
      etiqueta: "Papel",
      nombreAnimacion: "recoger"
    }`,
  }, 'icono.papel.png'
  );

  createPrimitiveBlock('SiguienteFila', t("blocks.nextLine"), {
    'comportamiento': 'SiguienteFila',
    'argumentos': '{}'
  }, 'icono.abajo.png'
  );

  createPrimitiveBlock('SiguienteFilaTotal', t("blocks.nextLine"), {
    'comportamiento': 'SecuenciaAnimada',
    'argumentos': `{secuencia: [
      {
        'comportamiento': "MoverTodoAIzquierda",
        'argumentos': {}
      },
      {
        'comportamiento': "MoverACasillaAbajo",
        'argumentos': {}
      }
    ]}`,

  }, 'icono.izquierdaAbajo.png'
  );

  createPrimitiveBlock('SiguienteColumna', t("blocks.nextColumn"), {
    'comportamiento': 'SiguienteColumna',
    'argumentos': '{}',
  }, 'icono.derecha.png'
  );

  createPrimitiveBlock('ContarPlaneta', t("blocks.countPlanet"), {
    'comportamiento': 'Contar',
    'argumentos': '{etiqueta: "Planeta", nombreAnimacion: "usarCatalejo"}',
  }, 'icono.planeta.png'
  );

  createPrimitiveBlock('ContarEstrella', t("blocks.countStar"), {
    'comportamiento': 'Contar',
    'argumentos': '{etiqueta: "Estrella", nombreAnimacion: "usarCatalejo"}',
  }, 'icono.estrella.png'
  );

  createPrimitiveBlock('PatearPelota', t("blocks.kickBall"), {
    'comportamiento': 'PatearPelota',
    'argumentos': `{
      idTransicion: "patear",
    }`,
  }, 'icono.pelota.png'
  );

  createPrimitiveBlock('PatearPelotaChuy', t("blocks.kickFootballBall"), {
    'comportamiento': 'PatearPelota',
    'argumentos': `{
      idTransicion: "patear",
      animacionInteractuadoMientras: "desaparecer"
    }`,
  }, 'icono.pelota.png'
  );

  createPrimitiveBlock('Avanzar1kmChuy', t("blocks.move1Km"), {
    'comportamiento': 'CorrerHeroicamente',
    'argumentos': '{}',
  }, 'icono.derecha.png'
  );

  createPrimitiveBlock('MoverTelescopio', t("blocks.moveTelescope"), {
    'comportamiento': 'MoverTelescopio',
    'argumentos': '{}',
  }, 'icono.telescopio.png'
  );

  createPrimitiveBlock('SiguienteTelescopio', t("blocks.moveNextTelescope"), {
    'comportamiento': 'MoverACasillaDerecha',
    'argumentos': '{}',
  }, 'icono.derecha.png'
  );

  createPrimitiveBlock('ObservarConAmigos', t("blocks.lookWithFriends"), {
    'comportamiento': 'TodosObservando',
    'argumentos': '{idTransicion: "observarConAmigos"}',
  }, 'icono.todos.observando.png'
  );

  createPrimitiveBlock('VolverAlBordeIzquierdo', t("blocks.backToLeftBorder"), {
    'comportamiento': 'MoverTodoAIzquierda',
    'argumentos': '{}',
  }, 'icono.izquierdaTope.png'
  );

  createPrimitiveBlock('ComerChurrasco', t("blocks.eatSteak"), {
    'comportamiento': 'Recolectar',
    'argumentos': '{etiqueta:"Churrasco", nombreAnimacion: "comerChurrasco", animacionInteractuadoMientras: "desaparecer"}',
  }, 'icono.churrasco.png'
  );

  createPrimitiveBlock('AgarrarTomate', t("blocks.pickTomato"), {
    'comportamiento': 'Recolectar',
    'argumentos': `{
      etiqueta: "Tomate",
      nombreAnimacion: "agarrarTomate",
      animacionInteractuadoMientras: "desaparecer",
      idTransicion: "agarrarTomate"
      
    }`,
  }, 'icono.tomate.png'
  );

  createPrimitiveBlock('AgarrarLechuga', t("blocks.pickLettuce"), {
    'comportamiento': 'Recolectar',
    'argumentos': `{
      etiqueta: "Lechuga",
      nombreAnimacion: "agarrarLechuga",
      animacionInteractuadoMientras: "desaparecer",
      idTransicion: "agarrarLechuga"
    }`,
  }, 'icono.lechuga.png'
  );

  createPrimitiveBlock('PrepararEnsalada', t("blocks.prepareSalad"), {
    'comportamiento': 'PrepararEnsalada',
    'argumentos': `{etiqueta:"Ensaladera"}`,
  }, 'icono.ensaladera.png'
  );

  createPrimitiveBlock('EscribirLetraActualEnOtraCuadricula', t("blocks.writeLetter"), {
    'comportamiento': 'EscribirLetraActualEnOtraCuadricula',
    'argumentos': '{}',
  }, 'icono.DibujarLinea.png'
  );

  createPrimitiveBlock('MoverArribaDibujando', t("blocks.moveAndDrawUp"), {
    'comportamiento': 'DibujarLinea',
    'argumentos': '{direccion: [0,1], nombreAnimacion: "dibujar", dibujarPuntos: true}',
  }, 'icono.arribaDibujando.png'
  );

  createPrimitiveBlock('MoverAbajoDibujando', t("blocks.moveAndDrawDown"), {
    'comportamiento': 'DibujarLinea',
    'argumentos': '{direccion: [0,-1], nombreAnimacion: "dibujar", dibujarPuntos: true}',
  }, 'icono.abajoDibujando.png'
  );

  createPrimitiveBlock('MoverDerechaDibujando', t("blocks.moveAndDrawRight"), {
    'comportamiento': 'DibujarLinea',
    'argumentos': '{direccion: [1,0], nombreAnimacion: "dibujar", dibujarPuntos: true}',
  }, 'icono.derechaDibujando.png'
  );

  createPrimitiveBlock('MoverIzquierdaDibujando', t("blocks.moveAndDrawLeft"), {
    'comportamiento': 'DibujarLinea',
    'argumentos': '{direccion: [-1,0], nombreAnimacion: "dibujar", dibujarPuntos: true}',
  }, 'icono.izquierdaDibujando.png'
  );

  createPrimitiveBlock('SaltarArriba', t("blocks.jumpUp"), {
    'comportamiento': 'SaltarAnimado',
    'argumentos': '{direccion: [0,1], distancia: 50, alturaDeseada: 50, velocidad_inicial: 20, nombreAnimacion: "saltar"}',
  }, 'icono.arriba.png'
  );

  createPrimitiveBlock('SaltarAbajo', t("blocks.jumpDown"), {
    'comportamiento': 'SaltarAnimado',
    'argumentos': '{direccion: [0,-1], distancia: 50, alturaDeseada: 50, velocidad_inicial: 20, nombreAnimacion: "saltar"}',
  }, 'icono.abajo.png'
  );

  createPrimitiveBlock('SaltarDerecha', t("blocks.jumpRight"), {
    'comportamiento': 'SaltarAnimado',
    'argumentos': '{direccion: [1,0], distancia: 50, alturaDeseada: 50, velocidad_inicial: 20, nombreAnimacion: "saltar"}',
  }, 'icono.derecha.png'
  );

  createPrimitiveBlock('SaltarIzquierda', t("blocks.jumpLeft"), {
    'comportamiento': 'SaltarAnimado',
    'argumentos': '{direccion: [-1,0], distancia: 50, alturaDeseada: 50, velocidad_inicial: 20, nombreAnimacion: "saltar"}',
  }, 'icono.izquierda.png'
  );

  createPrimitiveBlock('MoverLeyendoDerecha', t("blocks.moveRight"), {
    'comportamiento': 'MoverLeyendoDerecha',
    'argumentos': '{}',
  }, 'icono.derecha.png'
  );

  createPrimitiveBlock('MoverLeyendoIzquierda', t("blocks.moveLeft"), {
    'comportamiento': 'MoverLeyendoIzquierda',
    'argumentos': '{}',
  }, 'icono.izquierda.png'
  );

  createPrimitiveBlock('MoverLeyendoArriba', t("blocks.moveUp"), {
    'comportamiento': 'MoverLeyendoArriba',
    'argumentos': '{}',
  }, 'icono.arriba.png'
  );

  createPrimitiveBlock('MoverLeyendoAbajo', t("blocks.moveDown"), {
    'comportamiento': 'MoverLeyendoAbajo',
    'argumentos': '{}',
  }, 'icono.abajo.png'
  );

  createPrimitiveBlock('EscribirA', t("blocks.writeA"), {
    'comportamiento': 'EscribirEnComputadora',
    'argumentos': '{idTransicion: "escribirA"}',
  }, 'icono.letter-a.svg'
  );

  createPrimitiveBlock('EscribirB', t("blocks.writeB"), {
    'comportamiento': 'EscribirEnComputadora',
    'argumentos': '{idTransicion: "escribirB"}',
  }, 'icono.letter-b.svg'
  );

  createPrimitiveBlock('EscribirC', t("blocks.writeC"), {
    'comportamiento': 'EscribirEnComputadora',
    'argumentos': '{idTransicion: "escribirC"}',
  }, 'icono.letter-c.svg'
  );

  createPrimitiveBlock('MoverA', `${t(`blocks.moveTo`)} %1`, { 'comportamiento': '', 'argumentos': '{}' }, '',
    {
      message0: `${t(`blocks.moveTo`)} %1`,
      colour: primitivesColor,
      previousStatement: '',
      nextStatement: '',
      inputsInline: true,
      args0: [
        {
          "type": "input_value",
          "name": "direccion",
        }
      ],
      code: 'hacer(actor_id, "MovimientoEnCuadricula", {direccionCasilla: $direccion});'
    });

  createPrimitiveBlock('DibujarLado', `${t(`blocks.drawSide`)} %1`, { 'comportamiento': '', 'argumentos': '{}' }, 'icono.DibujarLinea.png',
    {
      message0: `${t(`blocks.drawSide`)} %1`,
      colour: primitivesColor,
      previousStatement: '',
      nextStatement: '',
      inputsInline: true,
      args0: [
        {
          "type": "input_value",
          "name": "longitud",
        }
      ],
      code: 'hacer(actor_id, "DibujarHaciaAdelante", {distancia: $longitud, voltearAlIrAIzquierda: false, velocidad: 60, nombreAnimacion: "dibujar"});',
      toolbox: `
        <block type="DibujarLado">
          <value name="longitud">
            <block type="math_number"><field name="NUM">100</field></block></value>
        </block>
      `
    });

  createPrimitiveBlock('GirarGrados', `${t(`blocks.turnDegrees`)} %1`, { 'comportamiento': '', 'argumentos': '{}' }, 'icono.Girar.png',
    {
      message0: `${t(`blocks.turnDegrees`)} %1`,
      colour: primitivesColor,
      previousStatement: '',
      nextStatement: '',
      inputsInline: true,
      args0: [
        {
          "type": "input_value",
          "name": "grados",
        }
      ],
      code: 'hacer(actor_id, "Rotar", {angulo: - ($grados), voltearAlIrAIzquierda: false, velocidad: 60});',
      toolbox: `
        <block type="GirarGrados">
          <value name="grados">
            <block type="math_number"><field name="NUM">90</field></block></value>
        </block>
      `
    });

  createPrimitiveBlock('SaltarHaciaAdelante', `${t(`blocks.JumpForward`)} %1`, { 'comportamiento': '', 'argumentos': '{}' }, 'icono.arriba.png',
    {
      message0: `${t(`blocks.JumpForward`)} %1`,
      colour: primitivesColor,
      previousStatement: true,
      nextStatement: true,
      inputsInline: true,
      args0: [
        {
          "type": "input_value",
          "name": "longitud",
        }
      ],
      code: 'hacer(actor_id, "SaltarHaciaAdelante", {distancia: $longitud, alturaDeseada: 50, velocidad_inicial: 20, nombreAnimacion: "saltar", voltearAlIrAIzquierda: false});',
      toolbox: `
      <block type="SaltarHaciaAdelante">
        <value name="longitud">
          <block type="math_number"><field name="NUM">100</field></block></value>
      </block>
      `
    });

  createPrimitiveBlock('EscribirTextoDadoEnOtraCuadricula', `${t(`blocks.write`)} %1`, { 'comportamiento': '', 'argumentos': '{}' }, 'icono.DibujarLinea.png',
    {
      message0: `${t(`write`)} %1`,
      colour: primitivesColor,
      inputsInline: true,
      previousStatement: true,
      nextStatement: true,
      args0: [
        {
          "type": "field_input",
          "name": "texto",
          "text": ""
        }
      ],
      code: 'hacer(actor_id, "EscribirTextoDadoEnOtraCuadricula", {texto: "texto"});'
    });
}

const createSensorBlocks = (t: (key: string) => string) => {
  createSensorBlock('TocandoPulpito', t('blocks.pulpitoBallHere'), {
    'funcionSensor': 'tocando("Pulpito")',
  }, 'icono.pelota-pulpo.png');

  createSensorBlock('TocandoPingPong', t('blocks.pingPongBallHere'), {
    'funcionSensor': 'tocando("PingPong")',
  }, 'icono.pelota-pingpong.png');


  createSensorBlock('TocandoPaleta', t('blocks.paddleHere'), {
    'funcionSensor': 'tocando("Paleta")',
  }, 'icono.paleta.png'
  );

  createSensorBlock('TocandoPelotaChuy', t('blocks.footBallHere'), {
    'funcionSensor': 'tocando("PelotaAnimada")',
  }, 'icono.pelota.png'
  );

  createSensorBlock('TocandoPapel', t('blocks.paperHere'), {
    'funcionSensor': 'tocando("Papel")'
  }, 'icono.papel.png'
  );

  createSensorBlock('TocandoLata', t('blocks.canHere'), {
    'funcionSensor': 'tocando("Lata")'
  }, 'icono.lata.png'
  );

  createSensorBlock('TocandoGuyra', t('blocks.guyraHere'), {
    'funcionSensor': 'tocando("Guyra")'
  }, 'icono.guyra.png'
  );

  createSensorBlock('TocandoTelescopio', t('blocks.telescopeHere'), {
    'funcionSensor': 'tocando("Telescopio")'
  }, 'icono.telescopio.png'
  );

  createSensorBlock('TocandoEstrellaManic', t('blocks.starHere'), {
    'funcionSensor': 'tocando("Estrella")'
  }, 'icono.estrella.png'
  );

  createSensorBlock('TocandoPlaneta', t('blocks.planetHere'), {
    'funcionSensor': 'tocando("Planeta")'
  }, 'icono.planeta.png'
  );

  createSensorBlock('TocandoMariposa', t('blocks.butterflyHere'), {
    'funcionSensor': 'tocando("Mariposa")'
  }, 'icono.mariposa.png'
  );

  createSensorBlock('TocandoCelular', t('blocks.cellphoneHere'), {
    'funcionSensor': 'tocando("Celular")'
  }, 'icono.celular-prendido.png'
  );

  createSensorBlock('TocandoLuciernaga', t('blocks.fireflyHere'), {
    'funcionSensor': 'tocando("Luciernaga")',
  }, 'icono.luciernaga-prendida.png'
  );

  createSensorBlock('TocandoInicio', t('blocks.atTheBeginning'), {
    'funcionSensor': 'tocandoInicio()',
  }, 'icono.futbolInicio.png'
  );

  createSensorBlock('TocandoPelota', t('blocks.getToTheBall'), {
    'funcionSensor': 'tocando("PelotaAnimada")',
  }, 'icono.pelota.png'
  );

  createSensorBlock('TocandoEstrella', t('blocks.starHere'), {
    'funcionSensor': 'tocando("EstrellaAnimada")'
  }, 'icono.estrella.png'
  );

  createSensorBlock('TocandoFinal', t('blocks.comeToTheEnd'), {
    'funcionSensor': 'estoyUltimaFila()',
  }, 'icono.titoFinalizacion.png'
  );

  createSensorBlock('TocandoMeta', t('blocks.comeToTheEnd'), {
    'funcionSensor': 'tocando("MetaFinal")',
  }, 'icono.marcadorBlanco.png'
  );

  createSensorBlock('KmsTotales', t('blocks.kmToTravel'), {
    'funcionSensor': 'kmsTotales()',
  }, 'icono.kms.png'
  );

  createSensorBlock('EstoyEnEsquina', t('blocks.atTheSquare'), {
    'funcionSensor': 'casillaActual().esEsquina()',
  }, 'icono.prendiendoLasCompus2.png'
  );

  createSensorBlock('EstoySobreElInicio', t('blocks.atColumnBeginning'), {
    'funcionSensor': 'casillaActual().esInicio()',
  }, 'icono.casillainiciomono.png'
  );

  createSensorBlock('EstoySobreElFinal', t('blocks.atColumnEnd'), {
    'funcionSensor': 'casillaActual().esFin()',
  }, 'icono.casillafinalmono.png'
  );

  createSensorBlock('EstoySobreElInicioManic', t('blocks.atColumnBeginning'), {
    'funcionSensor': 'casillaActual().esInicio()',
  }, 'icono.casillainiciomanic.png'
  );

  createSensorBlock('EstoySobreElFinalManic', t('blocks.atColumnEnd'), {
    'funcionSensor': 'casillaActual().esFin()',
  }, 'icono.casillafinmanic.png'
  );

  createSensorBlock('LargoColumnaActual', t('blocks.currentColumnLength'), {
    'funcionSensor': 'largoColumnaActual()-1',
  }, 'icono.largoCol.png'
  );

  createSensorBlock('TocandoAbajo', t('blocks.canMoveDown'), {
    'funcionSensor': 'tocandoFlechaAbajo()',
  }, 'icono.abajo.png'
  );

  createSensorBlock('TocandoDerecha', t('blocks.canMoveRight'), {
    'funcionSensor': 'tocandoFlechaDerecha()',
  }, 'icono.derecha.png'
  );

  createSensorBlock('TocandoArriba', t('blocks.canMoveUp'), {
    'funcionSensor': 'tocandoFlechaArriba()',
  }, 'icono.arriba.png'
  );

  createSensorBlock('TocandoIzquierda', t('blocks.canMoveLeft'), {
    'funcionSensor': 'tocandoFlechaIzquierda()',
  }, 'icono.izquierda.png'
  );

  createSensorBlock('TocandoFinCamino', t('blocks.reachedGoal'), {
    'funcionSensor': 'alFinalDelCamino()',
  }, 'icono.finCamino.png'
  );

  createSensorBlock('HayChurrasco', t('blocks.steakHere'), {
    'funcionSensor': 'tocando("Churrasco")',
  }, 'icono.churrasco.png'
  );

  createSensorBlock('HayObstaculoArriba', t('blocks.obstacleUp'), {
    'funcionSensor': 'tieneEnLaCasillaDeArriba("Obstaculo")',
  }, 'icono.arriba.png'
  );

  createSensorBlock('HayObstaculoAbajo', t('blocks.obstacleDown'), {
    'funcionSensor': 'tieneEnLaCasillaDeAbajo("Obstaculo")',
  }, 'icono.abajo.png'
  );

  createSensorBlock('HayObstaculoIzquierda', t('blocks.obstacleAtLeft'), {
    'funcionSensor': 'tieneEnLaCasillaASuIzquierda("Obstaculo")',
  }, 'icono.izquierda.png'
  );

  createSensorBlock('HayObstaculoDerecha', t('blocks.obstacleAtRight'), {
    'funcionSensor': 'tieneEnLaCasillaASuDerecha("Obstaculo")',
  }, 'icono.derecha.png'
  );

  createSensorBlock('PuedeMoverAbajo', t('blocks.canMoveDown'), {
    'funcionSensor': 'puedeMoverseAbajo()',
  }, 'icono.abajo.png'
  );

  createSensorBlock('PuedeMoverDerecha', t('blocks.canMoveRight'), {
    'funcionSensor': 'puedeMoverseDerecha()',
  }, 'icono.derecha.png'
  );

  createSensorBlock('PuedeMoverArriba', t('blocks.canMoveUp'), {
    'funcionSensor': 'puedeMoverseArriba()',
  }, 'icono.arriba.png'
  );

  createSensorBlock('PuedeMoverIzquierda', t('blocks.canMoveLeft'), {
    'funcionSensor': 'puedeMoverseIzquierda()',
  }, 'icono.izquierda.png'
  );

  createSensorBlock('HayLechuga', t('blocks.lettuceHere'), {
    'funcionSensor': 'tocando("Lechuga")',
  }, 'icono.lechuga.png'
  );

  createSensorBlock('HayTomate', t('blocks.tomatoHere'), {
    'funcionSensor': 'tocando("Tomate")',
  }, 'icono.tomate.png'
  );

  createSensorBlock('HayCargador', t('blocks.chargerHere'), {
    'funcionSensor': 'tocando("Cargador")',
  }, 'icono.cargador.png'
  );

  createSensorBlock('HayEnsaladera', t('blocks.saladBowlHere'), {
    'funcionSensor': 'tocando("Ensaladera")',
  }, 'icono.ensaladera.png'
  );

  createSensorBlock('HayTrofeo', t('blocks.trophyHere'), {
    'funcionSensor': 'tocando("Trofeo")',
  }, 'icono.trofeo.png'
  );
  createSensorBlock('HayCharco', t('blocks.puddleHere'), {
    'funcionSensor': 'hayEnEscena("Charco")',
  }, 'icono.charco.png'
  );

  createSensorBlock('HayVocalRMT', `${t('blocks.currentCharacter')} %1`, {
    'funcionSensor': '{}',
  }, 'icono.DibujarLinea.png',
    {
      message0: `${t('blocks.currentCharacter')} %1`,
      colour: sensorsColor,
      args0: [
        {
          "type": "field_dropdown",
          "name": "letra",
          "options": [
            ["R", "r"], ["M", "m"], ["T", "t"], ["A", "a"], ["E", "e"], ["I", "i"], ["O", "o"], ["U", "u"]
          ]
        }
      ],
      "output": null,
      code: 'hacer(actor_id, "Rotar", {angulo: - ($grados), voltearAlIrAIzquierda: false, velocidad: 60});',
    }
  );
}

const createValueBlocks = (t: (key: string) => string) => {

  createValueBlock("ParaLaDerecha", t('blocks.right'), {
    valor: 'derecha',
  }, 'icono.derecha.png',
  );

  createValueBlock('ParaLaIzquierda', t('blocks.left'), {
    valor: 'izquierda',
  }, 'icono.izquierda.png',
  );

  createValueBlock('ParaArriba', t('blocks.up'), {
    valor: 'arriba',
  }, 'icono.arriba.png',
  );

  createValueBlock('ParaAbajo', t('blocks.down'), {
    valor: 'abajo',
  }, 'icono.abajo.png',
  );

  createValueBlock('Booleano', t('blocks.boolean'), { valor: '' }, '',
    {
      message0: t('blocks.boolean'),
      colour: directionsColor,
      type: 'logic_boolean',
      args0: [],
      output: 'Boolean'
    })

  createValueBlock('Numero', t('blocks.number'), { valor: '' }, '',
    {
      message0: `%1`,
      colour: directionsColor,
      inputsInline: true,
      args0: [
        {
          "type": "field_number",
          "name": t('blocks.number'),
          "value": 0,
        }
      ],
      output: 'Number'
    })

  createValueBlock('Texto', t('blocks.text'), { valor: '' }, '',
    {
      message0: `%1`,
      colour: directionsColor,
      inputsInline: true,
      args0: [
        {
          "type": "field_input",
          "name": t('blocks.text'),
          "text": ''
        }
      ],
      output: 'String'
    })
}

const createRepeatBlocks = (t: (key: string) => string) => {

  const repeatBlocksCode = (id: string) => {
    
    javascriptGenerator.forBlock[id] = function (block: { id: any },
      generator: { valueToCode: (arg0: any, arg1: string, arg2: any) => string; 
                    statementToCode: (arg0: any, arg1: string) => any; 
                    addLoopTrap: (arg0: any, arg1: any) => any; 
                    nameDB_?: { getDistinctName: (arg0: string, arg1: any) => any; };  
                  }) {

      const repeats = generator.valueToCode(block, 'count', Order.ASSIGNMENT) || '0';
  
      var branch = generator.statementToCode(block, 'block');
      branch = generator.addLoopTrap(branch, block.id);
      var code = '';

      const loopVar = generator.nameDB_?.getDistinctName(
        'count', Blockly.Names.NameType.VARIABLE);
      var endVar = repeats
      if (!repeats.match(/^\w+$/) && Blockly.utils.string.isNumber(repeats)) {        
        endVar = generator.nameDB_?.getDistinctName(
          'repeat_end', Blockly.Names.NameType.VARIABLE);
        code += 'var ' + endVar + ' = ' + repeats + ';\n';
      }
      code += 'for (var ' + loopVar + ' = 0; ' +
        loopVar + ' < ' + endVar + '; ' +
        loopVar + '++) {\n' +
        branch + '}\n';

      return code;
    };
  }


  Blockly.Blocks['RepetirVacio'] = {
    init: function () {
      this.setColour(controlColor);
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.appendValueInput('count')
        .setCheck('Number')
        .appendField(t('blocks.repeat'))
      this.appendDummyInput()
        .appendField(t('blocks.times'));
      this.appendStatementInput('block');
    },
    categoryId: 'repetitions',
  };

  repeatBlocksCode('RepetirVacio');

  Blockly.Blocks['Repetir'] = {
    init: function () {
      this.setColour(controlColor);
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.appendDummyInput()
        .appendField(t('blocks.repeat'))
      this.jsonInit({
        message0: `%1`,
        args0: [
          {
            "type": "field_number",
            "name": 'count',
            "value": 10,
          }
        ]
      })
      this.appendDummyInput()
        .appendField(t('blocks.times'));
      this.appendStatementInput('block');
    },
    categoryId: 'repetitions',
  };

  repeatBlocksCode('Repetir');

  Blockly.Blocks['Hasta'] = {
    init: function () {
      this.setColour(controlColor);
      this.setInputsInline(true);
      this.appendValueInput('condition')
        .setCheck('Boolean')
        .appendField(t('blocks.while'));
      this.appendStatementInput('block');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    },
    categoryId: 'repetitions',
  };

  javascriptGenerator.forBlock['Hasta'] = function (block: any, generator: { valueToCode: (arg0: any, arg1: string, arg2: Order) => string; statementToCode: (arg0: any, arg1: string) => any; }) {
    const condition = generator.valueToCode(block, 'condition', Order.ASSIGNMENT) || 'false';
    const contenido = generator.statementToCode(block, 'block');
    return `while (!${condition}) {
      ${contenido}
    }`;
  };

  Blockly.Blocks['Si'] = {
    init: function () {
      this.setColour(controlColor);
      this.appendValueInput('condition')
        .setCheck('Boolean')
        .appendField(t('blocks.simpleAlternative'));
      this.setInputsInline(true);
      this.appendStatementInput('block');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    },
    categoryId: 'alternatives',
  };

  javascriptGenerator.forBlock['Si'] = function (block: any, generator: { valueToCode: (arg0: any, arg1: string, arg2: Order) => string; statementToCode: (arg0: any, arg1: string) => any; }) {
    const condition = generator.valueToCode(block, 'condition', Order.ATOMIC) || 'false';
    const contenido = generator.statementToCode(block, 'block');
    return `if (${condition}) {
      ${contenido}
    }`;
  };

  Blockly.Blocks['SiNo'] = {
    init: function () {
      this.setColour(controlColor);
      this.appendValueInput('condition')
        .setCheck('Boolean')
        .appendField(t('blocks.simpleAlternative'));
      this.appendStatementInput('block1');
      this.setInputsInline(true);
      this.appendDummyInput()
        .appendField(t('blocks.completeAlternative'));
      this.appendStatementInput('block2');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    },
    categoryId: 'alternatives',
  };

  javascriptGenerator.forBlock['SiNo'] = function (block: any, generator: { valueToCode: (arg0: any, arg1: string, arg2: Order) => string; statementToCode: (arg0: any, arg1: string) => any; }) {
    const condition = generator.valueToCode(block, 'condition', Order.ASSIGNMENT) || 'false';
    const bloque_1 = generator.statementToCode(block, 'block1');
    const bloque_2 = generator.statementToCode(block, 'block2');

    return `if (${condition}) {
      ${bloque_1}
    } else {
      ${bloque_2}
    }`;
  };
}

const createOthersBlocks = (t: (key: string) => string) => {

  createCommonBlocklyBlocks(t, othersColor)

  Blockly.Blocks['OpAritmetica'] = {
    init: function () {
      this.jsonInit({
        type: "math_arithmetic",
        message0: "%1 %2 %3",
        colour: sensorsColor,
        inputsInline: true,
        args0: [
          {
            "type": "input_value",
            "name": "A",
            "check": "Number"
          },
          {
            "type": "field_dropdown",
            "name": "OP",
            "options": [
              ["%{BKY_MATH_ADDITION_SYMBOL}", "ADD"],
              ["%{BKY_MATH_SUBTRACTION_SYMBOL}", "MINUS"],
              ["%{BKY_MATH_MULTIPLICATION_SYMBOL}", "MULTIPLY"],
              ["%{BKY_MATH_DIVISION_SYMBOL}", "DIVIDE"],
              ["%{BKY_MATH_POWER_SYMBOL}", "POWER"]
            ]
          },
          {
            "type": "input_value",
            "name": "B",
            "check": "Number"
          }
        ],
        output: "Number",
        helpUrl: "%{BKY_MATH_ARITHMETIC_HELPURL}",
        extensions: ["math_op_tooltip"]
      })
    },
    categoryId: 'operators'
  };

  javascriptGenerator.forBlock['OpAritmetica'] = function (block: { getFieldValue: (arg0: string) => any; }, generator: { valueToCode: (arg0: any, arg1: string, arg2: any) => string; }) {
    // Basic arithmetic operators, and power.    
    const OPERATORS = {
      'ADD': [' + ', Order.ADDITION],
      'MINUS': [' - ', Order.SUBTRACTION],
      'MULTIPLY': [' * ', Order.MULTIPLICATION],
      'DIVIDE': [' / ', Order.DIVISION],
      'POWER': [null, Order.COMMA]  // Handle power separately.
    };
    const op = block.getFieldValue('OP');
    const tuple = OPERATORS[op as keyof typeof OPERATORS]
    const operator = tuple[0];
    const order = tuple[1];
    const isPow = !operator;
    const isDivision = op === 'DIVIDE';
    var code;
    const argument0 = generator.valueToCode(block, 'A', order) || '0';
    const argument1 = generator.valueToCode(block, 'B', order) || '0';

    // Power in JavaScript requires a special case since it has no operator.
    if (isPow) {
      code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
      return [code, Order.FUNCTION_CALL as number];
    }
    code = `
    (function(){
      if (${isDivision} && ${argument1} === 0)
        evaluar("lanzarActividadError('No se puede dividir por 0')")
      else
        return ${argument0 + operator + argument1}
    })()
    `;
    return [code, order as number];
  };

  Blockly.Blocks['param_get'] = {
    init: Blockly.Blocks['variables_get'].init,
    mutationToDom: Blockly.Blocks['variables_get'].mutationToDom,
    domToMutation: Blockly.Blocks['variables_get'].domToMutation,
    onchange: Blockly.Blocks['variables_get'].onchange,
    categoryId: 'myprocedures',
  };

  enableUnwantedProcedureBlocks()

  ProcedsBlocklyInit(Blockly)

  disableUnwantedProcedureBlocks()

  Blockly.Blocks['OpComparacion'] = {
    init: Blockly.Blocks["logic_compare"].init,
    categoryId: 'operators',
  }
}

const createCommonCode = () => {
  javascriptGenerator.addReservedWords('main,hacer,out_hacer,evaluar');

  /*
  javascriptGenerator.required_value = function () {
    return null
  };

  javascriptGenerator.required_statement = function () {
    return null
  };
*/

  javascriptGenerator.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
  javascriptGenerator.addReservedWords('highlightBlock');
}


const defineBlocklyTranslations = (t: (key: string) => string) => {
  Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE = t("procedures.name")
  Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE = t("procedures.definition")
  Blockly.Msg.PROCEDURES_BEFORE_PARAMS = t("procedures.paramWith")
  Blockly.Msg.PROCEDURES_PARAMETER = t("procedures.paramName")
  Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS = t("procedures.paramWith")
  Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP = t("procedures.create")
  Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT = t("procedures.comment")
  Blockly.Msg.PROCEDURES_DEFNORETURN_NOPARAMS = t("procedures.noParams")
  Blockly.Msg.PROCEDURES_ADD_PARAMETER = t("procedures.addParam")
  Blockly.Msg.PROCEDURES_ADD_PARAMETER_PROMPT = t("procedures.addParamPrompt")
  Blockly.Msg.PROCEDURES_REMOVE_PARAMETER = t("procedures.removeParam")
  Blockly.Msg.PROCEDURES_CREATE_DO = t("contextMenu.createProcedure")
  Blockly.Msg.PROCEDURES_DEFRETURN_PROCEDURE = t("procedures.name")
  Blockly.Msg.PROCEDURES_DEFRETURN_TITLE = t("procedures.definition")
  Blockly.Msg.PROCEDURES_DEFRETURN_TOOLTIP = t("procedures.create")
  Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT = t("procedures.comment")
  Blockly.Msg.PROCEDURES_DEFRETURN_NOPARAMS = t("procedures.noParams")
  Blockly.Msg.ADD_COMMENT = t("contextMenu.addComment")
  Blockly.Msg.REMOVE_COMMENT = t("contextMenu.removeComment")
  Blockly.Msg.DUPLICATE_BLOCK = t("contextMenu.duplicate")
  Blockly.Msg.HELP = t("contextMenu.help")
  Blockly.Msg.DELETE_BLOCK = t("contextMenu.deleteOne")
  Blockly.Msg.DELETE_X_BLOCKS = t("contextMenu.deleteMany")
  Blockly.Msg.DISABLE_BLOCK = t("contextMenu.disable")
  Blockly.Msg.ENABLE_BLOCK = t("contextMenu.enable")
  Blockly.Msg.UNDO = t("contextMenu.undo")
  Blockly.Msg.REDO = t("contextMenu.redo")
  Blockly.Msg.CLEAN_UP = t("contextMenu.cleanUp")
  Blockly.Msg.EXTERNAL_INPUTS = t("contextMenu.externalInputs")

  // ProcedsBlockly.init() needs all procedure blocks to work, so we need to put them back
  // After calling init(), we disable unwanted toolbox blocks again
  enableUnwantedProcedureBlocks()
  //ProcedsBlockly.init()
  disableUnwantedProcedureBlocks()
}

export const categorizedToolbox = (t: (key: string) => string, blocks: BlockType[]): Toolbox => {

  const categoryBlocksFor = (categoryId: string): ToolboxItem => {
    const contents = blocks.filter(block => block.categoryId === categoryId).map(blockTypeToToolboxBlock)
    return contents.length ? categoryId === 'myprocedures' ? {
      kind: "category",
      name: `${t(`categories.${categoryId}`)}`,
      contents: contents,
      custom: "PROCEDURE"
    } : {
      kind: "category",
      name: `${t(`categories.${categoryId}`)}`,
      contents: contents,
    } : {
      kind: '',
      name: '',
      contents: []
    }
  }

  return ({
    kind: "categoryToolbox",
    contents: categories.map(category => categoryBlocksFor(category))
  })
}

export const uncategorizedToolbox = (blocks: BlockType[]): Toolbox => ({
  kind: "flyoutToolbox",
  contents: blocks.map(blockTypeToToolboxBlock)
})

export const setupBlocklyBlocks = (t: (key: string) => string) => {

  defineBlocklyTranslations(t)

  createFirstBlock(t)

  createPrimitiveBlocks(t)

  createSensorBlocks(t)

  createValueBlocks(t)

  createRepeatBlocks(t)

  createOthersBlocks(t)

  createCommonCode()
}

export const setXml = (xml: string) => {
  Blockly.Xml.domToWorkspace(
    Blockly.utils.xml.textToDom(xml),
    Blockly.getMainWorkspace()
  );
}

export const setupBlockly = (container: Element, workspaceConfiguration: Blockly.BlocklyOptions) => {
  container.replaceChildren() //Removes previous injection, otherwise it might keep inserting below the current workspace
  container.ariaValueText = 'child-blockly'
  Blockly.inject(container, workspaceConfiguration)
}