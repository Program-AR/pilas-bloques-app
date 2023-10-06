import { Challenge, ExpectationConfig } from "./challenges"
import { getGroup, Group, groupIncludesChallenge } from "./groups"

type RawChapterData = {
    id: string,
    groupIds: string[],
    expectations?: ExpectationConfig
}

export type Chapter = {
    id: string,
    groups: Group[],
    expectations?: ExpectationConfig
}

export const getChapter = (id: string): Chapter => {
    const groupData: RawChapterData = rawChapterData.find(chapter => chapter.id === id)!
    const groups = groupData.groupIds.map(getGroup)
    return {id, groups, expectations: groupData.expectations}
}

export const chapterIncludesChallenge = (chapter: Chapter, challenge: Challenge): boolean => {
    return chapter.groups.some(group => groupIncludesChallenge(group, challenge))
}

export const rawChapterData: RawChapterData[] = [
    {
        id: 'Capítulo 3',
        groupIds: ['manual1cPrimaria3.1.2', 'manual1cPrimaria3.1.3', 'manual1cPrimaria3.1.4', 'manual1cPrimaria3.2.2', 'manual1cPrimaria3.2.3', 'manual1cPrimaria3.I']
    },
    {
        id: 'Capítulo 4',
        groupIds: ['manual1cPrimaria4.1.3', 'manual1cPrimaria4.1.4', 'manual1cPrimaria4.2.3', 'manual1cPrimaria4.I'],
        expectations: {
            simpleRepetition: true
        }
    },
    {
        id: 'Capítulo 5',
        groupIds: ['manual1cPrimaria5.1.3', 'manual1cPrimaria5.1.4', 'manual1cPrimaria5.2.1', 'manual1cPrimaria5.I', 'manual1cPrimariaOtros'],
        expectations: {
            conditionalAlternative: true
        }
    },
    {
        id: 'Autómatas, comandos, procedimientos y repetición',
        groupIds: ['CapyYGuyra', 'NuevosComandosCapy', 'ElGatoEnLaCalle', 'NoMeCansoDeSaltar', 'ElMarcianoEnElDesierto', 'TitoEnciendeLuces', 'ElAlienYLasTuercas', 'ElRecolectorDeEstrellas', 'MariaLaComeSandias', 'AlimentandoALosPeces', 'InstalandoJuegos', 'LaGranAventuraDelMarEncantado', 'ReparandoLaNave'],
        expectations: {
            simpleRepetition: true
        }
    },
    {
        id: 'Alternativa condicional',
        groupIds: ['ElMonoYLasBananas', 'LaEleccionDelMono', 'LaberintoCorto', 'LasRocasDeNano', 'LosCaminosDeNano', 'UnaFiestaArruinada', 'RedecorandoFiestas', 'TresNaranjas', 'TitoRecargado', 'LaberintoLargo', 'ElPasilloCurvoDeSandias', 'ElFestinFrutal', 'RecolectorDeGalaxias', 'ElDesiertoMultiFrutal']
    },
    {
        id: 'Repetición condicional',
        groupIds: ['SuperTito1', 'SuperTito2', 'LaberintoConQueso', 'ElDetectiveChaparro', 'FutbolRobots', 'PrendiendoLasCompus', 'ElMonoQueSabeContar']
    },
    {
        id: 'Sensores Numéricos',
        groupIds: ['ElSuperviaje', 'ElMonoCuentaDeNuevo']
    },
    {
        id: 'Parametrización de soluciones',
        groupIds: ['ElPlanetaDeNano', 'Dibujando Figuras', 'LaFiestaDeDracula', 'SalvandoLaNavidad', 'PrendiendoLasCompusParametrizado', 'TitoCuadrado', 'ElCangrejoAguafiestas', 'PrendiendoLasFogatas', 'DibujoLibre'],
        expectations: {
            simpleRepetition: true
        }
    },
    {
        id: 'Desafios complementarios',
        groupIds: ['tecnopolis2021EjercicioModelo', 'tecnopolis2021ConDuba', 'tecnopolis2021ConLita', 'tecnopolis2021ConCoty', 'tecnopolis2021ConToto']
    }
];
