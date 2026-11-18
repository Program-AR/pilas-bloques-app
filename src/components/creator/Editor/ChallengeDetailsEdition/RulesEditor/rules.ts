import { Assesments } from "../../../../serializedChallenge";
import { DEFAULT_MAX_PROGRAM_LENGTH } from "../../../../blockly/mulang/challengeExpectations";

export type RuleId =
    'simpleRepetition'
    | 'conditionalAlternative'
    | 'conditionalRepetition'
    | 'mainNotTooLong'
    | 'proceduresNotTooLong'
    | 'noEmptyProcedures'
    | 'proceduresNamed'
    | 'doesNotNestControlStructures'

export type RuleGroup = {
    id: 'structures' | 'organization'
    rules: RuleId[]
}

export const ruleGroups: RuleGroup[] = [
    { id: 'structures', rules: ['simpleRepetition', 'conditionalAlternative', 'conditionalRepetition'] },
    {
        id: 'organization',
        rules: ['mainNotTooLong', 'proceduresNotTooLong', 'noEmptyProcedures', 'proceduresNamed', 'doesNotNestControlStructures']
    },
]

export const allRules: RuleId[] = ruleGroups.flatMap(group => group.rules)

export const selectedRulesOf = (assesments?: Assesments): RuleId[] =>
    allRules.filter(rule => assesments?.[rule] === true)


export const withSelectedRules = (assesments: Assesments | undefined, selectedRules: RuleId[]): Assesments | undefined => {
    const otherAssesments: Assesments = { ...assesments }
    allRules.forEach(rule => delete otherAssesments[rule])

    const result = { ...otherAssesments, ...Object.fromEntries(selectedRules.map(rule => [rule, true])) } as Assesments

    return Object.keys(result).length ? result : undefined
}

export const maxProgramLengthOf = (assesments?: Assesments): number =>
    assesments?.maxProgramLength ?? assesments?.decomposition?.maxProgramLength ?? DEFAULT_MAX_PROGRAM_LENGTH
