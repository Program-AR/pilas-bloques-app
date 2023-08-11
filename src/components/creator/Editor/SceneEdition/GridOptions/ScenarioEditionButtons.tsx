import { Add, ContentCopy, Delete } from "@mui/icons-material";
import { Button, ButtonProps, Stack, Typography, useMediaQuery } from "@mui/material";
import theme from "../../../../../theme";
import { GenericModalDialog } from "../../../../modalDialog/GenericModalDialog";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { LocalStorage } from "../../../../../localStorage";
import { SceneMap, defaultScene } from "../../../../serializedChallenge";
import { CreatorContext } from "../../CreatorContext";
import { DialogSnackbar } from "../../../../dialogSnackbar/DialogSnackbar";
import { IconButtonTooltip } from "../IconButtonTooltip";

export const ScenarioEditionButtons = () => {
    const { t } = useTranslation("creator")

    const { setIndex, setMaps, currentMap, index, maps } = useContext(CreatorContext)

    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [deleteError, setDeleteError] = useState(false)

    const handleDelete = () => {
        if (maps.length === 1) {
            setDeleteError(true) //if there is only one map, it can't be deleted
        } else {
            setShowDeleteDialog(true)
        }
    }

    const deleteMap = () => {
        setShowDeleteDialog(false)
        maps.splice(index, 1)
        setMaps([...maps])
        if (index !== 0) setIndex(index - 1) //in case the index is 0, index should not change
    }

    const handleDuplicate = () => {
        const map: SceneMap = []
        currentMap.forEach(() => {
            map.push()
            map[map.length] = currentMap[map.length].slice()
        })
        addMap(map)
    }

    const handleAdd = () => {
        const type = LocalStorage.getCreatorChallenge()!.scene.type
        addMap(defaultScene(type).maps[0])
    }

    const addMap = (map: SceneMap) => {
        setMaps(maps.concat([[...map]]))
        setIndex(maps.length)
    }

    return <>
        <Stack sx={{ alignItems: 'center', gap: theme.spacing(1) }}>
            <GridOptionButton startIcon={<Add />} onClick={handleAdd} tooltip={t("scenarios.add")} testid="add" />
            <GridOptionButton startIcon={<ContentCopy />} onClick={handleDuplicate} tooltip={t("scenarios.duplicate")} testid="duplicate" />

            <GridOptionButton startIcon={<Delete />} onClick={handleDelete} tooltip={t("scenarios.delete")} testid="delete" />
            <GenericModalDialog isOpen={showDeleteDialog} onConfirm={deleteMap} onCancel={() => setShowDeleteDialog(false)} title={t("scenarios.delete")}>
                <Typography>{t("scenarios.areYouSure")}</Typography>
            </GenericModalDialog>
        </Stack>
        <DialogSnackbar
            open={deleteError}
            onClose={() => setDeleteError(false)}
            message={t("scenarios.deleteError")} />
    </>
}


type GridOptionButtonProps = {
    tooltip: string,
    testid: string
}

const GridOptionButton = (props: GridOptionButtonProps & ButtonProps) => {
    const isSmallScreen: boolean = useMediaQuery(theme.breakpoints.down('sm'));

    return <>
        {isSmallScreen ?
            <IconButtonTooltip onClick={props.onClick} icon={props.startIcon} tooltip={props.tooltip} />
            :
            <Button
                {...props}
                data-testid={`${props.testid}-map-button`}
                variant="outlined"
                style={{ width: '100%', textTransform: "none" }}>
                {isSmallScreen ? "" : props.tooltip}
            </Button>
        }
    </>
}