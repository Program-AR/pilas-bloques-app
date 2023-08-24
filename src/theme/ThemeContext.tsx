import { createTheme, CSSObject, SxProps, Theme, useMediaQuery } from "@mui/material";
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
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    let defaultMode = LocalStorage.getDarkModeValue()

    if(!defaultMode){
        defaultMode = prefersDarkMode
        LocalStorage.saveDarkModeValue(defaultMode)
    }

    const [darkModeEnabled, setDarkModeEnabled] = useState(defaultMode);

    const theme = useMemo(
        () => createTheme(getDesignTokens(darkModeEnabled)),
        [darkModeEnabled]
    );

    useEffect(() =>{
        Ember.toggleDarkMode()
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
