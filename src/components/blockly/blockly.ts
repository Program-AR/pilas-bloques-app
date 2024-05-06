import { BlockType } from "./blocks"
import Es from 'blockly/msg/es';
import Blockly from "blockly/core"
import { enableUnwantedProcedureBlocks, disableUnwantedProcedureBlocks, optionType, createCommonBlocklyBlocks, validateRequiredOptions } from "./utils";

Blockly.setLocale(Es); // TODO: this needs to be taken from chosen intl

type BlocklyBlockDefinition = {
  type?: string
  inputs?: any
  message0: string
  args0: any[]
  message1?: string
  args1?: any[]
  colour: string
  previousStatement?: any
  nextStatement?: any
  inputsInline?: any
  output?: any
  code?: string
}

type Toolbox = { kind: "categoryToolbox" | "flyoutToolbox", contents: ToolboxItem[] }
type ToolboxItem = ToolboxBlock | ToolBoxCategory
type ToolboxBlock = { kind: "block", type: string }
type ToolBoxCategory = { kind: "category", name: string, contents: ToolboxItem[] }

const primitivesColor = '#4a6cd4';
const controlColor = '#ee7d16';
const sensorsColor = '#2ca5e2';
const directionsColor = '#2ba4e2';
const othersColor = '#cc5b22';
const eventsColor = '#00a65a'; // == boton ejecutar

export const xmlBloqueEmpezarAEjecutar =`<xml xmlns="http://www.w3.org/1999/xhtml">
              <block type="al_empezar_a_ejecutar" x="15" y="15"></block>
            </xml>`

const blockTypeToToolboxBlock = (block: BlockType): ToolboxBlock => ({ kind: "block", type: block.id })

const createPrimitiveBlock = (id: string, message: string, options: optionType, icon?: string, blockDefinition?: BlocklyBlockDefinition) => {
  validateRequiredOptions(id, options, ['comportamiento', 'argumentos']);

  const jsonInit: BlocklyBlockDefinition = (blockDefinition ? blockDefinition : {
    message0: `${message}`,
    colour: primitivesColor,
    previousStatement: '',
    nextStatement: '',
    args0: [],
  })

  if (icon) {
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
    }
  }
}

const createSensorBlock = (id: string, message: string, options: optionType, icon?: string, blockDefinition?: BlocklyBlockDefinition) => {
  validateRequiredOptions(id, options, ['funcionSensor']);

  const jsonInit: BlocklyBlockDefinition = (blockDefinition ? blockDefinition : {
    message0: `${message}`,
    colour: sensorsColor,
    inputsInline: true,
    args0: [],
    output: null,
    code: `evaluar(${JSON.stringify(options.funcionSensor)})`

    /* TODO para chequear luego si corresponde hacerlo de otra manera
      Blockly.MyLanguage[id] = function () {
        let codigo = `evaluar(${JSON.stringify(options.funcionSensor)})`;
        return [codigo, Blockly.MyLanguage.ORDER_ATOMIC];
      };
    */

  })

  if (icon) {
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
    }
  }
}

