import { Button, ButtonProps, styled } from "@mui/material";

type CreatorActionButtonProps = {
  backgroundcolor: string
} & ButtonProps

export const CreatorActionButton = (props: CreatorActionButtonProps) =>
  <Button {...props} variant="outlined" sx={{
    textTransform: "none",
    marginRight: '10px' }}>
    {props.children}
  </Button>