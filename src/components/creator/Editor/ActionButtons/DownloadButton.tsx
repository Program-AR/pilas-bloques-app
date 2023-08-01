import { useTranslation } from "react-i18next";
import { SerializedChallenge } from "../../../serializedChallenge";
import { LocalStorage } from "../../../../localStorage";
import { CreatorActionButton } from "./CreatorActionButton";
import DownloadIcon from '@mui/icons-material/Download';

export const DownloadButton = () => {
    
    const { t } = useTranslation('creator');
    
    return <CreatorActionButton onClick={downloadChallenge} startIcon={<DownloadIcon/>} backgroundcolor="#65449d">{t("editor.buttons.download")}</CreatorActionButton>

}

const downloadChallenge = () => {
    const challenge: SerializedChallenge = LocalStorage.getCreatorChallenge()!
  
    const blob = new Blob([JSON.stringify(challenge)], { type: 'application/json' });
  
    const temporaryAnchorElement = document.createElement('a')
    
    const urlObject = URL.createObjectURL(blob)
  
    temporaryAnchorElement.href = urlObject
  
    const challengeName: string = challenge.title ? challenge.title : "pilas-bloques"
  
    temporaryAnchorElement.download = `${challengeName}.json`
  
    temporaryAnchorElement.click();
  
    // Clean up the resource
    URL.revokeObjectURL(urlObject);
  
}