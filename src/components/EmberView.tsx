type EmberViewProps = {
    path: string
}

export const EmberView = (props: EmberViewProps) => {

    return <iframe title='challenge' src={`/emberPB/#/${props.path}`} width='100%' height='100%'/>
}