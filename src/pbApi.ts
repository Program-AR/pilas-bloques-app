import { LocalStorage } from "./localStorage";

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

export namespace PilasBloquesApi{

    export const login = async (credentials: Credentials) => {
      await _send<Credentials>('POST', 'login', credentials)
      .then(user => LocalStorage.saveUser(user))
    }

    const baseURL = process.env.REACT_APP_API_URL

    async function _send<T>(method: HttpMethod, resource: string, body: T) {
        const user = LocalStorage.getUser()
        const url = `${baseURL}/${resource}`

        const headers = new Headers()
        headers.append('Content-Type', 'application/json');
        if(user) headers.append('Authorization', `Bearer ${user.token}`)

        return _doFetch(url, {
          method,
          body: JSON.stringify(body),
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