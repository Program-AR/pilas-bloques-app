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
    categoryId: typeof categories[number]
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
        categoryId: 'repetitions'
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
        id:'OpAritmetica', 
        intlId: 'math_arithmetic', 
        categoryId: 'operators'
    },
    {
        id: 'Procedimiento', 
        intlId: 'Procedures', 
        categoryId: 'myprocedures'
    }    
]

export const sceneBlocks: BlockType[] = [
    { 
        id: 'RecogerTrofeo', 
        intlId: 'pickTrophy', 
        categoryId: 'primitives' 
    },
    { 
        id: 'RebotarPingPong', 
        intlId: 'bouncePingPong', 
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
    }

]

const allBlocks: BlockType[] = commonBlocks.concat(sceneBlocks)

export const getBlockFromId = (id: string): BlockType  => allBlocks.find(block => block.id === id)!

export const availableBlocksFor = (sceneType: SceneType) : BlockType[] => {
    return [...sceneBlocks.filter(block => sceneObjectByType(sceneType).specificBlocksIds.includes(block.id)),
            ...commonBlocks]
    .sort((a, b) => {
        const position = (block: BlockType) => categories.indexOf(block.categoryId.toLowerCase())
        return position(a) - position(b)
    })
}