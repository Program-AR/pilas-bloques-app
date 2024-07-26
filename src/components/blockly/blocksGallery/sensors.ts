import { javascriptGenerator, Order } from "blockly/javascript";
import { BlocklyBlockDefinition, messageBlock } from "../blockly";
import { optionType, validateRequiredOptions } from "../utils";
import Blockly from "blockly/core"

export const sensorsColor = '#2ca5e2';

export const createSensorBlock = (id: string, message: string, options: optionType, icon?: string, blockDefinition?: BlocklyBlockDefinition) => {
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

export const createSensorBlocks = (t: (key: string) => string) => {
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
  