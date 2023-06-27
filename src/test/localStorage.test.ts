import { describe, expect, test } from '@jest/globals';
import { LocalStorage } from '../localStorage';
import { User } from '../pbApi';

describe('Storage', () => {

    const fakeUser: User = {
        id: "abc",
        token: "abc",
        nickName: "abc",
        avatarURL: "abc",
        answeredQuestionIds: [1, 2]
    }

    const originalConsoleError = console.log

    beforeEach(() => {
        localStorage.clear()
        localStorage.setItem('PB_USER', JSON.stringify(fakeUser))
        console.error = jest.fn()
    });

    afterEach(() => {
        console.error = originalConsoleError
    })

    test('Should get localStorage data', () => {
        expect(LocalStorage.getUser()).toEqual(fakeUser)
    })

    test('Should save localStorage data', () => {
        const newUser = { ...fakeUser, id: "cba" }
        LocalStorage.saveUser(newUser)
        expect(LocalStorage.getUser()).toEqual(newUser)
    })

    test('Should return null when data does not exist', () => {
        localStorage.clear()
        expect(LocalStorage.getUser()).toBeNull()
    })

    test('On fails, should remove problematic key', () => {
        LocalStorage.saveSelectedLocale('en-us')
        localStorage.setItem('PB_USER', "123{ASD")
        LocalStorage.getUser()
        expect(LocalStorage.getUser()).toBeNull()
        expect(LocalStorage.getSelectedLocale()).not.toBeNull()
    })

})