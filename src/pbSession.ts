import { LocalStorage } from "./localStorage"
import { PilasBloquesApi } from "./pbApi"

export namespace PBSession {
    const inElectron = (): boolean => /electron/i.test(navigator.userAgent)
    const online = (): boolean => !inElectron()
  
    export const saveUserIP = async () => {
      if (!LocalStorage.getUserIp()) {
        try {
          const jsonIp = await PilasBloquesApi.getUserIp()
          LocalStorage.saveUserIp(jsonIp.ip)
        } catch (e) {
          console.error(e);
        }
      }
    }
  
    const userIp = async () => {
      await saveUserIP()
      LocalStorage.getUserIp()
    }
  
    export const context = async () => {
      return {
          session: null,
          online: online(),
          browserId: null,
          userId: LocalStorage.getUser(),
          version: process.env.REACT_APP_VERSION,
          experimentGroup: 'off',
          url: window.location.href,
          ip: await userIp(),
          locale: LocalStorage.getSelectedLocale(),
          usesNightTheme: LocalStorage.getIsDarkMode(),
          usesSimpleRead: LocalStorage.getIsSimpleReadMode(), 
          usesFullScreen: null, 
          solvedChallenges: null
      }
    }
  
  }