import { useRouteError } from "react-router-dom";

export const PBError = () => {
    const error = useRouteError() as any
    return <h1>Ocurrio un error (✖╭╮✖): {error.message}</h1>
}