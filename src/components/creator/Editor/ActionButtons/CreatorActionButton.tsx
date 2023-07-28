import { Button, ButtonProps, styled } from "@mui/material";
import {darken} from "@mui/material";

export const CreatorActionButton = styled(Button)<ButtonProps & {backgroundColor: string}>((props) => ({
    textTransform: "none",
    border: '1px solid',
    marginRight: '10px',
    backgroundColor: props.backgroundColor,
    borderRadius: '2px',
    color: "white",
    '&:hover': {
      backgroundColor: darken(props.backgroundColor, 0.2),
  },
  }));