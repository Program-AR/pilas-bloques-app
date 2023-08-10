import { Button, ButtonProps, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";

type CreatorActionButtonProps = {
  nameTag: string,
  isShortVersion?: boolean
} & ButtonProps

export const CreatorActionButton = (props: CreatorActionButtonProps) => {
  const { t } = useTranslation('creator')

  const isSmallScreen: boolean = useMediaQuery('(max-width:800px)');

  return < Button {...props} variant="outlined" sx={{
    textTransform: "none",
    marginRight: '10px'}}>
    {t(`editor.buttons.${props.nameTag}${!props.isShortVersion && isSmallScreen ? 'Short' : ''}`)}
  </Button >
}