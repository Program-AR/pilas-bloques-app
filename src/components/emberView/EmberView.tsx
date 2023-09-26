import { Box, CircularProgress } from "@mui/material"
import { useEffect, useState } from 'react'
import styles from './ember-view.module.css';

type EmberViewProps = {
    path: string,
    height?: string
}

export const EmberView = (props: EmberViewProps) => {
    const [loaded, setLoaded] = useState(false)
    
    
    return <Box height={props.height ? props.height : '100%'} display="flex" flexDirection="column" alignItems="center" className={styles['ember-box']}>
            
            {!loaded ? <CircularProgress style={{marginTop: "48px"}} size={150}/> : <></> }
            <iframe className={styles['ember-iframe']} loading="lazy" id="ember-iframe" onLoad={() => setLoaded(true)} title='ember-view' src={`emberPB/index.html#/${props.path}`}/> 
        </Box> 
        
}

/*
<Box justifyContent="center" display="flex" alignItems="center" height="100%">
            <Suspense fallback={<Box justifyContent="center" display="flex" alignItems="center" height="100%"><CircularProgress size={150}/></Box>}>
            </Suspense>

*/