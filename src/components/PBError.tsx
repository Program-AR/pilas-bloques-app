import { useRouteError } from "react-router-dom";
import { PageNotFound } from "./pageNotFound/PageNotFound";
import { useTranslation } from "react-i18next";

export const PBError = () => {
    const {t} = useTranslation("pageNotFound")

    const error = useRouteError() as any

    return <PageNotFound title={t("errorOcurred")!} error={error.message}/>
}