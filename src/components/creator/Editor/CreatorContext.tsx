import React, { useEffect, useState } from 'react';

export type CreatorContextType = {
    selectedTool: string;
    setSelectedTool: (selectedTool: string) => void;
};

export const CreatorContext = React.createContext<CreatorContextType>({
    selectedTool: '',
    setSelectedTool: () => { }
});

export type CreatorProviderProps = {
    children: React.ReactNode;
};

export const CreatorContextProvider: React.FC<CreatorProviderProps> = ({ children }: CreatorProviderProps) => {
    const [selectedTool, setSelectedTool] = useState('');

    return (
        <CreatorContext.Provider value={{ selectedTool, setSelectedTool }}>
            {children}
        </CreatorContext.Provider>
    );
};