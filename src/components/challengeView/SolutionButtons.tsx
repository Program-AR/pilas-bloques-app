import { Button, Dialog, DialogContent, DialogTitle, IconButton, IconButtonProps, Stack, Tooltip, Typography } from "@mui/material"
import DownloadIcon from '@mui/icons-material/Download';
import ClearIcon from '@mui/icons-material/Clear';
import { useThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import Blockly from "blockly/core"
import { LocalStorage } from "../../localStorage";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { xmlBloqueEmpezarAEjecutar } from "../blockly/blockly";
import { ChangeEvent, useRef, useState } from "react";

type SolucionButtonsProps = {
    direction: 'row' | 'row-reverse' | 'column' | 'column-reverse';
}


export const SolutionButtons = (props : SolucionButtonsProps) => {

    return (
        <Stack direction={props.direction} spacing={2}>
            <UploadSolution />
            <SaveSolutionButton />
            <ClearSolutionButton />
        </Stack>
        // <Stack sx={{ position:"absolute", zIndex: 10, right: 15, top: 15 }} direction={props.direction} spacing={2}>
        //     <UploadSolution />
        //     <SaveSolutionButton />
        //     <ClearSolutionButton />
        // </Stack>
    );
    

    // return (
    //     <Stack sx={{ position:"absolute", zIndex: 10, right: 15, top: 15 }} gap={1} alignItems='center'>
    //         <UploadSolution />
    //         <SaveSolutionButton />
    //         <ClearSolutionButton />
    //     </Stack>
    // );
}

type SolucionButtonProps = {
    icon: React.ReactNode,
    tooltip: string
}

const SolutionButton = (props: SolucionButtonProps & IconButtonProps) => {
    const { theme } = useThemeContext()

    return <Tooltip title={props.tooltip}>
        <IconButton
            {...props}
            sx={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                borderRadius: '50%',
            }}
        >
            {props.icon}
        </IconButton>
    </Tooltip>

}

const SPBQ_FILE_VERSION = 2

const SaveSolutionButton = () => {
    const { t } = useTranslation('challenge')

    const sanatizedTitle = () => LocalStorage.getCreatorChallenge()?.title
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .trim()
        .split(/\s+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');

    const activityName = sanatizedTitle() || "SinTitulo"

    const fileName = `${activityName}.spbq`;

    const downloadFile = (text: string, name: string, type: string) => {
        const file = new Blob([text], { type: type });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(file);
        a.download = name;
        a.type = type;
        a.click();
    }

    const handleClick = () => {
        const xml = Blockly.utils.xml.domToText(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()))

        const content = {
            version: SPBQ_FILE_VERSION,
            actividad: activityName,
            solucion: btoa(xml)
        };

        downloadFile(JSON.stringify(content), fileName, 'application/octet-stream');
    }

    return <SolutionButton onClick={handleClick} icon={<DownloadIcon />} tooltip={t("solutionButtons.download")} />
}

const ClearSolutionButton = () => {
    const { t } = useTranslation('challenge')

    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)

    const deleteSolution = () => {
        Blockly.getMainWorkspace().clear()
        const xmlDom = Blockly.utils.xml.textToDom(xmlBloqueEmpezarAEjecutar)
        Blockly.Xml.domToWorkspace(xmlDom, Blockly.getMainWorkspace())
        setDeleteDialogOpen(false)
    }

    const handleClick = () => {
        setDeleteDialogOpen(true)
    }

    const handleClose = () => {
        setDeleteDialogOpen(false)
    }

    return <>
        <Dialog open={deleteDialogOpen} onClose={handleClose}>
            <DialogTitle display="flex" justifyContent="flex-end">
                <IconButton onClick={handleClose}>
                    <ClearIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent >
                <Stack justifyContent="center" alignContent="center">
                    <Typography>{t("solutionButtons.clearModal.warning")}</Typography>
                    <Button onClick={deleteSolution}
                        sx={{
                            fontWeight: 'bold',
                            margin: 1,
                            width: "auto",
                            alignSelf: "center",
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                            color: 'red'
                        }}>
                        {t("solutionButtons.clearModal.button")}
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog>

        <SolutionButton onClick={handleClick} icon={<ClearIcon />} tooltip={t("solutionButtons.clear")} />
    </>
}

const UploadSolution = () => {
    const { t } = useTranslation('challenge')

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleClick = () => {
        fileInputRef.current?.click()
    }

    const handleOpenFile = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (!file) return

        const text = await file.text()
        const solution = atob(JSON.parse(text).solucion)

        Blockly.getMainWorkspace().clear()
        const xmlDom = Blockly.utils.xml.textToDom(solution)
        Blockly.Xml.domToWorkspace(xmlDom, Blockly.getMainWorkspace())
    }


    return <>
        <SolutionButton icon={<DriveFolderUploadIcon />} tooltip={t("solutionButtons.upload")} onClick={handleClick} />
        <input
            type="file"
            accept=".spbq"
            ref={fileInputRef}
            onChange={handleOpenFile}
            style={{ display: "none" }}
        />
    </>
}
