import { Box } from "@mui/material"
import styles from './ember-view.module.css';

type EmberViewProps = {
    path: string
}

export const EmberView = (props: EmberViewProps) => {

    return <Box className={styles['ember-box']}>
              <iframe className={styles['ember-iframe']} id="ember-iframe" title='ember-view' src={`emberPB/index.html#/${props.path}`}/>
            </Box> 
}