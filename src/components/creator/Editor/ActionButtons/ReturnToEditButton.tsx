import { t } from "i18next";
import { Link } from "react-router-dom";
import { CreatorActionButton } from "./CreatorActionButton";
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from "react-i18next";

export const ReturnToEditionButtion = () =>{
    const {t} = useTranslation('creator')

    return <Link to="/creador/editar">
        <CreatorActionButton startIcon={<EditIcon/>} backgroundColor="#449d99">
            {t("editor.buttons.keepEditing")}
        </CreatorActionButton>
    </Link>

}