import { Button, Dialog, DialogContent, Stack } from "@mui/material"
import { Header } from "../header/Header"
import { useState } from "react";
import { Link } from "react-router-dom";

export const CreatorSelection = () =>{
    const thereIsChallengeInCreation: boolean = !!localStorage.getItem("PB_CREATOR_CHALLENGE")
    const [openModal, setOpenModal] = useState(thereIsChallengeInCreation);
        

    const onDiscard = () => {
        setOpenModal(false)
        localStorage.removeItem("PB_CREATOR_CHALLENGE")
    }

    return <><Header/>
        <Dialog 
            scroll='paper'
            maxWidth={false}
            open={openModal} 
            onClose={() => setOpenModal(false)}>
        <DialogContent>
            <Stack direction="column">
                Ya tenes un desafio chabon que queres hacer bro
                <div><Link to="/creador/editar"><Button>Seguir editando</Button></Link> <Button onClick={onDiscard}>Descartar</Button></div>
            </Stack>
        </DialogContent>


        </Dialog>
</>
}