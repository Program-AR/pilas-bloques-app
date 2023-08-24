import { createTheme, CSSObject, SxProps, Theme } from "@mui/material";
import { createContext, FC, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { getDesignTokens } from "./theme";
import { LocalStorage } from "../localStorage";

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

    const [darkModeEnabled, setDarkModeEnabled] = useState(LocalStorage.getDarkModeValue());

    const theme = useMemo(
        () => createTheme(getDesignTokens(darkModeEnabled)),
        [darkModeEnabled]
    );

    useEffect(() =>{
        LocalStorage.toggleDarkMode()
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
