import { SceneType, sceneObjectByType } from "../serializedChallenge"

export const categories: string[] = [
  'primitives',
  'myprocedures',
  'repetitions',
  'alternatives',
  'values',
  'sensors',
  'operators'
]

export type BlockType = {
  id: string
  intlId: string
  categoryId: typeof categories[number],
  toolboxJSON?: {}
}

export const commonBlocks: BlockType[] = [
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
  {
    id: 'MoverA',
    intlId: 'moveTo',
    categoryId: 'primitives'
  },
  {
    id: 'HayObstaculoArriba',
    intlId: 'obstacleUp',
    categoryId: 'sensors'
  },
  {
    id: 'HayObstaculoAbajo',
    intlId: 'obstacleDown',
    categoryId: 'sensors'
  },
  {
    id: 'HayObstaculoIzquierda',
    intlId: 'obstacleAtLeft',
    categoryId: 'sensors'
  },
  {
    id: 'HayObstaculoDerecha',
    intlId: 'obstacleAtRight',
    categoryId: 'sensors'
  },
  {
    id: 'TocandoMeta',
    intlId: 'cameToTheEnd',
    categoryId: 'sensors'
  },
  {
    id: 'Si',
    intlId: 'simpleAlternative',
    categoryId: 'alternatives'
  },
  {
    id: 'SiNo',
    intlId: 'completeAlternative',
    categoryId: 'alternatives'
  },
  {
    id: 'ParaLaDerecha',
    intlId: 'right',
    categoryId: 'values'
  },
  {
    id: 'ParaLaIzquierda',
    intlId: 'left',
    categoryId: 'values'
  },
  {
    id: 'ParaArriba',
    intlId: 'up',
    categoryId: 'values'
  },
  {
    id: 'ParaAbajo',
    intlId: 'down',
    categoryId: 'values'
  },
  {
    id: 'Numero',
    intlId: 'math_number',
    categoryId: 'values'
  },
  {
    id: 'Repetir',
    intlId: 'repeat',
    categoryId: 'repetitions',
    toolboxJSON: {
      "kind": "block",
      "type": "Repetir",
      "inputs": {
        "count": {
          "block": {
            "type": "math_number",
            "fields": {
              "NUM": 10
            }
          }
        }
      }
    }
  },
  {
    id: 'Hasta',
    intlId: 'while',
    categoryId: 'repetitions'
  },
  {
    id: 'OpComparacion',
    intlId: 'logic_compare',
    categoryId: 'operators'
  },
  {
    id: 'OpAritmetica',
    intlId: 'math_arithmetic',
    categoryId: 'operators'
  },
  {
    id: 'Procedimiento',
    intlId: 'Procedures',
    categoryId: 'myprocedures'
  },
  {
    id: 'PuedeMoverAbajo',
    intlId: 'canMoveDown',
    categoryId: 'sensors'
  },
  {
    id: 'PuedeMoverDerecha',
    intlId: 'canMoveRight',
    categoryId: 'sensors'
  }
]

