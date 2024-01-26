import { Challenge, ExpectationConfig } from "./challenges"
import { getGroup, Group } from "./groups"

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
    return chapter.groups.some(group => group.includes(challenge))
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
        id: 'Desafios complementarios',
        groupIds: ['tecnopolis2021EjercicioModelo', 'tecnopolis2021ConDuba', 'tecnopolis2021ConLita', 'tecnopolis2021ConCoty', 'tecnopolis2021ConToto']
    },
    {
        id: '1',
        groupIds: ['1001', '1046', '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009', '1010', '1011', '1012']
    },
    {
        id: '2',
        groupIds: ['1013', '1014', '1038', '1039', '1040', '1041', '1015', '1018', '1016', '1017', '1042', '1043', '1044', '1045']
    },
    {
        id: '3',
        groupIds: ['1019', '1020', '1021', '1022', '1023', '1024', '1025']
    },
    {
        id: '4',
        groupIds: ['1026', '1027']
    },
    {
        id: '5',
        groupIds: ['1028', 'dibujando', '1130', '1131', '1132', '1133', '1134', '1135', '1136']
    }
];