const createValueBlock = (id: string, message: string, options: optionType, icon: string, blockDefinition?: BlocklyBlockDefinition) => {
  validateRequiredOptions(id, options, ['valor']);

  const jsonInit: BlocklyBlockDefinition = (blockDefinition ? blockDefinition : {
    message0: `${message}`,
    colour: directionsColor,
    args0: [],
    output: options.valor
  })

  if (icon) {
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
    }
  }
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
    'argumentos': `{}`,
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

  createPrimitiveBlock('MoverA', t(`blocks.moveTo`), { 'comportamiento': '', 'argumentos': '{}' }, '',
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

  createPrimitiveBlock('DibujarLado', t(`blocks.drawSide`), { 'comportamiento': '', 'argumentos': '{}' }, 'icono.DibujarLinea.png',
    {
      message0: `${t(`blocks.drawSide`)}`,
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
      code: 'hacer(actor_id, "DibujarHaciaAdelante", {distancia: $longitud, voltearAlIrAIzquierda: false, velocidad: 60, nombreAnimacion: "dibujar"});'
    });

  createPrimitiveBlock('GirarGrados', t(`blocks.turnDegrees`), { 'comportamiento': '', 'argumentos': '{}' }, 'icono.Girar.png',
    {
      message0: `${t(`blocks.turnDegrees`)}`,
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
      code: 'hacer(actor_id, "Rotar", {angulo: - ($grados), voltearAlIrAIzquierda: false, velocidad: 60});'
    });

  createPrimitiveBlock('SaltarHaciaAdelante', t(`blocks.jumpFront`), { 'comportamiento': '', 'argumentos': '{}' }, 'icono.arriba.png',
    {
      message0: `${t(`blocks.jumpFront`)}`,
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
      code: 'hacer(actor_id, "SaltarHaciaAdelante", {distancia: $longitud, alturaDeseada: 50, velocidad_inicial: 20, nombreAnimacion: "saltar", voltearAlIrAIzquierda: false});'
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

}

const createOthersBlocks = (t: (key: string) => string) => {

  createCommonBlocklyBlocks(t, othersColor)

  Blockly.Blocks['OpComparacion'] = {
    init: Blockly.Blocks['logic_compare'].init,
    categoryId: 'operators',
  };

  Blockly.Blocks['OpAritmetica'] = {
    init: Blockly.Blocks['math_arithmetic'].init,
    categoryId: 'operators',
  };

  Blockly.Blocks['param_get'] = {
    init: Blockly.Blocks['variables_get'].init,
    mutationToDom: Blockly.Blocks['variables_get'].mutationToDom,
    domToMutation: Blockly.Blocks['variables_get'].domToMutation,
    onchange: Blockly.Blocks['variables_get'].onchange,
    categoryId: 'variables',
  };

  Blockly.Blocks['param_set'] = {
    init: Blockly.Blocks['variables_set'].init,
    mutationToDom: Blockly.Blocks['variables_set'].mutationToDom,
    domToMutation: Blockly.Blocks['variables_set'].domToMutation,
    onchange: Blockly.Blocks['variables_set'].onchange,
    categoryId: 'variables',
  };

  Blockly.Blocks['Procedimiento'] = {
    init: Blockly.Blocks['procedures_defnoreturn'].init,
    setStatements_: Blockly.Blocks['procedures_defnoreturn'].setStatements_,
    updateParams_: Blockly.Blocks['procedures_defnoreturn'].updateParams_,
    mutationToDom: Blockly.Blocks['procedures_defnoreturn'].mutationToDom,
    domToMutation: Blockly.Blocks['procedures_defnoreturn'].domToMutation,
    decompose: Blockly.Blocks['procedures_defnoreturn'].decompose,
    compose: Blockly.Blocks['procedures_defnoreturn'].compose,
    getProcedureDef: Blockly.Blocks['procedures_defnoreturn'].getProcedureDef,
    getVars: Blockly.Blocks['procedures_defnoreturn'].getVars,
    getVarModels: Blockly.Blocks['procedures_defnoreturn'].getVarModels,
    renameVarById: Blockly.Blocks['procedures_defnoreturn'].renameVarById,
    updateVarName: Blockly.Blocks['procedures_defnoreturn'].updateVarName,
    displayRenamedVar_: Blockly.Blocks['procedures_defnoreturn'].displayRenamedVar_,
    customContextMenu: Blockly.Blocks['procedures_defnoreturn'].customContextMenu,
    categoryId: 'myprocedures'
  };
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

export const categorizedToolbox = (t: (key: string) => string, blocks: BlockType[]): Toolbox => ({
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: `${t('categories.primitives')}`,
      contents: blocks.filter(block => block.categoryId === "primitives").map(blockTypeToToolboxBlock)
    },
    {
      kind: "category",
      name: `${t('categories.myprocedures')}`,
      contents: blocks.filter(block => block.categoryId === "myprocedures").map(blockTypeToToolboxBlock)
    },
    {
      kind: "category",
      name: `${t('categories.repetitions')}`,
      contents: blocks.filter(block => block.categoryId === "repetitions").map(blockTypeToToolboxBlock)
    },
    {
      kind: "category",
      name: `${t('categories.alternatives')}`,
      contents: blocks.filter(block => block.categoryId === "alternatives").map(blockTypeToToolboxBlock)
    },
    {
      kind: "category",
      name: `${t('categories.variables')}`,
      contents: blocks.filter(block => block.categoryId === "variables").map(blockTypeToToolboxBlock)
    },
    {
      kind: "category",
      name: `${t('categories.values')}`,
      contents: blocks.filter(block => block.categoryId === "values").map(blockTypeToToolboxBlock)
    },
    {
      kind: "category",
      name: `${t('categories.sensors')}`,
      contents: blocks.filter(block => block.categoryId === "sensors").map(blockTypeToToolboxBlock)
    },
    {
      kind: "category",
      name: `${t('categories.operators')}`,
      contents: blocks.filter(block => block.categoryId === "operators").map(blockTypeToToolboxBlock)
    }
  ]
})

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

}
