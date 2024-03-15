import { SerializedChallenge } from "./components/serializedChallenge";
import { LocalStorage } from "./localStorage"
import { PBSession } from "./pbSession";

export interface User{
    id: string,
    token: string,
    nickName: string,
    avatarURL: string,
    answeredQuestionIds: number[]
}

export interface Credentials{
  username: string | null,
  password: string | null
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

declare global { // see public/index.html
  interface Window {
    PBRuntime: {apiURL: string}
  }
}

export namespace PilasBloquesApi{

    export const login = async (credentials: Credentials) => {
      await _send<Credentials>('POST', 'login', credentials)
      .then(user => LocalStorage.saveUser(user))
    }

    export const shareChallenge = async (challenge: SerializedChallenge) => {
      return await _send<SerializedChallenge>('POST', 'userChallenge', challenge)
    }

    export const getSharedChallenge = async (id: string) => {
      return await _send('GET', `userChallenge/${id}`)
    }

    export const saveChallenge = async (challenge: SerializedChallenge) => {
      return await _send<SerializedChallenge>('PUT', `userChallenge/${challenge.sharedId}`, challenge)
    }

    export const getUserIp = async () => {
      return await _send('GET', `user-ip`)
    }

    export const baseURL = window.PBRuntime?.apiURL || process.env.REACT_APP_API_URL

    async function bodyWithContext<T>(body?: T) {
      return body ? {
        ...body,
        timestamp: new Date(),
        context: await PBSession.context()
      } : undefined
    }

    async function _send<T>(method: HttpMethod, resource: string, body?: T) {
        const user = LocalStorage.getUser()
        const url = `${baseURL}/${resource}`

        const headers = new Headers()
        headers.append('Content-Type', 'application/json');
        if(user) headers.append('Authorization', `Bearer ${user.token}`)

        return _doFetch(url, {
          method,
          body: JSON.stringify(await bodyWithContext<T>(body)),
          headers
        })  
          .catch(connectionErr => {
            throw connectionErr
          })
          .then(res => {
            if (res.status >= 400) { return res.text().then(message => { throw new ApiError(res.status, message) }) }
            else { return res.json().catch(() => { /** if not body present */ }) }
          })    
      }
    
      function _doFetch(url: RequestInfo | URL, options: RequestInit) {
        try {
          return fetch(url, options)
        } catch (err) {
          return Promise.reject(err)
        }
      }
}