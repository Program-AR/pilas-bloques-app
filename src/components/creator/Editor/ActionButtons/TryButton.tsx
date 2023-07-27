import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { CreatorActionButton } from "./CreatorActionButton"

export const TryButton = () => {
    const {t} = useTranslation('creator')

    return <Link to="/creador/probar"><CreatorActionButton>{t("editor.buttons.try")}</CreatorActionButton></Link>

}