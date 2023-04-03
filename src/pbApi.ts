export const PB_USER = 'PB_USER'

interface User{
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

export namespace PilasBloquesApi{
    export const getUser: () => User | null = () => {
        const userString = localStorage.getItem(PB_USER);
        return userString ? JSON.parse(userString) : null;
    }

    export const login = async (credentials: Credentials) => {
      await _send('POST', 'login', credentials)
      .then(user => localStorage.setItem(PB_USER, JSON.stringify(user)))
    }

    const baseURL = process.env.REACT_APP_API_URL

    async function _send(method: any, resource: string, body: any) {
        const user = getUser()
        const url = `${baseURL}/${resource}`
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': user ? `Bearer ${user.token}` : null
        }

        return _doFetch(url, {
          method,
          body: JSON.stringify(body),
          headers
        })
          .catch(connectionErr => {
            throw connectionErr
          })
          .then(res => {
            if (res.status >= 400) { return res.text().then(message => { throw { status: res.status, message } }) }
            else { return res.json().catch(() => { /** if not body present */ }) }
          })    
      }
    
      function _doFetch(url: RequestInfo | URL, options: any) {
        try {
          return fetch(url, options)
        } catch (err) {
          return Promise.reject(err)
        }
      }
}