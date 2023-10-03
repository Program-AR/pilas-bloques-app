import { Box } from "@mui/material"
import { useState } from 'react'
import styles from './ember-view.module.css';
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef } from "react";
import { PBProgress } from "../PBProgress";

type EmberViewProps = {
    path: string,
    height?: string
}

export const EmberView = (props: EmberViewProps) => {

    const navigate = useNavigate()
    
    const [loaded, setLoaded] = useState(false)

    const iframeRef = useRef<HTMLIFrameElement | null>(null)

    const handleMessage = useCallback((event: MessageEvent)=>{
        if (event.source === iframeRef.current?.contentWindow && event.data && event.data.route) {
            navigate(event.data.route.slice(1))
        }
    },[navigate])
    
    useEffect(() => {
        window.addEventListener('message', handleMessage)
        return () => {
            window.removeEventListener('message', handleMessage)
        }
    }, [handleMessage])

    return <Box height={props.height ? props.height : '100%'} className={styles['ember-box']}>         
            <iframe ref={iframeRef} className={styles['ember-iframe']} loading="lazy" id="ember-iframe" onLoad={() => setLoaded(true)} title='ember-view' src={`emberPB/index.html#/${props.path}`}/>
            {!loaded ? <PBProgress/> : <></> }
        </Box> 
}
