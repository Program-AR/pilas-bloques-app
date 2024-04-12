import { ChangePassword, PasswordRecovery } from "../components/users/passwordRecovery/PasswordRecovery"
import { PasswordStrength, testingPasswordStrength } from "../components/users/register/StrengthPassword"
import { renderComponent } from "./testUtils"
import { screen } from '@testing-library/react'

describe("Password recovery", () => {

  test('Visiting /recuperar-contrasenia should require username', async () => {
    renderComponent(<PasswordRecovery />)
    const userIdentifierInput = await screen.findByTestId('userIdentifierInput')
    expect(userIdentifierInput).toBeInTheDocument()
  })

  test('Visiting /recuperar-contrasenia with mail token should require new password', async () => {
    renderComponent(<PasswordRecovery />, '/recuperar-contrasenia', '?token=TOKEN')
    const passwordInput = await screen.findByTestId('passwordInput')
    expect(passwordInput).toBeInTheDocument()
  })

  test('Visiting /establecer-contrasenia with invalid token should show expired token message', async () => {
    renderComponent(<ChangePassword isTokenValid={false} />)
    const expiredTokenMessage = await screen.findByTestId('expiredTokenMessage')
    const passwordRecoveryButton = await screen.findByTestId('passwordRecoveryButton')

    expect(passwordRecoveryButton.getAttributeNode('disabled')).toBeTruthy()
    expect(expiredTokenMessage).toBeInTheDocument()
  })

  test('Visiting /establecer-contrasenia with valid token should enable "recuperar-contraseña" button', async () => {
    renderComponent(<ChangePassword isTokenValid={true} />)
    const passwordRecoveryButton = await screen.findByTestId('passwordRecoveryButton')
    expect(passwordRecoveryButton.getAttributeNode('disabled')).toBeFalsy()
  })

  //PASSWORD STRENGTH

  test('A strong password has at least: one uppercase letter, one lowercase, a number, a special char and at least 8 chars', () => {
    expect(testingPasswordStrength("Password12!")).toBe(PasswordStrength.STRONG)
  })

  test('Medium password - no uppercase', () => {
    expect(testingPasswordStrength("password12!")).toBe(PasswordStrength.MEDIUM)
  })

  test('Medium password - no numbers', () => {
    expect(testingPasswordStrength("Password!")).toBe(PasswordStrength.MEDIUM)
  })

  test('Medium password - no lowecase', () => {
    expect(testingPasswordStrength("PASSWORD12!")).toBe(PasswordStrength.MEDIUM)
  })

  test('Medium password - no special char', () => {
    expect(testingPasswordStrength("Password12")).toBe(PasswordStrength.MEDIUM)
  })

  test('Medium password - length < 8', () => {
    expect(testingPasswordStrength("Passw12")).toBe(PasswordStrength.MEDIUM)
  })

  test('Weak password', () => {
    expect(testingPasswordStrength("Passw")).toBe(PasswordStrength.WEAK)
  })
})
