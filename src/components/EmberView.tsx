import { Box } from "@mui/material"

type EmberViewProps = {
    path: string
}

export const EmberView = (props: EmberViewProps) => {

    return <Box style={{marginTop:"0px", display: "flex", height: "100%"}}>
              <iframe id="ember-iframe" title='ember-view' src={`emberPB/index.html#/${props.path}`} width='100%' height='100%'/>
            </Box> 
}