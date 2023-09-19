import { EmberExecutableChallenge } from "./emberCommunication"
import { User } from "./pbApi"
import { LanguageCode } from "./language"
import { SerializedChallenge } from "./components/serializedChallenge"

export namespace LocalStorage {

    const PB_SELECTED_LOCALE = 'PB_SELECTED_LOCALE'
    const PB_IMPORTED_CHALLENGE = 'PB_IMPORTED_CHALLENGE'
    const PB_USER = 'PB_USER'
    const PB_CREATOR_CHALLENGE = 'PB_CREATOR_CHALLENGE'
    const PB_USE_NIGHT_THEME = 'PB_USE_NIGHT_THEME'

    const remove = (key: string) => { localStorage.removeItem(key) }

    export const getSelectedLocale = (): LanguageCode => _get(PB_SELECTED_LOCALE)
    export const getImportedChallenge = (): EmberExecutableChallenge => _get(PB_IMPORTED_CHALLENGE)
    export const getUser = (): User | null => _get(PB_USER)
    export const getCreatorChallenge = (): SerializedChallenge | null => _get(PB_CREATOR_CHALLENGE)
    export const getIsDarkMode = (): boolean => _get(PB_USE_NIGHT_THEME) || false

    export const saveSelectedLocale = (selectedLocale: LanguageCode) => _save(PB_SELECTED_LOCALE, selectedLocale)
    export const saveImportedChallenge = (importedChallenge: EmberExecutableChallenge) => _save(PB_IMPORTED_CHALLENGE, importedChallenge)
    export const saveUser = (user: User | null) => _save(PB_USER, user)
    export const saveCreatorChallenge = (challenge: SerializedChallenge | null) => _save(PB_CREATOR_CHALLENGE, challenge)
    export const saveDarkMode = (darkMode: boolean) => _save(PB_USE_NIGHT_THEME, darkMode)

    const _get = (key: string) => _doSafe(key, (storage: Storage) => {
        const value = storage.getItem(key)
        return value && JSON.parse(value)
    })

    const _save = (key: string, data: any = null) => { _doSafe(key, (storage: Storage) => storage.setItem(key, JSON.stringify(data))) }

    const _doSafe = <T>(key: string, fn: (storage: Storage) => T) => {
        try {
            return fn(localStorage)
        } catch (e) {
            console.error("ERROR", e)
            remove(key)
        }
    }
}