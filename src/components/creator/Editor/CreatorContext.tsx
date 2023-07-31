import React, { useEffect, useState } from 'react';
import { SceneMap, SerializedChallenge, defaultChallenge } from '../../serializedChallenge';
import { LocalStorage } from '../../../localStorage';
import { ACTOR } from './SceneEdition/mapUtils';

export type CreatorContextType = {
    selectedTool: string;
    setSelectedTool: (selectedTool: string) => void;
    currentMap: SceneMap;
    setCurrentMap: (map: SceneMap) => void;
    index: number;
    setIndex: (index: number) => void;
    setMaps: (maps: any) => void;
    maps: SceneMap[]
};

const defaultCreatorContext = {
    selectedTool: '',
    setSelectedTool: () => { },
    currentMap: defaultChallenge('Duba').scene.maps[0],
    setCurrentMap: () => { },
    index: 0, 
    setIndex: () => { },
    setMaps: () => { },
    maps: defaultChallenge('Duba').scene.maps
}

export const CreatorContext = React.createContext<CreatorContextType>(defaultCreatorContext);

export type CreatorProviderProps = {
    children: React.ReactNode;
    defaultSelectedTool?: string;
};

export const CreatorContextProvider: React.FC<CreatorProviderProps> = ({ children, defaultSelectedTool = ACTOR }: CreatorProviderProps) => {
    const [selectedTool, setSelectedTool] = useState(defaultSelectedTool);

    const challenge = LocalStorage.getCreatorChallenge() || defaultChallenge("Duba")
    const [maps, setMaps] = useState(challenge.scene.maps)
    const [index, setIndex] = useState(0)

    const currentMap = maps[index] || challenge.scene.maps[index]

    const setCurrentMap = (map: SceneMap) => {
        maps[index] = map
        setMaps([...maps])
    }

    useEffect(() => {
        challenge.scene.maps = maps
        LocalStorage.saveCreatorChallenge(challenge)
    }, [maps, challenge])

    return (
        <CreatorContext.Provider value={{ selectedTool, setSelectedTool, currentMap, setCurrentMap, index, setIndex, setMaps, maps}}>
            {children}
        </CreatorContext.Provider>
    );
};