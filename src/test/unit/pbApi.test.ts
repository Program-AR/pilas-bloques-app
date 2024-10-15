import fetchMock from 'fetch-mock-jest';
import { PilasBloquesApi } from '../../pbApi';
import { LocalStorage } from '../../localStorage';
import { fakeUser, mockApi, mockApiPath } from '../testUtils';

describe('PB Api', () => {

    const credentials = { username: "TEST", password: "TEST" }

    const fetchCallBody = () => {
        const body = fetchMock.lastCall()![1]?.body
        return JSON.parse(body as string)
    }

    beforeAll(() => {
        mockApi()
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

    authTest('On login should save user data', () => PilasBloquesApi.login(credentials))

    authTest('On register should save user data', () => PilasBloquesApi.register({
        username: "TEST",
        password: "TEST",
        avatarURL: "abc",
        email: "user@test.com",
        parentName: "test",
        parentDNI: "123"
    }))

    authTest('On change password should save user data', () => PilasBloquesApi.changePassword("TEST", "TEST"))

    test('Should add context to body', async () => {
        await PilasBloquesApi.login(credentials)
        const body = fetchCallBody()
        const contextAttributes = ['session',
            'online',
            'browserId',
            'userId',
            'experimentGroup',
            'url',
            'locale',
            'usesNightTheme',
            'usesSimpleRead',
            'usesFullScreen',
            'solvedChallenges']

        contextAttributes.forEach(attr => { expect(body.context).toHaveProperty(attr) })
    })

    test('Should add timestamp to body', async () => {
        await PilasBloquesApi.login(credentials)
        const body = fetchCallBody()
        expect(body).toHaveProperty('timestamp')
    })

    test('If user is logged should set authorization header', async () => {
        LocalStorage.saveUser({...fakeUser, nickName: '', avatarURL: '', id:''})
        await PilasBloquesApi.login(credentials)
        const headers = fetchMock.lastCall()![1]?.headers
        expect((headers as Headers).get('authorization')).toEqual('Bearer TOKEN')
    })

    test('Should handle server error', async () => {
        mockApiPath('login', { body: "SERVER ERROR", status: 400 })
        expect(async () => {await PilasBloquesApi.login(credentials)}).rejects.toThrow("SERVER ERROR")
    })
})

