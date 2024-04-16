import { About } from "../components/about/About"
import { BookView } from "../components/book/BookView"
import { ChallengeById, ChallengeByName } from "../components/ChallengeView"
import { CreatorEditor } from "../components/creator/Editor/Editor"
import { ActorSelection } from "../components/creator/ActorSelection/ActorSelection"
import { Home } from "../components/home/Home"
import { ImportedChallengeView } from "../components/ImportedChallengeView"
import { ChangePassword, PasswordRecovery } from "../components/users/passwordRecovery/PasswordRecovery"
import { Register } from "../components/users/register/Register"
import { expectToThrow, renderComponent } from "./testUtils"
import { validChallenge } from "./serializedChallenge.test"
test('Renders home without errors', async () => {
  expect(() => renderComponent(<Home />)).not.toThrow()
})
test('Renders a challenge without errors', async () => {
  expect(() => renderComponent(<ChallengeById/>, '/desafio/:id', '1001')).not.toThrow()
})

test('Renders the book challenge list without errors', async () => {
  expect(() => renderComponent(<BookView/>, '/libros/:id', '1')).not.toThrow()
})

test('Renders challenge by name without errors', async () => {
  expect(() => renderComponent(<ChallengeByName />, '/desafios/:challengeName', 'NoMeCansoDeSaltar')).not.toThrow()
})

test('Throws error on render challenge by unknown name', async () => {
  expectToThrow(
    () => renderComponent(<ChallengeByName />, '/desafios/:challengeName', 'JuanSalvoContraLosManos'),
    "Challenge with name \"JuanSalvoContraLosManos\" does not exist"
  )
})

test('Renders legacy challenges without errors', async () => {
  expect(() => renderComponent(<ChallengeById/>, '/desafio/:id', '3')).not.toThrow()
})

test('Throws error on non existing challenge Id', async () => {
  expectToThrow(
    () => renderComponent(<ChallengeById/>, '/desafio/:id', '99'),
    "Challenge with id \"99\" does not exist"
  )
})

test('Renders imported challenge without errors', async () => {
  expect(() => renderComponent(<ImportedChallengeView/>, '', '', [{state: validChallenge}])).not.toThrow()
})

test('Renders about without errors', async () => {
  expect(() => renderComponent(<About/>)).not.toThrow()
})

test('Renders password-recovery without errors', async () => {
  expect(() => renderComponent(<PasswordRecovery/>)).not.toThrow()
})

test('Renders password-recovery without errors', async () => {
  expect(() => renderComponent(<ChangePassword/>)).not.toThrow()
})

test('Renders register without errors', async () => {
  expect(() => renderComponent(<Register/>)).not.toThrow()
})

test('Renders /creador/seleccionar route without errors', async () => {
  expect(() => renderComponent(<ActorSelection/>)).not.toThrow()
})

test('Renders /creador/editar route without errors', async () => {
  expect(() => renderComponent(<CreatorEditor/>)).not.toThrow()
})
