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
  expect(() => renderComponent(<Home />)).not.toThrowError()
})
test('Renders a challenge without errors', async () => {
  expect(() => renderComponent(<ChallengeById/>, '/desafio/:id', '1')).not.toThrowError()
})

test('Renders the book challenge list without errors', async () => {
  expect(() => renderComponent(<BookView/>, '/libros/:id', '1')).not.toThrowError()
})

test('Renders challenge by name without errors', async () => {
  expect(() => renderComponent(<ChallengeByName />, '/desafios/:challengeName', 'NoMeCansoDeSaltar')).not.toThrowError()
})

test('Renders imported challenge without errors', async () => {
  expect(() => renderComponent(<ImportedChallengeView/>, '', '', [{state: validChallenge}])).not.toThrowError()
})

test('Renders about without errors', async () => {
  expect(() => renderComponent(<About/>)).not.toThrowError()
})

test('Renders password-recovery without errors', async () => {
  expect(() => renderComponent(<PasswordRecovery/>)).not.toThrowError()
})

test('Renders register without errors', async () => {
  expect(() => renderComponent(<Register/>)).not.toThrowError()
})

test('Renders /creador/seleccionar route without errors', async () => {
  expect(() => renderComponent(<CreatorSelection/>)).not.toThrowError()
})

test('Renders /creador/editar route without errors', async () => {
  expect(() => renderComponent(<CreatorEditor/>)).not.toThrowError()
})
