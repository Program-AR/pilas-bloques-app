import fetchMock from 'fetch-mock-jest';
import { PilasBloquesApi } from '../pbApi';
import { LocalStorage } from '../localStorage';
import { MockResponse, MockOptions } from 'fetch-mock';

describe('PB Api', () => {

    const url = PilasBloquesApi.baseURL
    const fakeUser = { username: "TEST", token: "TOKEN", answeredQuestionIds: [] }

    const mockApi = (path: string, response: MockResponse, options?: MockOptions | undefined) => {
        fetchMock.mock(`${url}/${path}`, response, options)
    }

    beforeAll(() => {
        fetchMock.reset()
        mockApi('login', fakeUser)
        mockApi('register', fakeUser)
        mockApi('credentials', fakeUser)
        mockApi('answers', fakeUser)
        mockApi('challenges', 200)
        mockApi('solutions', 200)
        mockApi('ping', 200)
        mockApi('error', { throws: 'ERROR' })
        mockApi('user-ip', { ip: "123.123.123" })
    })

    beforeEach(() => {
        localStorage.clear()
    })

    const authTest = (description: string, action: () => any) => {
        test(description, async () => {
            await action()
            expect(LocalStorage.getUser()).toEqual(fakeUser)
        })
    }

    authTest('On login should save user data', () => PilasBloquesApi.login({ username: "TEST", password: "TEST" }))

    authTest('On register should save user data', () => PilasBloquesApi.register({
        username: "TEST",
        password: "TEST",
        avatarURL: "abc",
        email: "user@test.com",
        parentName: "test",
        parentDNI: "123"
    }))

    authTest('On change password should save user data', () => PilasBloquesApi.changePassword("TEST", "TEST"))

})

