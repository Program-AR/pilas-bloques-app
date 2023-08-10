import { Link } from "react-router-dom"
import { StyledCreatorActionButton } from "./CreatorActionButton"
import { Visibility } from "@mui/icons-material";

export const PreviewButton = () => {

    return <Link to="/creador/ver">
            <StyledCreatorActionButton startIcon={<Visibility/>} nametag='preview'/>
        </Link>

}