import { Link } from "react-router-dom"
import { StyledCreatorActionButton } from "./CreatorActionButton"
import { Visibility } from "@mui/icons-material";

export const EmberPreviewButton = () => {

    return <Link to="/creador/verEmber">
            <StyledCreatorActionButton startIcon={<Visibility/>} nametag='oldPreview'/>
        </Link>

}