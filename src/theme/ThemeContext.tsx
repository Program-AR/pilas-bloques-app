import { createTheme } from "@mui/material";
import { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from "react";
import { getDesignTokens } from "./theme";
import { Theme } from "@emotion/react";

export type ThemeMode = 'light' | 'dark'

type ThemeContextType = {
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
    theme: Theme
};

export const ThemeContext = createContext<ThemeContextType>({
    mode: "light",
    setMode: () => { },
    theme: {}
});

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {

    const [mode, setMode] = useState<ThemeMode>("light");

    const theme = useMemo(
        () => createTheme(getDesignTokens(mode)),
        [mode]
    );

    return (
        <ThemeContext.Provider value={{ mode, setMode, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};
