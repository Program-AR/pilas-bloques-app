import React, { useEffect, useState } from 'react';
import { SceneMap, defaultChallenge } from '../../serializedChallenge';
import { LocalStorage } from '../../../localStorage';
import { Position } from './SceneEdition/Grid/SceneCell';

export type CreatorContextType = {
    selectedTool: string;
    setSelectedTool: (selectedTool: string) => void;
    currentMap: CurrentMap;
    setCurrentMap2: (map: SceneMap) => void;
    setIndex: (index: number) => void;
};

const defaultCreatorContext = {
    selectedTool: '',
    setSelectedTool: () => { },
    currentMap: {
        map: defaultChallenge("Duba").scene.maps[0],
        index: 0
    },
    setCurrentMap2: () => { },
    setIndex: () => { },
}

export const CreatorContext = React.createContext<CreatorContextType>(defaultCreatorContext);

export type CreatorProviderProps = {
    children: React.ReactNode;
    defaultSelectedTool?: string;
};

type CurrentMap = {
    map: SceneMap;
    index: number;
}

export const CreatorContextProvider: React.FC<CreatorProviderProps> = ({ children, defaultSelectedTool = '' }: CreatorProviderProps) => {
    const [selectedTool, setSelectedTool] = useState(defaultSelectedTool);

    const challenge = LocalStorage.getCreatorChallenge() || defaultChallenge("Duba")
    const [currentMap, setCurrentMap] = useState({map: challenge!.scene.maps[0] , index: 0})

    const setIndex = (newIndex: number) => setCurrentMap({...currentMap, index: newIndex})

    const setCurrentMap2 = (newMap: SceneMap) => {
        setCurrentMap({...currentMap, map: newMap})
    }

    useEffect(()=> {
        const challenge = LocalStorage.getCreatorChallenge()
        challenge!.scene.maps[currentMap.index] = currentMap.map
        LocalStorage.saveCreatorChallenge(challenge)        
    }, [currentMap])

    return (
        <CreatorContext.Provider value={{ selectedTool, setSelectedTool, currentMap, setCurrentMap2, setIndex}}>
            {children}
        </CreatorContext.Provider>
    );
};