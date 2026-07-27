import { Button, Dialog, DialogContent, DialogTitle, IconButton, IconButtonProps, Stack, Tooltip, Typography } from "@mui/material"
import DownloadIcon from '@mui/icons-material/Download';
import ClearIcon from '@mui/icons-material/Clear';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import CommentIcon from '@mui/icons-material/Comment';
import { PBSwitch, pbIconStyle } from "../PBSwitch";
import { useThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import Blockly from "blockly/core"
import { LocalStorage } from "../../localStorage";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { setXml, workspaceToXmlText, xmlBloqueEmpezarAEjecutar } from "../blockly/blockly";
import { ChangeEvent, useRef, useState, useEffect } from "react";
import { refreshBlocklyValidations } from "../blockly/blocklyValidations";


type SolucionButtonsProps = {
  direction: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  challengeTitle?: string;
}


export const SolutionButtons = (props: SolucionButtonsProps) => {
  return ( 
      <Stack direction={props.direction} spacing={2} alignItems="center">
        <ToggleSuggestionsButton />
        <UploadSolution challengeTitle={props.challengeTitle} />
        <SaveSolutionButton challengeTitle={props.challengeTitle} />
        <ClearSolutionButton />
      
    </Stack>
  );
};


const ToggleSuggestionsButton = () => {
  const { theme } = useThemeContext()
  const { t } = useTranslation('challenge')
  const [enabled, setEnabled] = useState(() => LocalStorage.getMulangSuggestionsEnabled())

  const handleToggle = () => {
    const newState = !enabled
    setEnabled(newState)
    LocalStorage.saveMulangSuggestionsEnabled(newState)
    refreshBlocklyValidations()
  }

  return (
    <Tooltip title={enabled ? t("solutionButtons.disableSuggestions") : t("solutionButtons.enableSuggestions")}>
      <PBSwitch
        checked={enabled}
        sx={{
          "& .MuiSwitch-switchBase": {
            "&.Mui-checked": {
              "+ .MuiSwitch-track": {
                backgroundColor: theme.palette.secondary.main,
                opacity: 1,
              }
            },
          },
        }}
        icon={<CommentsDisabledIcon sx={pbIconStyle(theme)} />}
        checkedIcon={<CommentIcon sx={pbIconStyle(theme)} />}
        onChange={handleToggle}
      />
    </Tooltip>
  )
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

export const sanitizeActivityName = (challengeTitle?: string) => {
  const rawTitle = challengeTitle ?? LocalStorage.getCreatorChallenge()?.title ?? '';

  return rawTitle
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .trim()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('') || "SinTitulo";
};

type SolutionButtonWithTitleProps = {
  challengeTitle?: string;
}

const SaveSolutionButton = ({ challengeTitle }: SolutionButtonWithTitleProps) => {

  const { t } = useTranslation('challenge');
  const activityName = sanitizeActivityName(challengeTitle);
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
    const xml = workspaceToXmlText();
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

    <SolutionButton onClick={handleClick} icon={<CleaningServicesIcon />} tooltip={t("solutionButtons.clear")} />
  </>
}

const UploadSolution = ({ challengeTitle }: SolutionButtonWithTitleProps) => {
  const { t } = useTranslation('challenge')

  const fileInputRef = useRef<HTMLInputElement>(null)


  const [uploadSolutionDialogOpen, setUploadSolutionDialogOpen] = useState<{
    isOpen: boolean;
    titleKey: string;
    message: string;
    type: 'error' | 'warning';
  }>({
    isOpen: false,
    titleKey: '',
    message: '',
    type: 'error'
  });

  const handleOpenErrorModal = (message: string, type: 'error' | 'warning') => {
    setUploadSolutionDialogOpen({
      isOpen: true,

      titleKey: type === 'error'
        ? "solutionButtons.extensionAndVersionError.title"
        : "solutionButtons.clearModal.warning",
      message: message,
      type: type
    });
  };


  const handleCloseModal = () => {
    setUploadSolutionDialogOpen(prev => ({ ...prev, isOpen: false }));
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };


  const handleOpenFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];


    if (!file || !file.name.endsWith(".spbq")) {
      handleOpenErrorModal(t("solutionButtons.extensionAndVersionError.message"), 'error');
      return;
    }

    try {
      const text = await file.text();
      const jsonContent = JSON.parse(text);

      const fileVersion = jsonContent.version;
      const fileActivityName = jsonContent.actividad;
      const currentActivityName = sanitizeActivityName(challengeTitle);
      const solutionXmlText = atob(jsonContent.solucion);


      let warningMessage = "";
      if (fileActivityName !== currentActivityName) {

        warningMessage = t("solutionButtons.extensionAndVersionError.wrongActivity", { activity: fileActivityName });
      } else if (fileVersion < SPBQ_FILE_VERSION) {

        warningMessage = t("solutionButtons.extensionAndVersionError.oldVersion");
      }


      if (warningMessage) {
        handleOpenErrorModal(warningMessage, 'warning');
      }

      try {
        Blockly.getMainWorkspace().clear();
        setXml(solutionXmlText);

      } catch (blocklyError) {
        console.error("Blockly no reconoce los bloques de este archivo:", blocklyError);
        handleOpenErrorModal("Este archivo contiene bloques que no son compatibles con el desafío actual.", 'error');
        // inicializamos el workspace con el bloque ppal para que el usuario pueda seguir trabajando
        Blockly.getMainWorkspace().clear();
        const xmlInitDom = Blockly.utils.xml.textToDom(xmlBloqueEmpezarAEjecutar);
        Blockly.Xml.domToWorkspace(xmlInitDom, Blockly.getMainWorkspace());
      }

    } catch (parseError) {

      console.error("Error al procesar el archivo:", parseError);
      handleOpenErrorModal(t("solutionButtons.extensionAndVersionError.message"), 'error');
    } finally {
      if (event.target) event.target.value = "";
    }
  };


  return <>
    <SolutionButton icon={<DriveFolderUploadIcon />} tooltip={t("solutionButtons.upload")} onClick={handleClick} />

    <input
      type="file"
      accept=".spbq"
      ref={fileInputRef}
      onChange={handleOpenFile}
      style={{ display: "none" }}
    />


    <Dialog open={uploadSolutionDialogOpen.isOpen} onClose={handleCloseModal}>
      <DialogTitle display="flex" justifyContent="flex-end">
        <IconButton onClick={handleCloseModal}>
          <ClearIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack justifyContent="center" alignContent="center">
          <Typography>
            {uploadSolutionDialogOpen.message}
          </Typography>
          <Button onClick={handleCloseModal}
            sx={{
              fontWeight: 'bold',
              margin: 1,
              width: "auto",
              alignSelf: "center",
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
              backgroundColor: 'blue',
              color: 'white',
              '&:hover': {
                backgroundColor: '#00008B',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
              },

            }}>
            {t("solutionButtons.extensionAndVersionError.button")}
          </Button>

        </Stack>
      </DialogContent>

    </Dialog>
  </>;
}
