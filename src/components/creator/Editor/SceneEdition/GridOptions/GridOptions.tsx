import { Button, Stack } from "@mui/material";
import { SizeEditor, StyleGridProps } from "./SizeEditor";
import { Add, ContentCopy, Delete } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export const GridOptions = (props: StyleGridProps) => {

    const { t } = useTranslation("creator")

    const handleDelete = () => { }
    const handleDuplicate = () => { }
    const handleAdd = () => { }

    return (
        <Stack direction="column" style={{ borderStyle: 'solid', height: '100%', margin: '5px' }} alignItems="center" justifyContent="space-between">
            <SizeEditor setStyleGrid={props.setStyleGrid} />
            <Button startIcon={<Delete />} onClick={handleDelete}>{t("scenarios.delete")}</Button>
            <Button startIcon={<ContentCopy />} onClick={handleDuplicate}>{t("scenarios.duplicate")}</Button>
            <Button startIcon={<Add />} onClick={handleAdd}>{t("scenarios.add")}</Button>
        </Stack>
    )
}