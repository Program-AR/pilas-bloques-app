import { allRules, maxProgramLengthOf, selectedRulesOf, withSelectedRules } from "../../../../components/creator/Editor/ChallengeDetailsEdition/RulesEditor/rules"

describe('Rules selection', () => {

    describe('selectedRulesOf', () => {
        test('a challenge without assesments has no selected rules', () => {
            expect(selectedRulesOf(undefined)).toEqual([])
            expect(selectedRulesOf({})).toEqual([])
        })

        test('only the rules set in true are selected', () => {
            const assesments = { simpleRepetition: true, proceduresNamed: false, mainNotTooLong: true }
            expect(selectedRulesOf(assesments)).toEqual(['simpleRepetition', 'mainNotTooLong'])
        })

        test('assesments that are not rules are not selected', () => {
            expect(selectedRulesOf({ itWorks: true, maxProgramLength: 5, decomposition: { maxProgramLength: 9 } })).toEqual([])
        })

        test('the rules are always returned in the order of the options', () => {
            const assesments = { doesNotNestControlStructures: true, simpleRepetition: true }
            expect(selectedRulesOf(assesments)).toEqual(['simpleRepetition', 'doesNotNestControlStructures'])
        })
    })

    describe('withSelectedRules', () => {
        test('saves the selected rules', () => {
            expect(withSelectedRules(undefined, ['simpleRepetition', 'proceduresNamed']))
                .toEqual({ simpleRepetition: true, proceduresNamed: true })
        })

        test('replaces the rules that were selected before', () => {
            expect(withSelectedRules({ simpleRepetition: true, mainNotTooLong: true }, ['mainNotTooLong', 'noEmptyProcedures']))
                .toEqual({ mainNotTooLong: true, noEmptyProcedures: true })
        })

        test('keeps the assesments that are not rules', () => {
            const assesments = { itWorks: false, maxProgramLength: 5, decomposition: { maxProgramLength: 9 }, simpleRepetition: true }

            expect(withSelectedRules(assesments, ['proceduresNamed']))
                .toEqual({ itWorks: false, maxProgramLength: 5, decomposition: { maxProgramLength: 9 }, proceduresNamed: true })
        })

        test('returns undefined when no rule is left, so an empty assesments is not saved', () => {
            expect(withSelectedRules(undefined, [])).toBeUndefined()
            expect(withSelectedRules({ simpleRepetition: true, mainNotTooLong: true }, [])).toBeUndefined()
        })

        test('does not modify the assesments it receives', () => {
            const assesments = { simpleRepetition: true }
            withSelectedRules(assesments, [])
            expect(assesments).toEqual({ simpleRepetition: true })
        })

        test('every rule can be saved and read back', () => {
            expect(selectedRulesOf(withSelectedRules(undefined, allRules))).toEqual(allRules)
        })
    })

    describe('maxProgramLengthOf', () => {
        test('is 7 by default', () => {
            expect(maxProgramLengthOf(undefined)).toBe(7)
            expect(maxProgramLengthOf({ simpleRepetition: true })).toBe(7)
        })

        test('uses the one of the assesments', () => {
            expect(maxProgramLengthOf({ maxProgramLength: 5 })).toBe(5)
        })

        test('uses the one of the legacy decomposition assesment', () => {
            expect(maxProgramLengthOf({ decomposition: { maxProgramLength: 9 } })).toBe(9)
        })

        test('maxProgramLength has priority over the decomposition one', () => {
            expect(maxProgramLengthOf({ maxProgramLength: 5, decomposition: { maxProgramLength: 9 } })).toBe(5)
        })
    })
})
