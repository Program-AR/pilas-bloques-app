import React, { useEffect, useState } from 'react';

type CreatorContextType = {
    selectedTool: string;
    setSelectedTool: (selectedTool: string) => void;
};

export const CreatorContext = React.createContext<CreatorContextType>({
    selectedTool: '',
    setSelectedTool: () => { }
});

type CreatorProviderProps = {
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