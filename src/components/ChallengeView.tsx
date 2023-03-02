import React from "react";
import { ReactNode } from "react";

export class ChallengeView extends React.Component {
    render(): ReactNode {
        return <iframe id="ember-iframe" title='challenge' src='emberPB/index.html' width='100%' height='99%'/>
    }
}