import { Box } from "@mui/material"
import { useState } from 'react'
import styles from './ember-view.module.css';
import { PBProgress } from "../PBProgress";

type EmberViewProps = {
    path: string,
    height?: string
}

export const EmberView = (props: EmberViewProps) => {
    const [loaded, setLoaded] = useState(false)
    
    
    return <Box height={props.height ? props.height : '100%'} className={styles['ember-box']}>         
            <iframe className={styles['ember-iframe']} loading="lazy" id="ember-iframe" onLoad={() => setLoaded(true)} title='ember-view' src={`emberPB/index.html#/${props.path}`}/>
            {!loaded ? <PBProgress/> : <></> }
        </Box> 
       
}
