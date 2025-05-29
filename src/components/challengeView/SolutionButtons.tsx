import { IconButton, IconButtonProps, Stack, Tooltip } from "@mui/material"
import DownloadIcon from '@mui/icons-material/Download';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ClearIcon from '@mui/icons-material/Clear';
import { useThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";

export const SolutionButtons = () => {
    const { t } = useTranslation('challenge')

    return <Stack sx={{ position: "absolute", zIndex: 10, right: 15, top: 15 }} direction="row" spacing={1}>
        <SolutionButton icon={<FileUploadIcon />} tooltip={t("solutionButtons.upload")} />
        <SolutionButton icon={<DownloadIcon />} tooltip={t("solutionButtons.download")} />
        <SolutionButton icon={<ClearIcon />} tooltip={t("solutionButtons.clear")} />
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
