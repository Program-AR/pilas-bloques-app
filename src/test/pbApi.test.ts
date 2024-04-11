import fetchMock from 'fetch-mock-jest';
import { PilasBloquesApi } from '../pbApi';
import { LocalStorage } from '../localStorage';
import { MockResponse, MockOptions } from 'fetch-mock';

describe('PB Api', () => {

    const url = PilasBloquesApi.baseURL
    const fakeUser = { username: "TEST", token: "TOKEN", answeredQuestionIds: [] }
    const credentials = { username: "TEST", password: "TEST" }

    const mockApiPath = (path: string, response: MockResponse, options?: MockOptions | undefined) => {
        fetchMock.mock(`${url}/${path}`, response, options)
    }

    const mockApi = () => {
        fetchMock.reset()
        fetchMock.config.overwriteRoutes = true
        mockApiPath('login', fakeUser)
        mockApiPath('register', fakeUser)
        mockApiPath('credentials', fakeUser)
        mockApiPath('answers', fakeUser)
        mockApiPath('challenges', 200)
        mockApiPath('solutions', 200)
        mockApiPath('ping', 200)
        mockApiPath('error', { throws: 'ERROR' })
        mockApiPath('user-ip', { ip: "123.123.123" })
    }

    const failAllApiFetchs = () => {
        fetchMock.reset()
        mockApiPath("", { throws: 'ERROR' })
    }

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
})

