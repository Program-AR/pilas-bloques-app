import { render } from "@testing-library/react";
import { ReactElement } from "react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import i18n from "../i18n";
import fetchMock from 'fetch-mock-jest';
import { MockResponse, MockOptions } from 'fetch-mock';
import { CreatorContextProvider } from "../components/creator/Editor/CreatorContext";
import { PilasBloquesApi } from "../pbApi";

/**
 * Renders a component for testing purposes.
 * Provides i18n and route dynamic params if routePath and param are given.
 * Provides additional entries
 * @param component The component to render
 * @param routePath Route with dynamic param with colon, e.g. "posts/:id"
 * @param param e.g. "8" (meaning post with id 8)
 * @param entries e.g. `{state: {userName='John'}}`
 */
export const renderComponent = (
  component: ReactElement,
  routePath: string = '',
  param: string = '',
  otherEntries: any[] = []) => {
  const basePath = routePath.split(":")[0]
  return render(
    <MemoryRouter initialEntries={[basePath + param].concat(otherEntries)}>
      <Routes>
        <Route path={routePath}
          element={
            <I18nextProvider i18n={i18n}>
              {component}
            </I18nextProvider>
          } />
      </Routes>
    </MemoryRouter>)
}

export const renderWithContext = (component: ReactElement) => {
  render(
    <CreatorContextProvider>
      {component}
    </CreatorContextProvider>
  )
}

/**
 * Identical to performing expect(expr).toThrow(description) 
 * but with console.error mocked not to saturate test ouptut
 * @param description Error expected
 * @param expr Function that causes the error
 */
export const expectToThrow = (expr: () => any, description?: string) => {
  const errorFn = console.error
  console.error = (_) => { }
  const returnValue = expect(expr).toThrow(description)
  console.error = errorFn
  return returnValue
}
export const mockApiPath = (path: string, response: MockResponse, options?: MockOptions | undefined) => {
  fetchMock.mock(`${PilasBloquesApi.baseURL}/${path}`, response, options)
}

export const fetchCallBody = () => {
  const body = fetchMock.lastCall()![1]?.body
  return JSON.parse(body as string)
}

export const fakeUser = { username: "TEST", token: "TOKEN", answeredQuestionIds: [] }

export const mockApi = () => {
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

export const failAllApiFetchs = () => {
  fetchMock.reset()
  mockApiPath("", { throws: 'ERROR' })
}