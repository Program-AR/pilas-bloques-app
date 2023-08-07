import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { CreatorActionButton } from "./CreatorActionButton"
import { Visibility } from "@mui/icons-material";

export const TryButton = () => {
    const {t} = useTranslation('creator')

    return <Link to="/creador/probar">
            <CreatorActionButton startIcon={<Visibility/>} backgroundcolor="#449d99">{t("editor.buttons.try")}</CreatorActionButton>
        </Link>

}