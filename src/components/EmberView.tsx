type EmberViewProps = {
    path: string
}

export const EmberView = (props: EmberViewProps) => {

    return <iframe id="ember-iframe" title='ember-view' src={`emberPB/index.html`} width='100%' height='100%'/>
    //return <iframe id="ember-iframe" title='ember-view' src={`emberPB/#/${props.path}`} width='100%' height='100%'/>
}