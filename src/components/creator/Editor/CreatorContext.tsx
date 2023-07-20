import React, { useEffect, useState } from 'react';
import { SceneMap, defaultChallenge } from '../../serializedChallenge';
import { LocalStorage } from '../../../localStorage';
import { ACTOR } from './SceneEdition/SceneEdition';

export type CreatorContextType = {
    selectedTool: string;
    setSelectedTool: (selectedTool: string) => void;
    map: SceneMap;
    setMap: (map: SceneMap) => void;
    index: number;
    setIndex: (index: number) => void;
};

const defaultCreatorContext = {
    selectedTool: '',
    setSelectedTool: () => { },
    map: defaultChallenge('Duba').scene.maps[0],
    setMap: () => { },
    index: 0, 
    setIndex: () => { },
}

export const CreatorContext = React.createContext<CreatorContextType>(defaultCreatorContext);

export type CreatorProviderProps = {
    children: React.ReactNode;
    defaultSelectedTool?: string;
};

export const CreatorContextProvider: React.FC<CreatorProviderProps> = ({ children, defaultSelectedTool = ACTOR }: CreatorProviderProps) => {
    const [selectedTool, setSelectedTool] = useState(defaultSelectedTool);

    const challenge = LocalStorage.getCreatorChallenge() || defaultChallenge("Duba")
    const [currentMap, setCurrentMap] = useState({map: challenge!.scene.maps[0] , index: 0})

    const setIndex = (newIndex: number) => setCurrentMap({...currentMap, index: newIndex})

    const setMap = (newMap: SceneMap) => setCurrentMap({...currentMap, map: newMap})

    const map = currentMap.map
    const index = currentMap.index

    useEffect(()=> {
        const challenge = LocalStorage.getCreatorChallenge()
        challenge!.scene.maps[index] = map
        LocalStorage.saveCreatorChallenge(challenge)        
    }, [currentMap])

    return (
        <CreatorContext.Provider value={{ selectedTool, setSelectedTool, map, setMap, index, setIndex}}>
            {children}
        </CreatorContext.Provider>
    );
};