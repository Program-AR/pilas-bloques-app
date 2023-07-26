import { Button, ButtonProps, styled } from "@mui/material";

export const CreatorActionButton = styled(Button)<ButtonProps>(() => ({
    textTransform: "none",
    border: '1px solid',
    marginRight: '10px',
    backgroundColor: 'lightblue'
  }));