const notUsedBlocks: BlockType[] = [
  {
    id: 'SiguienteColumna',
    intlId: 'nextColumn',
    categoryId: 'primitives'
  },
  {
    id: 'Retroceder',
    intlId: 'back',
    categoryId: 'primitives'
  },
  {
    id: 'SiguienteFila',
    intlId: 'nextLine',
    categoryId: 'primitives'
  },
  {
    id: 'VolverABordeIzquierdo',
    intlId: 'goToLeftBorder',
    categoryId: 'primitives'
  },
  {
    id: 'Avanzar',
    intlId: 'advance',
    categoryId: 'primitives'
  },
  {
    id: 'EscribirA',
    intlId: 'writeA',
    categoryId: 'primitives'
  },
  {
    id: 'EscribirB',
    intlId: 'writeB',
    categoryId: 'primitives'
  },
  {
    id: 'EscribirC',
    intlId: 'writeC',
    categoryId: 'primitives'
  },
  {
    id: 'EscribirLetraActualEnOtraCuadricula',
    intlId: 'writeLetter',
    categoryId: 'primitives'
  },
  {
    id: 'SaltarAbajo',
    intlId: 'jumpDown',
    categoryId: 'primitives'
  },
  {
    id: 'SaltarArriba',
    intlId: 'jumpUp',
    categoryId: 'primitives'
  },
  {
    id: 'SaltarDerecha',
    intlId: 'jumpRight',
    categoryId: 'primitives'
  },
  {
    id: 'SaltarIzquierda',
    intlId: 'jumpLeft',
    categoryId: 'primitives'
  },
  {
    id: 'SiguienteFilaTotal',
    intlId: 'nextLine',
    categoryId: 'primitives'
  },
  {
    id: 'SaltarHaciaAdelante',
    intlId: 'JumpForward',
    categoryId: 'primitives',
    toolboxJSON: {
      "kind": "block",
      "type": "SaltarHaciaAdelante",
      "inputs": {
        "longitud": {
          "block": {
            "type": "math_number",
            "fields": {
              "NUM": 100
            }
          }
        }
      }
    }
  },
  {
    id: 'EstoyEnEsquina',
    intlId: 'atTheSquare',
    categoryId: 'sensors'
  },
  {
    id: 'TocandoInicio',
    intlId: 'atTheBeginning',
    categoryId: 'sensors'
  },
  {
    id: 'TocandoDerecha',
    intlId: 'canMoveRight',
    categoryId: 'sensors'
  },
  {
    id: 'TocandoAbajo',
    intlId: 'canMoveDown',
    categoryId: 'sensors'
  },
  {
    id: 'RepetirVacio',
    intlId: 'repeatEmpty',
    categoryId: 'repetitions'
  },
  {
    id: 'EntregarPelota',
    intlId: 'giveBall',
    categoryId: 'primitives'
  },
  {
    id: 'MoverAbajoDibujando',
    intlId: 'moveAndDrawDown',
    categoryId: 'primitives'
  },
  {
    id: 'MoverArribaDibujando',
    intlId: 'moveAndDrawUp',
    categoryId: 'primitives'
  },
  {
    id: 'MoverDerechaDibujando',
    intlId: 'moveAndDrawRight',
    categoryId: 'primitives'
  },
  {
    id: 'MoverIzquierdaDibujando',
    intlId: 'moveAndDrawLeft',
    categoryId: 'primitives'
  },
  {
    id: 'EstoySobreElFinalManic',
    intlId: 'atColumnEnd',
    categoryId: 'sensors'
  },
  {
    id: 'EstoySobreElInicioManic',
    intlId: 'atColumnBeginning',
    categoryId: 'sensors'
  },
  {
    id: 'RebotarPiePulpito',
    intlId: 'bounceFootRubberBall',
    categoryId: 'primitives'
  },
  {
    id: 'RebotarPingPong',
    intlId: 'bouncePingPong',
    categoryId: 'primitives'
  },
  {
    id: 'ContarEstrella',
    intlId: 'countStar',
    categoryId: 'primitives'
  },
  {
    id: 'ContarPlaneta',
    intlId: 'countPlanet',
    categoryId: 'primitives'
  },
  {
    id: 'DibujarLado',
    intlId: 'drawSide',
    categoryId: 'primitives',
    toolboxJSON: {
      "kind": "block",
      "type": "DibujarLado",
      "inputs": {
        "longitud": {
          "block": {
            "type": "math_number",
            "fields": {
              "NUM": 100
            }
          }
        }
      }
    }
  },
  {
    id: 'EntregarCargador',
    intlId: 'giveCharger',
    categoryId: 'primitives'
  },
  {
    id: 'EntregarTelescopio',
    intlId: 'giveTelescope',
    categoryId: 'primitives'
  },
  {
    id: 'IrseEnYacare',
    intlId: 'goInAlligator',
    categoryId: 'primitives'
  },
  {
    id: 'TocandoGuyra',
    intlId: 'guyraHere',
    categoryId: 'sensors'
  },
  {
    id: 'InstalarJuego',
    intlId: 'installGame',
    categoryId: 'primitives'
  },
  {
    id: 'KmsTotales',
    intlId: 'kmToTravel',
    categoryId: 'sensors'
  },
  {
    id: 'ObservarConAmigos',
    intlId: 'lookWithFriends',
    categoryId: 'primitives'
  },
  {
    id: 'Avanzar1kmChuy',
    intlId: 'move1Km',
    categoryId: 'primitives'
  },
  {
    id: 'SiguienteTelescopio',
    intlId: 'moveNextTelescope',
    categoryId: 'primitives'
  },
  {
    id: 'MoverTelescopio',
    intlId: 'moveTelescope',
    categoryId: 'primitives'
  },
  {
    id: 'PasarASiguienteComputadora',
    intlId: 'nextComputer',
    categoryId: 'primitives'
  },
  {
    id: 'SubirPajarito',
    intlId: 'pickBird',
    categoryId: 'primitives'
  },
  {
    id: 'RecogerPulpito',
    intlId: 'pickRubberBall',
    categoryId: 'primitives'
  },
  {
    id: 'Colocar',
    intlId: 'putIntoTheTrashBin',
    categoryId: 'primitives'
  },
  {
    id: 'GirarGrados',
    intlId: 'rotateGrades',
    categoryId: 'primitives',
    toolboxJSON: {
      "kind": "block",
      "type": "GirarGrados",
      "inputs": {
        "longitud": {
          "block": {
            "type": "math_number",
            "fields": {
              "NUM": 100
            }
          }
        }
      }
    }
  },
  {
    id: 'TomarLata',
    intlId: 'takeCan',
    categoryId: 'primitives'
  },
  {
    id: 'TomarPapel',
    intlId: 'takePaper',
    categoryId: 'primitives'
  },
  {
    id: 'AgarrarTelescopio',
    intlId: 'takeTelescope',
    categoryId: 'primitives'
  },
  {
    id: 'ApagarComputadora',
    intlId: 'turnComputerOff',
    categoryId: 'primitives'
  },
  {
    id: 'PrenderComputadora',
    intlId: 'turnComputerOn',
    categoryId: 'primitives'
  },
  {
    id: 'RevolearPulpito',
    intlId: 'volleyRubberBall',
    categoryId: 'primitives'
  }
]


