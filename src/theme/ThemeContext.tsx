import { createTheme, Theme } from "@mui/material";
import { createContext, FC, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { getDesignTokens } from "./theme";
import { LocalStorage } from "../localStorage";
import { Ember } from "../emberCommunication";
import { deepmerge } from '@mui/utils';

export type ThemeMode = 'light' | 'dark'

type ThemeContextType = {
    darkModeEnabled: boolean;
    setDarkModeEnabled: (mode: boolean) => void;
    simpleReadModeEnabled: boolean;
    setSimpleReadModeEnabled: (mode: boolean) => void;
    theme: Theme
};

export const ThemeContext = createContext<ThemeContextType>({
    darkModeEnabled: false,
    setDarkModeEnabled: () => { },
    simpleReadModeEnabled: false,
    setSimpleReadModeEnabled: () => { },
    theme: createTheme({})
});

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {

    const [darkModeEnabled, setDarkModeEnabled] = useState(LocalStorage.getIsDarkMode());
    const [simpleReadModeEnabled, setSimpleReadModeEnabled] = useState(LocalStorage.getIsSimpleReadMode());

    const theme = useMemo(
        () => createTheme( deepmerge(getDesignTokens(darkModeEnabled), {typography: { allVariants: { textTransform: simpleReadModeEnabled ? 'uppercase': 'initial'}}})),
        [darkModeEnabled, simpleReadModeEnabled]
    );

    useEffect(() =>{
        LocalStorage.saveDarkMode(darkModeEnabled)
        LocalStorage.saveSimpleReadMode(simpleReadModeEnabled)
        Ember.refreshIframe()
    }, [darkModeEnabled, simpleReadModeEnabled])

    return (
        <ThemeContext.Provider value={{ darkModeEnabled, setDarkModeEnabled, simpleReadModeEnabled, setSimpleReadModeEnabled, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};


export const useThemeContext = () => {
    return useContext(ThemeContext);
  };
