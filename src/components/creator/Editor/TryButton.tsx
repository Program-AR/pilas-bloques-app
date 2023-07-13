import { Button } from "@mui/material"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

export const TryButton = () => {
    const {t} = useTranslation('creator')

    return <Link to="/creador/probar"><Button>{t("editor.buttons.try")}</Button></Link>

}