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

  indexInGroup(challenge: Challenge) {
    return this.challenges.findIndex(findChallenge => findChallenge.id === challenge.id)
  }

  nextChallenge(challenge: Challenge) {
    const index = this.indexInGroup(challenge)
    return (index === this.challenges.length - 1 ? undefined : this.challenges[index + 1])
  }

  previousChallenge(challenge: Challenge) {
    const index = this.indexInGroup(challenge)
    return (index === 0 ? undefined : this.challenges[index - 1])
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
    id: '1001',
    challengeIds: [1001]
  },
  {
    id: '1046',
    challengeIds: [1046]
  },
  {
    id: '1002',
    challengeIds: [1002]
  },
  {
    id: '1003',
    challengeIds: [1003]
  },
  {
    id: '1004',
    challengeIds: [1004]
  },
  {
    id: '1005',
    challengeIds: [1005]
  },
  {
    id: '1006',
    challengeIds: [1006]
  },
  {
    id: '1007',
    challengeIds: [1007]
  },
  {
    id: '1008',
    challengeIds: [1008]
  },
  {
    id: '1009',
    challengeIds: [1009]
  },
  {
    id: '1010',
    challengeIds: [1010]
  },
  {
    id: '1011',
    challengeIds: [1011]
  },
  {
    id: '1012',
    challengeIds: [1012]
  },
  {
    id: '1013',
    challengeIds: [1013]
  },
  {
    id: '1014',
    challengeIds: [1014]
  },
  {
    id: '1038',
    challengeIds: [1038]
  },
  {
    id: '1039',
    challengeIds: [1039]
  },
  {
    id: '1040',
    challengeIds: [1040]
  },
  {
    id: '1041',
    challengeIds: [1041]
  },
  {
    id: '1015',
    challengeIds: [1015]
  },
  {
    id: '1018',
    challengeIds: [1018]
  },
  {
    id: '1016',
    challengeIds: [1016]
  },
  {
    id: '1017',
    challengeIds: [1017]
  },
  {
    id: '1042',
    challengeIds: [1042]
  },
  {
    id: '1043',
    challengeIds: [1043]
  },
  {
    id: '1044',
    challengeIds: [1044]
  },
  {
    id: '1045',
    challengeIds: [1045]
  },
  {
    id: '1019',
    challengeIds: [1019]
  },
  {
    id: '1020',
    challengeIds: [1020]
  },
  {
    id: '1021',
    challengeIds: [1021]
  },
  {
    id: '1022',
    challengeIds: [1022]
  },
  {
    id: '1023',
    challengeIds: [1023]
  },
  {
    id: '1024',
    challengeIds: [1024]
  },
  {
    id: '1025',
    challengeIds: [1025]
  },
  {
    id: '1026',
    challengeIds: [1026]
  },
  {
    id: '1027',
    challengeIds: [1027]
  },
  {
    id: '1028',
    challengeIds: [1028]
  },
  {
    id: 'dibujando',
    challengeIds: [1029, 1030, 1031, 1032, 1033, 1034, 1035, 1036, 1037]
  },
  {
    id: '1130',
    challengeIds: [1130]
  },
  {
    id: '1131',
    challengeIds: [1131]
  },
  {
    id: '1132',
    challengeIds: [1132]
  },
  {
    id: '1133',
    challengeIds: [1133]
  },
  {
    id: '1134',
    challengeIds: [1134]
  },
  {
    id: '1135',
    challengeIds: [1135]
  },
  {
    id: '1136',
    challengeIds: [1136]
  }
];
