import { Button, ButtonProps, darken, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import theme from '../../../../theme';

type CreatorActionButtonProps = {
  nametag: string,
  isshortversion?: boolean
} & ButtonProps

export const CreatorActionButton = ({ isshortversion = false, ...props }: CreatorActionButtonProps) => {
  const { t } = useTranslation('creator')

  const isSmallScreen: boolean = useMediaQuery(theme.breakpoints.down('sm'));

  return < Button {...props} variant="outlined" sx={{
    textTransform: "none",
    marginRight: '10px',
    whiteSpace: 'nowrap',
    ...props.sx
  }}>
    {t(`editor.buttons.${props.nametag}${!isshortversion && isSmallScreen ? 'Short' : ''}`)}
  </Button >
}

export const StyledCreatorActionButton = (props: CreatorActionButtonProps) => {
  const backgroundColor = '#ffb600'

  return <CreatorActionButton
    sx={{
      height: 45,
      fontSize: 18,
      color: 'white',
      fontWeight: 'bold',
      border: 0,
      backgroundColor: backgroundColor,
      '&:hover': {
        backgroundColor: darken(backgroundColor, 0.2),
        border: 0,
      },
      ...props.sx
    }}
    {...props}>
    {props.children}
  </CreatorActionButton>
}
