import React, { useEffect, useState } from 'react';
import { SceneMap, defaultChallenge } from '../../serializedChallenge';
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
    maps: SceneMap[];
    sharedId: string
    setSharedId: (id: string) => void
};

const defaultCreatorContext = {
    selectedTool: '',
    setSelectedTool: () => { },
    currentMap: defaultChallenge('Duba').scene.maps[0],
    setCurrentMap: () => { },
    index: 0, 
    setIndex: () => { },
    setMaps: () => { },
    maps: defaultChallenge('Duba').scene.maps,
    sharedId: "",
    setSharedId: (id: string) => {}
}

export const CreatorContext = React.createContext<CreatorContextType>(defaultCreatorContext);

export type CreatorProviderProps = {
    children: React.ReactNode;
    defaultSelectedTool?: string;
    defaultIndex?: number;
};

export const CreatorContextProvider: React.FC<CreatorProviderProps> = ({ children, defaultSelectedTool = ACTOR, defaultIndex = 0 }: CreatorProviderProps) => {
    const [selectedTool, setSelectedTool] = useState(defaultSelectedTool);

    const challenge = LocalStorage.getCreatorChallenge() || defaultChallenge("Duba")
    const [maps, setMaps] = useState(challenge.scene.maps)
    const [index, setIndex] = useState(defaultIndex)
    const [sharedId, setSharedId] = useState(challenge.sharedId || "")

    const currentMap = maps[index] || challenge.scene.maps[index]

    const setCurrentMap = (map: SceneMap) => {
        maps[index] = map
        setMaps([...maps])
    }

    useEffect(() => {
        challenge.scene.maps = maps
        challenge.sharedId = sharedId
        LocalStorage.saveCreatorChallenge(challenge)
    }, [maps, challenge, sharedId])

    return (
        <CreatorContext.Provider value={{ selectedTool, setSelectedTool, currentMap, setCurrentMap, sharedId: sharedId, setSharedId: setSharedId, index, setIndex, setMaps, maps}}>
            {children}
        </CreatorContext.Provider>
    );
};