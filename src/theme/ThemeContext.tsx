import { createTheme, Theme, useMediaQuery } from "@mui/material";
import { createContext, FC, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { getDesignTokens } from "./theme";
import { LocalStorage } from "../localStorage";
import { Ember } from "../emberCommunication";
import Blockly, { Theme as BlocklyTheme } from 'blockly/core'


const BlocklyClassicTheme = Blockly.Theme.defineTheme('classicBlockly', {
  base: Blockly.Themes.Classic,
  name: "classicBlockly"
})

const BlocklyDarkTheme = Blockly.Theme.defineTheme('darkBlockly', {
  base: Blockly.Themes.Classic,
  componentStyles: {
    workspaceBackgroundColour: '#1e1e1e',
    toolboxBackgroundColour: '#333',
    toolboxForegroundColour: '#fff',
    flyoutBackgroundColour: '#252526',
    flyoutForegroundColour: '#ccc',
    flyoutOpacity: 1,
    scrollbarColour: '#797979',
    insertionMarkerColour: '#fff',
    insertionMarkerOpacity: 0.3,
    scrollbarOpacity: 0.4,
    cursorColour: '#d0d0d0'
  },
  name: "darkBlockly"
});

export const setBlocklyTheme = ( dark: boolean ) => 
  dark ? BlocklyDarkTheme : BlocklyClassicTheme 



export type ThemeMode = 'light' | 'dark'

type ThemeContextType = {
    darkModeEnabled: boolean;
    setDarkModeEnabled: (mode: boolean) => void;
    simpleReadModeEnabled: boolean;
    setSimpleReadModeEnabled: (mode: boolean) => void;
    theme: Theme;
    isSmallScreen: boolean;
    blocklyTheme: BlocklyTheme;
};

export const ThemeContext = createContext<ThemeContextType>({
    darkModeEnabled: false,
    setDarkModeEnabled: () => { },
    simpleReadModeEnabled: false,
    setSimpleReadModeEnabled: () => { },
    theme: createTheme({}),
    isSmallScreen: false,
    blocklyTheme: setBlocklyTheme(false)
});

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {

    const [darkModeEnabled, setDarkModeEnabled] = useState(LocalStorage.getIsDarkMode());
    const [simpleReadModeEnabled, setSimpleReadModeEnabled] = useState(LocalStorage.getIsSimpleReadMode());

    const theme = useMemo(     
        () => createTheme( getDesignTokens(darkModeEnabled, simpleReadModeEnabled)),
        [darkModeEnabled, simpleReadModeEnabled]
    );

    const blocklyTheme = useMemo(     
      () => setBlocklyTheme(darkModeEnabled),
      [darkModeEnabled]
  );

    useEffect(() =>{
        LocalStorage.saveDarkMode(darkModeEnabled)
        LocalStorage.saveSimpleReadMode(simpleReadModeEnabled)
        Ember.refreshIframe()

    }, [darkModeEnabled, simpleReadModeEnabled])
    
    const isSmallScreen: boolean = useMediaQuery(theme.breakpoints.down('sm'));


    return (
        <ThemeContext.Provider value={{ darkModeEnabled, setDarkModeEnabled, simpleReadModeEnabled, setSimpleReadModeEnabled, theme, isSmallScreen, blocklyTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => {
    return useContext(ThemeContext);
  };
