import { render } from "@testing-library/react";
import { ReactElement } from "react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import i18n from "../i18n";
import { CreatorContextProvider } from "../components/creator/Editor/CreatorContext";

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
            element = {
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
export const expectToThrow = ( expr: () => any, description?: string ) => {
  const errorFn = console.error
  console.error = (_) => {}
  const returnValue = expect(expr).toThrow(description)
  console.error = errorFn
  return returnValue
}