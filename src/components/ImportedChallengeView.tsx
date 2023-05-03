import { useLocation } from "react-router-dom"
import { EmberView } from "./EmberView"
import { Header } from "./header/Header"
import { SerializedChallenge } from "./serializedChallenge"

export const ImportedChallengeView = () => {
  const location = useLocation()
  const importedChallenge: SerializedChallenge | undefined = location.state

  if (!importedChallenge) throw new Error("No hay desafio importado :(")

  return (
    <>
      <Header CenterComponent={<p>{importedChallenge.title}</p>} />
      <EmberView path={`desafio/react-imported-challenge`} />
    </>
  )
}
