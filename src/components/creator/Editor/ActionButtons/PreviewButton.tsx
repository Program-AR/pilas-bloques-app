import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { CreatorActionButton } from "./CreatorActionButton"
import { Visibility } from "@mui/icons-material";

export const PreviewButton = () => {

    return <Link to="/creador/ver">
            <CreatorActionButton startIcon={<Visibility/>} nametag='preview'/>
        </Link>

}