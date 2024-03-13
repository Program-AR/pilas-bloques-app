import { PilasBloquesApi } from "../../pbApi"
import { PBSession } from "../../pbSession"

describe('Session', () => {
    test('Context has the session context', async () => {
        const context = await PBSession.context()
        const contextProperties = [
            'session',
            'online',
            'browserId',
            'userId',
            'version',
            'experimentGroup',
            'url',
            'ip',
            'locale',
            'usesNightTheme',
            'usesSimpleRead',
            'usesFullScreen',
            'solvedChallenges'
        ]   

        contextProperties.forEach(property => {
            expect(context).toHaveProperty(property)
        });

    })
})