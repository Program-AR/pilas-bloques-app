import { Challenge, getChallengeWithId } from "./challenges"

type RawGroup = {
  id: string,
  challengeIds: number[],
  cover?: string
}

export class Group {
  id!: string
  challenges: Challenge[]
  cover?: string

  constructor(rawGroup: RawGroup, _challenges: Challenge[]){
    Object.assign(this, rawGroup)
    this.challenges = _challenges
  }

  hasOnlyOneChallenge() {
    return this.challenges.length === 1
  }

  includes(challenge: Challenge) {
    return this.challenges.some(otherChallenge => otherChallenge.id === challenge.id)
  }
}

export const getGroup = (id: string): Group => {
  const groupData: RawGroup = rawGroup.find(group => group.id === id)!
  const challenges: Challenge[] = groupData.challengeIds.map(getChallengeWithId)
  return new Group(groupData, challenges)
}

const rawGroup: RawGroup[] = [
  {
    id: 'AlienTocaBoton',
    challengeIds: [1]
  },
  {
    id: 'NuevosComandos',
    challengeIds: [46]
  },
  {
    id: 'ElGatoEnLaCalle',
    challengeIds: [2]
  },
  {
    id: 'NoMeCansoDeSaltar',
    challengeIds: [3]
  },
  {
    id: 'ElMarcianoEnElDesierto',
    challengeIds: [4]
  },
  {
    id: 'TitoEnciendeLuces',
    challengeIds: [5]
  },
  {
    id: 'ElAlienYLasTuercas',
    challengeIds: [6]
  },
  {
    id: 'ElRecolectorDeEstrellas',
    challengeIds: [7]
  },
  {
    id: 'MariaLaComeSandias',
    challengeIds: [8]
  },
  {
    id: 'AlimentandoALosPeces',
    challengeIds: [9]
  },
  {
    id: 'InstalandoJuegos',
    challengeIds: [10]
  },
  {
    id: 'LaGranAventuraDelMarEncantado',
    challengeIds: [11]
  },
  {
    id: 'ReparandoLaNave',
    challengeIds: [12]
  },
  {
    id: 'ElMonoYLasBananas',
    challengeIds: [13]
  },
  {
    id: 'LaEleccionDelMono',
    challengeIds: [14]
  },
  {
    id: 'LaberintoCorto',
    challengeIds: [15]
  },
  {
    id: 'TresNaranjas',
    challengeIds: [16]
  },
  {
    id: 'LasRocasDeNano',
    challengeIds: [38]
  },
  {
    id: 'LosCaminosDeNano',
    challengeIds: [39]
  },
  {
    id: 'TitoRecargado',
    challengeIds: [17]
  },
  {
    id: 'LaberintoLargo',
    challengeIds: [18]
  },
  {
    id: 'SuperTito1',
    challengeIds: [19]
  },
  {
    id: 'SuperTito2',
    challengeIds: [20]
  },
  {
    id: 'LaberintoConQueso',
    challengeIds: [21]
  },
  {
    id: 'ElDetectiveChaparro',
    challengeIds: [22]
  },
  {
    id: 'FutbolRobots',
    challengeIds: [23]
  },
  {
    id: 'PrendiendoLasCompus',
    challengeIds: [24]
  },
  {
    id: 'ElMonoQueSabeContar',
    challengeIds: [25]
  },
  {
    id: 'ElSuperviaje',
    challengeIds: [26]
  },
  {
    id: 'ElMonoCuentaDeNuevo',
    challengeIds: [27]
  },
  {
    id: 'ElPlanetaDeNano',
    challengeIds: [28]
  },
  {
    id: 'UnaFiestaArruinada',
    challengeIds: [40]
  },
  {
    id: 'RedecorandoFiestas',
    challengeIds: [41]
  },
  {
    id: 'ElDesiertoMultiFrutal',
    challengeIds: [42]
  },
  {
    id: 'ElPasilloCurvoDeSandias',
    challengeIds: [43]
  },
  {
    id: 'ElFestinFrutal',
    challengeIds: [44]
  },
  {
    id: 'RecolectorDeGalaxias',
    challengeIds: [45]
  },
  {
    id: 'Dibujando Figuras',
    challengeIds: [29, 30, 31, 32, 33, 34, 35, 36, 37]
  },
  {
    id: 'LaFiestaDeDracula',
    challengeIds: [130]
  },
  {
    id: 'SalvandoLaNavidad',
    challengeIds: [131]
  },
  {
    id: 'PrendiendoLasCompusParametrizado',
    challengeIds: [132]
  },
  {
    id: 'TitoCuadrado',
    challengeIds: [133]
  },
  {
    id: 'ElCangrejoAguafiestas',
    challengeIds: [134]
  },
  {
    id: 'PrendiendoLasFogatas',
    challengeIds: [135]
  },
  {
    id: 'DibujoLibre',
    challengeIds: [136]
  },
  {
    id: 'manual1cPrimaria3.1.2',
    challengeIds: [201, 202, 203, 204, 205, 206]
  },
  {
    id: 'manual1cPrimaria3.1.3',
    challengeIds: [207, 208, 209, 210, 211, 212, 213]
  },
  {
    id: 'manual1cPrimaria3.1.4',
    challengeIds: [214, 215]
  },
  {
    id: 'manual1cPrimaria3.2.2',
    challengeIds: [216, 217, 218, 219]
  },
  {
    id: 'manual1cPrimaria3.2.3',
    challengeIds: [220, 221, 222, 223, 224]
  },
  {
    id: 'manual1cPrimaria3.I',
    challengeIds: [225, 226, 227, 228, 229]
  },
  {
    id: 'manual1cPrimaria4.1.3',
    challengeIds: [230, 231, 232]
  },
  {
    id: 'manual1cPrimaria4.1.4',
    challengeIds: [233, 234, 235]
  },
  {
    id: 'manual1cPrimaria4.2.3',
    challengeIds: [236, 237, 238, 239]
  },
  {
    id: 'manual1cPrimaria4.I',
    challengeIds: [240, 241]
  },
  {
    id: 'manual1cPrimaria5.1.3',
    challengeIds: [242, 243, 244]
  },
  {
    id: 'manual1cPrimaria5.1.4',
    challengeIds: [245, 246, 247]
  },
  {
    id: 'manual1cPrimaria5.2.1',
    challengeIds: [248, 249, 250]
  },
  {
    id: 'manual1cPrimaria5.I',
    challengeIds: [251, 252, 253, 254]
  },
  {
    id: 'manual1cPrimariaOtros',
    challengeIds: [255]
  },
  {
    id: 'CapyYGuyra',
    challengeIds: [1001]
  },
  {
    id: 'NuevosComandosCapy',
    challengeIds: [1046]
  },
  {
    id: 'tecnopolis2021EjercicioModelo',
    challengeIds: [202101, 202102]
  },
  {
    id: 'tecnopolis2021ConDuba',
    challengeIds: [2021001, 2021002, 2021003, 2021004, 2021005, 2021006, 2021007, 2021008]
  },
  {
    id: 'tecnopolis2021ConLita',
    challengeIds: [2021101, 2021102, 2021103, 2021104, 2021105, 2021106, 2021107, 2021108]
  },
  {
    id: 'tecnopolis2021ConCoty',
    challengeIds: [2021201, 2021202, 2021203, 2021204, 2021205, 2021206, 2021207]
  },
  {
    id: 'tecnopolis2021ConToto',
    challengeIds: [2021301, 2021302, 2021303, 2021304, 2021305, 2021306, 2021307, 2021308, 2021309]
  },
  {
    id: 'Nuevos Desafios',
    challengeIds: [1004,1005,1006,1007,1008,1009,1010,1013,1014,1038,1039,1040,1041,1015,1018,1016,1017,1042,1043,1044,1045,1019,1020,1021,1023,1024,1025,1027,1028,1132,1133,1134]
  },
];
