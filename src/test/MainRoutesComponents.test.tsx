import { About } from "../components/About"
import { BookView } from "../components/book/BookView"
import { ChallengeById, ChallengeByName } from "../components/ChallengeView"
import { CreatorEditor } from "../components/creator/Editor"
import { CreatorSelection } from "../components/creator/Selection"
import { Home } from "../components/home/Home"
import { ImportedChallengeView } from "../components/ImportedChallengeView"
import { PasswordRecovery } from "../components/PasswordRecovery"
import { Register } from "../components/Register"
import { renderComponent } from "./testUtils"
import { validChallenge } from "./serializedChallenge.test"
test('Renders home without errors', async () => {
  renderComponent(<Home />)
})
test('Renders a challenge without errors', async () => {
  renderComponent(<ChallengeById/>, ':id', '1')
})

test('Renders the book challenge list without errors', async () => {
  renderComponent(<BookView/>, ':id', '1')
})

test('Renders challenge by name without errors', async () => {
  renderComponent(<ChallengeByName />, ':challengeName', 'NoMeCansoDeSaltar')
})

test('Renders imported challenge without errors', async () => {
  renderComponent(<ImportedChallengeView/>, '', '', [{state: validChallenge}])
})

test('Renders about without errors', async () => {
  renderComponent(<About/>)
})

test('Renders password-recovery without errors', async () => {
  renderComponent(<PasswordRecovery/>)
})

test('Renders register without errors', async () => {
  renderComponent(<Register/>)
})

test('Renders /creador/seleccionar route without errors', async () => {
  renderComponent(<CreatorSelection/>)
})

test('Renders /creador/editar route without errors', async () => {
  renderComponent(<CreatorEditor/>)
})
