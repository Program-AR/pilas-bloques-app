import { Link } from "react-router-dom";
import { CreatorActionButton } from "./CreatorActionButton";
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from "react-i18next";

export const ReturnToEditionButtion = () => {

    return <Link to="/creador/editar">
        <CreatorActionButton startIcon={<EditIcon />} nameTag='keepEditing' />
    </Link>

}