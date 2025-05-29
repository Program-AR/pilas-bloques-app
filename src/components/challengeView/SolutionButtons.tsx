import { IconButton, IconButtonProps, Stack, Tooltip } from "@mui/material"
import DownloadIcon from '@mui/icons-material/Download';
import ClearIcon from '@mui/icons-material/Clear';
import { useThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import Blockly, { Block } from "blockly/core"
import { LocalStorage } from "../../localStorage";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { xmlBloqueEmpezarAEjecutar } from "../blockly/blockly";

export const SolutionButtons = () => {
    const { t } = useTranslation('challenge')

    return <Stack sx={{ position: "absolute", zIndex: 10, right: 15, top: 15 }} direction="row" spacing={2}>
        <SaveSolutionButton />
        <SolutionButton icon={<DriveFolderUploadIcon />} tooltip={t("solutionButtons.upload")} />
        <ClearSolutionButton />
    </Stack >
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

const SPBQ_FILE_VERSION = 1

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

    const handleClick = () => {
        Blockly.getMainWorkspace().clear()
        const xmlDom = Blockly.utils.xml.textToDom(xmlBloqueEmpezarAEjecutar)
        Blockly.Xml.domToWorkspace(xmlDom, Blockly.getMainWorkspace())
    }

    return <SolutionButton onClick={handleClick} icon={<ClearIcon />} tooltip={t("solutionButtons.clear")} />
}
