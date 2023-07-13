import { Button } from "@mui/material";
import { LocalStorage } from "../../localStorage";
import { SerializedChallenge } from "../serializedChallenge";

export const ShareButton = () => <Button onClick={downloadChallenge}>Descargar</Button>

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