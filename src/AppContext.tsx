import React, { useEffect, useState } from 'react';
import { Ember } from './emberCommunication';
import { SELECTED_LANGUAGE_KEY, spanish } from './language';

type AppContextType = {
  language: string;
  setLanguage: (language: string) => void;
};

const defaultValue = {
  language: spanish.languageCode,
  setLanguage: () => {}
}

export const AppContext = React.createContext<AppContextType>(defaultValue);

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppContextProvider: React.FC<AppProviderProps> = ({ children }: AppProviderProps) => {
  const [language, setLanguage] = useState(localStorage.getItem(SELECTED_LANGUAGE_KEY) || spanish.languageCode);

  useEffect(() => {
    localStorage.setItem(SELECTED_LANGUAGE_KEY, language)
    Ember.changeLanguage(language)
  }, [language])

  return (
    <AppContext.Provider value={{ language, setLanguage }}>
      {children}
    </AppContext.Provider>
  );
};