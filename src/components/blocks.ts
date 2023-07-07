export const categories: string[] = [
    'primitives',
    'myProcedures',
    'repetitions',
    'alternatives',
    'variables',
    'separator',
    'values',
    'sensors',
    'operators',
    'myFunctions',
    'uncategorized'
]

export type BlockType = {
    id: string
    intlId: string
    categoryId: string
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
        id: 'Volver',
        intlId: 'return',
        categoryId: 'primitives'
    },
    {
        id: 'Avanzar',
        intlId: 'advance',
        categoryId: 'primitives'
    },
    {
        id: 'VolverABordeIzquierdo',
        intlId: 'goToLeftBorder',
        categoryId: 'primitives'
    },
    {
        id: 'VolverAlBordeIzquierdo',
        intlId: 'backToLeftBorder',
        categoryId: 'primitives'
    },
    {
        id: 'SiguienteFila',
        intlId: 'nextLine',
        categoryId: 'primitives'
    },
    {
        id: 'SiguienteFilaTotal',
        intlId: 'nextLine',
        categoryId: 'primitives'
    },
    {
        id: 'SiguienteColumna',
        intlId: 'nextColumn',
        categoryId: 'primitives'
    },
    {
        id: 'MoverA',
        intlId: 'moveTo',
        categoryId: 'primitives'
    },
    { 
        id: 'TocandoAbajo', 
        intlId: 'canMoveDown', 
        categoryId: 'sensors' 
    },
    { 
        id: 'TocandoDerecha', 
        intlId: 'canMoveRight', 
        categoryId: 'sensors' 
    },
    {
        id: 'TocandoFinCamino', 
        intlId: 'reachedGoal', 
        categoryId: 'sensors' 
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
        id: 'PuedeMoverAbajo', 
        intlId: 'canMoveDown', 
        categoryId: 'sensors' 
    },
    {  
        id: 'PuedeMoverDerecha', 
        intlId: 'canMoveRight', 
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
        id: 'Texto', 
        intlId: 'text', 
        categoryId: 'values' 
    },
    { 
        id: 'RepetirVacio', 
        intlId: 'repeat', 
        categoryId: 'repetitions' 
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
        id: 'param_get', 
        intlId: 'variables_get', 
        categoryId: 'procedures'
    },
    {
        id: 'myProcedures', 
        intlId: 'Procedures', 
        categoryId: 'MyProcedures'
    },
    {
        id: 'myFunctions', 
        intlId: 'Functions', 
        categoryId: 'MyFunctions'
    }    
]

export const sceneBlocks: BlockType[] = [
    { 
        id: 'RecogerTrofeo', 
        intlId: 'pickTrophy', 
        categoryId: 'primitives' 
    },
    { 
        id: 'UsarPaleta', 
        intlId: 'usePaddle', 
        categoryId: 'primitives' 
    },
    { 
        id: 'PatearPulpito', 
        intlId: 'kickBall', 
        categoryId: 'primitives' 
    },
    { 
        id: 'DespertarLuciernaga', 
        intlId: 'wakeUpFirefly', 
        categoryId: 'primitives' 
    },
    { 
        id: 'ObservarMariposa', 
        intlId: 'watchButterfly', 
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
        id: 'PasarASiguienteComputadora', 
        intlId: 'nextComputer', 
        categoryId: 'primitives' 
    },
    { 
        id: 'PrenderComputadora', 
        intlId: 'turnComputerOn', 
        categoryId: 'primitives' 
    },
    { 
        id: 'ApagarComputadora', 
        intlId: 'turnComputerOff', 
        categoryId: 'primitives' 
    },
    { 
        id: 'InstalarJuego', 
        intlId: 'installGame', 
        categoryId: 'primitives' 
    },
    { 
        id: 'PatearPelotaChuy', 
        intlId: 'kickBall',
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
        intlId: 'ballHere', 
        categoryId: 'sensors' 
    },
    { 
        id: 'TocandoPingPong', 
        intlId: 'ballHere', 
        categoryId: 'sensors' 
    },
    { 
        id: 'TocandoPaleta', 
        intlId: 'paddleHere', 
        categoryId: 'sensors' 
    },
    { 
        id: 'TocandoPelotaChuy', 
        intlId: 'ballHere', 
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
    }
]


