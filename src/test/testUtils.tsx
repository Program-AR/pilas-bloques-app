import { render } from "@testing-library/react";
import { ReactElement } from "react";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from 'react-router-dom';
import i18n from "../i18n";

export const renderComponent = (component: ReactElement) => {
  render(<BrowserRouter><I18nextProvider i18n={i18n}>{component}</I18nextProvider></BrowserRouter>)
}