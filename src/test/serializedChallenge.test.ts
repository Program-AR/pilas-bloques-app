import {describe, expect, test} from '@jest/globals';
import { Scene, SerializedChallenge, isValidChallenge, sceneIsValid } from '../components/serializedChallenge';

const validScene: Scene = {
    type: "Lita",
    maps: [['L', '-'], ['A','-']]
}


describe('Scene validity', () => {

    test('Valid scene', () => {
        expect(sceneIsValid(validScene)).toBeTruthy()
    })

    test('Incomplete scene is invalid', () => {
        const incompleteScene = {
            type: "Lita"
        }
        
        expect(sceneIsValid(incompleteScene)).toBeFalsy()
    })

    test('Complete scene with invalid scene type is invalid', () => {
        const invalidScene = {
            type: "Pepita",
            maps: [['P', '-'], ['A','-']]
        }

        expect(sceneIsValid(invalidScene)).toBeFalsy()
    })

    test('Complete scene with an invalid cell is invalid', () => {
        const invalidScene = {
            type: "Lita",
            maps: [['P', '-'], ['A','ZZZ']]
        }

        expect(sceneIsValid(invalidScene)).toBeFalsy()
    })

    test('Complete scene with invalid structure is invalid', () => {
        const invalidScene = {
            type: 1337,
            maps: [['P', '-'], ['A','-']]
        }

        expect(sceneIsValid(invalidScene)).toBeFalsy()
    })
})

describe('serialized challenge validity', () => {
    const validChallenge: SerializedChallenge = {
        fileVersion: 1,
        title: "El ultimo desafio de Lita",
        statement: {
            description: "Va a poder lograrlo una ultima vez?",
            clue: "Usa el poder secreto"
        },
        scene: validScene,
        toolbox: {
            blocks: ['Uno', 'Otro'],
        },
        stepByStep: true
    }


    test('Valid challenge with valid scene is valid', () => {
        expect(isValidChallenge(validChallenge)).toBeTruthy()
    })

    test('Valid challenge with invalid scene is invalid', () => {
        const invalidChallenge = {...validChallenge, scene: {
            type: 1337,
            maps: [['P', '-'], ['A','-']]
        }}

        expect(isValidChallenge(invalidChallenge)).toBeFalsy()
    })

    test('Invalid challenge with valid scene is invalid', () => {
        const invalidChallenge = {...validChallenge, title: 1337}

        expect(isValidChallenge(invalidChallenge)).toBeFalsy()
    })
})