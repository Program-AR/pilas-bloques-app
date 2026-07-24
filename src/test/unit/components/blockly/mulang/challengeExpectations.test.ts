import { mergeConfigurations, configToExpectation, expectationFor } from '../../../../../components/blockly/mulang/challengeExpectations'
import * as Blockly from 'blockly/core'

// Mock getPathToChallenge
jest.mock('../../../../../staticData/challenges', () => ({
  getPathToChallenge: (id: string) => {
    if (id === 'challenge_with_hierarchy') {
      return {
        book: { expectations: { decomposition: true } },
        chapter: { expectations: { simpleRepetition: true } },
        group: { expectations: {} },
        challenge: { expectations: { decomposition: false } }
      }
    }
    return { book: null, chapter: null, group: null, challenge: null }
  }
}))

describe('Challenge Expectations', () => {

  const expectationsConfigMock = {
    decomposition: true,
    simpleRepetition: true,
    conditionalAlternative: true
  }

  const workspaceMock = {} as Blockly.WorkspaceSvg
  const defaultProcedureName = 'Hacer algo'

  describe('mergeConfigurations', () => {
    it('merged expectations for a single expectation configuration', () => {
      expect(mergeConfigurations([expectationsConfigMock])).toEqual(expectationsConfigMock)
    })

    it('merged expectations for no expectations configuration should be an empty object', () => {
      expect(mergeConfigurations([])).toEqual({})
    })

    it('merged expectations for multiple configurations without keys in common', () => {
      const conditionalAlternativeConfig = {
        conditionalAlternative: true
      }
      const mergedConfig = {
        decomposition: true,
        simpleRepetition: true,
        conditionalAlternative: true
      }
      expect(mergeConfigurations([expectationsConfigMock, conditionalAlternativeConfig])).toEqual(mergedConfig)
    })

    it('merged expectations for multiple configurations with keys in common should prioritize values with higher priority', () => {
      const configWithHigherPriority = {
        decomposition: false
      }
      const mergedConfig = {
        decomposition: false,
        simpleRepetition: true,
        conditionalAlternative: true
      }
      expect(mergeConfigurations([expectationsConfigMock, configWithHigherPriority])).toEqual(mergedConfig)
    })
  })

  describe('configToExpectation', () => {
    it('multiple nonexistent expectations ids are transformed to a noExpectation (empty)', () => {
      const nonexistenteEpectations = {
        foo: true,
        bar: false,
        baz: true
      }
      const result = configToExpectation(nonexistenteEpectations, workspaceMock, defaultProcedureName)
      expect(result).toBe('')
    })

    it('if a challenge does not define expectations, noExpectation is applied', () => {
      const result = configToExpectation({}, workspaceMock, defaultProcedureName)
      expect(result).toBe('')
    })
    
    it('applies valid expectations successfully', () => {
      // Test that it returns a string when valid configs are passed
      const result = configToExpectation({ simpleRepetition: true }, workspaceMock, defaultProcedureName)
      expect(typeof result).toBe('string')
      expect(result.length).toBeGreaterThan(0)
      expect(result).toContain('uses repeat')
    })
  })

  describe('expectationFor', () => {
    it('expectations from book, chapter, group and challenge should be combined', () => {
      const challenge = { id: 'challenge_with_hierarchy' }
      const result = expectationFor(challenge, workspaceMock, defaultProcedureName)
      
      // simpleRepetition should be true (from chapter)
      // decomposition should be false (challenge overrides book)
      expect(result).toContain('uses repeat')
      expect(result).not.toContain('does not nest control structures') // part of decomposition
    })

    it('returns empty expectation for a challenge with no hierarchy or expectations', () => {
      const challenge = { id: 'some_other_challenge' }
      const result = expectationFor(challenge, workspaceMock, defaultProcedureName)
      expect(result).toBe('')
    })
  })

})
