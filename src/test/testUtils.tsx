import { render } from "@testing-library/react";
import { ReactElement } from "react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import i18n from "../i18n";

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
  render(
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