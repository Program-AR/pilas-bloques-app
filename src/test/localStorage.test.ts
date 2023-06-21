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

    beforeEach(() => {
        localStorage.clear()
        localStorage.setItem('PB_USER', JSON.stringify(fakeUser))
    });

    test('Should get localStorage data', () => {
        expect(LocalStorage.getUser()).toEqual(fakeUser)
    })

    test('Should return null when data does not exist', () => {
        localStorage.clear()
        expect(LocalStorage.getUser()).toBeNull()
    })

    test('On fails, should clean localStorage', () => {
        localStorage.setItem('PB_USER', "123{ASD")
        LocalStorage.getUser()
        expect(LocalStorage.getUser()).toBeNull()
    })

})