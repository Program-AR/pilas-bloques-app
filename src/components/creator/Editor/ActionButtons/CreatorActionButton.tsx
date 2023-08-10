import { Button, ButtonProps, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";

type CreatorActionButtonProps = {
  nametag: string,
  isshortversion?: boolean
} & ButtonProps

export const CreatorActionButton = ({ isshortversion = false, ...props} : CreatorActionButtonProps) => {
  const { t } = useTranslation('creator')

  const isSmallScreen: boolean = useMediaQuery('(max-width:814px)');

  return < Button {...props} variant="outlined" sx={{
    textTransform: "none",
    marginRight: '10px'}}>
    {t(`editor.buttons.${props.nametag}${!isshortversion && isSmallScreen ? 'Short' : ''}`)}
  </Button >
}