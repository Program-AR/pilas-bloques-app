import { Box } from "@mui/material"
import styles from './ember-view.module.css';

type EmberViewProps = {
    path: string,
    height?: string
}

export const EmberView = (props: EmberViewProps) => {

    return <Box height={props.height ? props.height : '100%'} className={styles['ember-box']}>
              <iframe className={styles['ember-iframe']} id="ember-iframe" title='ember-view' src={`emberPB/index.html#/${props.path}`}/>
            </Box> 
}