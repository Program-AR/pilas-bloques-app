import { useTranslation } from "react-i18next";
import { PBError } from "./PBError";

export const PageNotFound = () =>{
    const {t} = useTranslation("pbError")

    return <PBError title={t("pageNotFound.title")!} error={t("pageNotFound.text")!}/>
}