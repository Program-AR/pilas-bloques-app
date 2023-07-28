import { Button, Stack } from "@mui/material";
import { SizeEditor, StyleGridProps } from "./SizeEditor";
import { Add, ContentCopy, Delete } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { CreatorContext } from "../../CreatorContext";
import { LocalStorage } from "../../../../../localStorage";
import { SceneMap, defaultScene } from "../../../../serializedChallenge";

export const GridOptions = (props: StyleGridProps) => {

    const { t } = useTranslation("creator")

    const { setIndex, setMaps, currentMap, index } = useContext(CreatorContext)

    
    const handleDelete = () => {
        const challenge = LocalStorage.getCreatorChallenge()!
        if (challenge.scene.maps.length === 1) return

        challenge.scene.maps.splice(index, 1)
        setMaps(challenge.scene.maps)
        setIndex(index - 1)
    }

    const handleDuplicate = () => {
        addMap(currentMap)
    }

    const handleAdd = () => {
    const challenge = LocalStorage.getCreatorChallenge()!
        addMap(defaultScene(challenge.scene.type).maps[0])
    }

    const addMap = (scene: SceneMap) => {
    const challenge = LocalStorage.getCreatorChallenge()!
        challenge.scene.maps.push(scene)
        setMaps(challenge.scene.maps)
        setIndex(challenge.scene.maps.length - 1)
    }

    return (
        <Stack direction="column" style={{ height: '100%', margin: '5px' }} alignItems="center" justifyContent="space-between">
            <SizeEditor setStyleGrid={props.setStyleGrid} />
            <Button startIcon={<Delete />} onClick={handleDelete}>{t("scenarios.delete")}</Button>
            <Button startIcon={<ContentCopy />} onClick={handleDuplicate}>{t("scenarios.duplicate")}</Button>
            <Button startIcon={<Add />} onClick={handleAdd}>{t("scenarios.add")}</Button>
        </Stack>
    )
}