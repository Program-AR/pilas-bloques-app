import { ButtonProps, IconButton, Stack, Tooltip, useMediaQuery } from "@mui/material";
import { SizeEditor, StyleGridProps } from "./SizeEditor";
import { Add, ContentCopy, Delete } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { CreatorContext } from "../../CreatorContext";
import { LocalStorage } from "../../../../../localStorage";
import { SceneMap, defaultScene } from "../../../../serializedChallenge";
import { PBCard } from "../../../../PBCard";
import { CreatorActionButton } from "../../ActionButtons/CreatorActionButton";

export const GridOptions = (props: StyleGridProps) => {

    const { t } = useTranslation("creator")

    const { setIndex, setMaps, currentMap, index, maps } = useContext(CreatorContext)

    const handleDelete = () => {
        if (maps.length === 1) return
        maps.splice(index, 1)
        setMaps([...maps])
        if(index !== 0) setIndex(index - 1) //in case the index is 0, index should not change
    }

    const handleDuplicate = () => {
        addMap(currentMap)
    }

    const handleAdd = () => {
        const type = LocalStorage.getCreatorChallenge()!.scene.type
        addMap(defaultScene(type).maps[0])
    }

    const addMap = (map: SceneMap) => {
        maps.push(map)
        setMaps(maps)
        setIndex(maps.length - 1)
    }

    return (
        <PBCard>
            <Stack direction="column" style={{ height: '100%', margin: '5px' }} alignItems="center" justifyContent="space-evenly">
                <SizeEditor setStyleGrid={props.setStyleGrid} />
                <GridOptionButton startIcon={<Delete />} onClick={handleDelete} tooltip={t("scenarios.delete")} testid="delete"/>
                <GridOptionButton startIcon={<ContentCopy />} onClick={handleDuplicate} tooltip={t("scenarios.duplicate")} testid="duplicate"/>
                <GridOptionButton startIcon={<Add />} onClick={handleAdd} tooltip={t("scenarios.add")} testid="add"/>
            </Stack>
        </PBCard>
    )
}

type GridOptionButtonProps = {
    tooltip: string,
    testid: string
}

const GridOptionButton = (props: GridOptionButtonProps & ButtonProps) => {
    const isSmallScreen: boolean = useMediaQuery('(max-width:700px)');

    return <>
        {isSmallScreen ?
            <Tooltip title={props.tooltip}>
                <IconButton onClick={props.onClick}>
                    {props.startIcon}
                </IconButton>
            </Tooltip >
            :
            <CreatorActionButton data-testid={`${props.testid}-map-button`} startIcon={props.startIcon} onClick={props.onClick}>{isSmallScreen ? "" : props.tooltip}</CreatorActionButton>
        }
    </>


}