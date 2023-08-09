import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { CreatorActionButton } from "./CreatorActionButton"
import { Visibility } from "@mui/icons-material";

export const PreviewButton = () => {
    const {t} = useTranslation('creator')

    return <Link to="/creador/ver">
            <CreatorActionButton startIcon={<Visibility/>} backgroundcolor="#449d99">{t("editor.buttons.preview")}</CreatorActionButton>
        </Link>

}