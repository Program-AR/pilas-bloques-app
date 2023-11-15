import { createTheme, Theme } from "@mui/material";
import { createContext, FC, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { getDesignTokens } from "./theme";
import { LocalStorage } from "../localStorage";
import { Ember } from "../emberCommunication";

export type ThemeMode = 'light' | 'dark'

type ThemeContextType = {
    darkModeEnabled: boolean;
    setDarkModeEnabled: (mode: boolean) => void;
    theme: Theme
};

export const ThemeContext = createContext<ThemeContextType>({
    darkModeEnabled: false,
    setDarkModeEnabled: () => { },
    theme: createTheme({})
});

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {

    const [darkModeEnabled, setDarkModeEnabled] = useState(LocalStorage.getIsDarkMode());

    const theme = useMemo(
        () => createTheme(getDesignTokens(darkModeEnabled)),
        [darkModeEnabled]
    );

    useEffect(() =>{
        LocalStorage.saveDarkMode(darkModeEnabled)
        Ember.refreshIframe()
    }, [darkModeEnabled])

    return (
        <ThemeContext.Provider value={{ darkModeEnabled, setDarkModeEnabled, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};


export const useThemeContext = () => {
    return useContext(ThemeContext);
  };
