import { Button, ButtonProps, styled } from "@mui/material";
import {darken} from "@mui/material";

export const CreatorActionButton = styled(Button)<ButtonProps & {backgroundcolor: string}>((props) => ({
    textTransform: "none",
    border: '1px solid',
    marginRight: '10px',
    backgroundColor: props.backgroundcolor,
    borderRadius: '2px',
    color: "white",
    '&:hover': {
      backgroundColor: darken(props.backgroundcolor, 0.2),
  },
  }));