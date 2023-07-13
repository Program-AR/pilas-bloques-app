import { Button } from "@mui/material";
import { LocalStorage } from "../../../localStorage";
import { SerializedChallenge } from "../../serializedChallenge";
import { useTranslation } from "react-i18next";

export const DownloadButton = () => {
    
    const { t } = useTranslation('creator');
    
    return <Button onClick={downloadChallenge}>{t("editor.buttons.download")}</Button>

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