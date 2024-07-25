import { BlocklyBlockDefinition, createGenericJSCode, messageBlock } from "../blockly";
import Blockly from "blockly/core"
import { optionType, validateRequiredOptions } from "../utils";

const primitivesColor = '#4a6cd4';

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

export const createPrimitiveBlocks = (t: (key: string) => string) => {

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