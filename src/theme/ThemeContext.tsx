import { createTheme, Theme, useMediaQuery } from "@mui/material";
import { createContext, FC, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { getDesignTokens } from "./theme";
import { LocalStorage } from "../localStorage";
import { Ember } from "../emberCommunication";

export type ThemeMode = 'light' | 'dark'

type ThemeContextType = {
    darkModeEnabled: boolean;
    setDarkModeEnabled: (mode: boolean) => void;
    simpleReadModeEnabled: boolean;
    setSimpleReadModeEnabled: (mode: boolean) => void;
    theme: Theme;
    isSmallScreen: boolean
};

export const ThemeContext = createContext<ThemeContextType>({
    darkModeEnabled: false,
    setDarkModeEnabled: () => { },
    simpleReadModeEnabled: false,
    setSimpleReadModeEnabled: () => { },
    theme: createTheme({}),
    isSmallScreen: false
});

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {

    const [darkModeEnabled, setDarkModeEnabled] = useState(LocalStorage.getIsDarkMode());
    const [simpleReadModeEnabled, setSimpleReadModeEnabled] = useState(LocalStorage.getIsSimpleReadMode());

    const theme = useMemo(     
        () => createTheme( getDesignTokens(darkModeEnabled, simpleReadModeEnabled)),
        [darkModeEnabled, simpleReadModeEnabled]
    );

    useEffect(() =>{
        LocalStorage.saveDarkMode(darkModeEnabled)
        LocalStorage.saveSimpleReadMode(simpleReadModeEnabled)
        Ember.refreshIframe()
    }, [darkModeEnabled, simpleReadModeEnabled])
    
    const isSmallScreen: boolean = useMediaQuery(theme.breakpoints.down('sm'));


    return (
        <ThemeContext.Provider value={{ darkModeEnabled, setDarkModeEnabled, simpleReadModeEnabled, setSimpleReadModeEnabled, theme, isSmallScreen }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => {
    return useContext(ThemeContext);
  };