export const sceneBlocks: BlockType[] = [
  {
    id: 'RecogerTrofeo',
    intlId: 'pickTrophy',
    categoryId: 'primitives'
  },
  {
    id: 'PatearPulpito',
    intlId: 'bounceRubberBall',
    categoryId: 'primitives'
  },
  {
    id: 'DespertarLuciernaga',
    intlId: 'wakeUpFirefly',
    categoryId: 'primitives'
  },
  {
    id: 'FotografiarMariposa',
    intlId: 'photographButterfly',
    categoryId: 'primitives'
  },
  {
    id: 'DesbloquearCelular',
    intlId: 'unlockCellphone',
    categoryId: 'primitives'
  },
  {
    id: 'AgarrarCargador',
    intlId: 'pickCharger',
    categoryId: 'primitives'
  },
  {
    id: 'CargarCelular',
    intlId: 'chargeCellphone',
    categoryId: 'primitives'
  },
  {
    id: 'ObservarEstrella',
    intlId: 'watchStar',
    categoryId: 'primitives'
  },
  {
    id: 'ObservarPlaneta',
    intlId: 'watchPlanet',
    categoryId: 'primitives'
  },
  {
    id: 'RepararTelescopio',
    intlId: 'repairTelescope',
    categoryId: 'primitives'
  },
  {
    id: 'RecogerLata',
    intlId: 'pickCan',
    categoryId: 'primitives'
  },
  {
    id: 'RecogerPapel',
    intlId: 'pickPaper',
    categoryId: 'primitives'
  },
  {
    id: 'SostenerPapel',
    intlId: 'holdPaper',
    categoryId: 'primitives'
  },
  {
    id: 'LlenarTacho',
    intlId: 'fillBin',
    categoryId: 'primitives'
  },
  {
    id: 'PatearPelotaChuy',
    intlId: 'kickFootballBall',
    categoryId: 'primitives'
  },
  {
    id: 'ComerChurrasco',
    intlId: 'eatSteak',
    categoryId: 'primitives'
  },
  {
    id: 'AgarrarTomate',
    intlId: 'pickTomato',
    categoryId: 'primitives'
  },
  {
    id: 'AgarrarLechuga',
    intlId: 'pickLettuce',
    categoryId: 'primitives'
  },
  {
    id: 'PrepararEnsalada',
    intlId: 'prepareSalad',
    categoryId: 'primitives'
  },
  {
    id: 'TocandoPulpito',
    intlId: 'pulpitoBallHere',
    categoryId: 'sensors'
  },
  {
    id: 'TocandoPingPong',
    intlId: 'pingPongBallHere',
    categoryId: 'sensors'
  },
  {
    id: 'TocandoPaleta',
    intlId: 'paddleHere',
    categoryId: 'sensors'
  },
  {
    id: 'RecogerPaleta',
    intlId: 'pickPaddle',
    categoryId: 'primitives'
  },
  {
    id: 'TocandoPelotaChuy',
    intlId: 'footBallHere',
    categoryId: 'sensors'
  },
  {
    id: 'TocandoPapel',
    intlId: 'paperHere',
    categoryId: 'sensors'
  },
  {
    id: 'TocandoLata',
    intlId: 'canHere',
    categoryId: 'sensors'
  },
  {
    id: 'TocandoTelescopio',
    intlId: 'telescopeHere',
    categoryId: 'sensors'
  },
  {
    id: 'TocandoEstrellaManic',
    intlId: 'starHere',
    categoryId: 'sensors'
  },
  {
    id: 'TocandoPlaneta',
    intlId: 'planetHere',
    categoryId: 'sensors'
  },
  {
    id: 'TocandoMariposa',
    intlId: 'butterflyHere',
    categoryId: 'sensors'
  },
  {
    id: 'TocandoCelular',
    intlId: 'cellphoneHere',
    categoryId: 'sensors'
  },
  {
    id: 'TocandoLuciernaga',
    intlId: 'fireflyHere',
    categoryId: 'sensors'
  },
  {
    id: 'HayLechuga',
    intlId: 'lettuceHere',
    categoryId: 'sensors'
  },
  {
    id: 'HayTomate',
    intlId: 'tomatoHere',
    categoryId: 'sensors'
  },
  {
    id: 'HayChurrasco',
    intlId: 'steakHere',
    categoryId: 'sensors'
  },
  {
    id: 'HayCargador',
    intlId: 'chargerHere',
    categoryId: 'sensors'
  },
  {
    id: 'HayEnsaladera',
    intlId: 'saladBowlHere',
    categoryId: 'sensors'
  },
  {
    id: 'HayTrofeo',
    intlId: 'trophyHere',
    categoryId: 'sensors'
  },
  {
    id: 'LargoColumnaActual',
    intlId: 'currentColumnLength',
    categoryId: 'sensors'
  },
  {
    id: 'MoverLeyendoAbajo',
    intlId: 'moveDown',
    categoryId: 'primitives'
  },
  {
    id: 'MoverLeyendoArriba',
    intlId: 'moveUp',
    categoryId: 'primitives'
  },
  {
    id: 'MoverLeyendoDerecha',
    intlId: 'moveRight',
    categoryId: 'primitives'
  },
  {
    id: 'MoverLeyendoIzquierda',
    intlId: 'moveLeft',
    categoryId: 'primitives'
  },
  {
    id: 'RebotarUnaVezPingPong',
    intlId: 'bouncePingPong',
    categoryId: 'primitives'
  },
  {
    id: 'EscribirTextoDadoEnOtraCuadricula',
    intlId: 'writeAnotherText',
    categoryId: 'primitives'
  },
  {
    id: 'HayVocalRMT',
    intlId: 'isAVowel',
    categoryId: 'sensors'
  }
]

const allBlocks: BlockType[] = commonBlocks.concat(sceneBlocks)

export const getBlockFromId = (id: string): BlockType => allBlocks.find(block => block.id === id)!

export const availableBlocksFor = (sceneType: SceneType): BlockType[] => {
  return [...sceneBlocks.filter(block => sceneObjectByType(sceneType).specificBlocksIds.includes(block.id)),
  ...commonBlocks]
    .sort((a, b) => {
      const position = (block: BlockType) => categories.indexOf(block.categoryId.toLowerCase())
      return position(a) - position(b)
    })
}
