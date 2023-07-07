import React, { useEffect, useState } from 'react';

type CreatorContextType = {
    selectedTool: string;
    changeSelectedTool: (selectedTool: string) => void;
};

export const CreatorContext = React.createContext<CreatorContextType>({
    selectedTool: '',
    changeSelectedTool: () => { }
});

type CreatorProviderProps = {
    children: React.ReactNode;
};

export const CreatorContextProvider: React.FC<CreatorProviderProps> = ({ children }: CreatorProviderProps) => {
    const [selectedTool, setSelectedTool] = useState('');

    const changeSelectedTool = (value: string) => {
        setSelectedTool(value);
    };

    return (
        <CreatorContext.Provider value={{ selectedTool, changeSelectedTool }}>
            {children}
        </CreatorContext.Provider>
    );
};