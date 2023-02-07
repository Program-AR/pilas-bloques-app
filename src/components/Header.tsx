import { AppBar } from "@mui/material";
import React from "react";
import { ReactNode } from "react";
import {ReactComponent as PBLogo} from "./pblogo-whiteborder.svg"

export class Header extends React.Component {

    render(): ReactNode {
        return <AppBar position="fixed" >
            <PBLogo height="50px" />
        </AppBar>
    }
}


