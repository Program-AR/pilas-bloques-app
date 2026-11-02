import { renderComponent } from "../../testUtils"
import { screen, waitFor } from "@testing-library/react"
import { ForumAccessDialog } from "../../../components/forum/ForumAccessDialog"
import { isForumDevEnabled } from "../../../components/users/login/SessionButton"
import { LocalStorage } from "../../../localStorage"
import { PilasBloquesApi, ForumStatus } from "../../../pbApi"

describe("ForumAccessDialog", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    LocalStorage.saveUser(null)
  })

  test("Renders login prompt when user is not logged in", async () => {
    renderComponent(<ForumAccessDialog open={true} onClose={jest.fn()} />)

    const loginButton = await screen.findByText("Iniciar sesión")
    expect(loginButton).toBeInTheDocument()
  })

  test("Renders email input step when user has no email", async () => {
    LocalStorage.saveUser({
      id: "u1",
      token: "jwt_token",
      nickName: "Tom",
      username: "tom1",
      avatarURL: ""
    } as any)

    jest.spyOn(PilasBloquesApi, "getForumStatus").mockResolvedValueOnce({
      hasEmail: false,
      email: null,
      isVerified: false,
      hasMultipleAccounts: false,
      accountsWithSameEmail: [],
      isCurrentAccountPrimary: false,
      primaryAccountUsername: null,
      canAccessForum: false
    })

    renderComponent(<ForumAccessDialog open={true} onClose={jest.fn()} />)

    const emailInput = await screen.findByTestId("forumEmailInput")
    const sendButton = await screen.findByTestId("sendCodeButton")

    expect(emailInput).toBeInTheDocument()
    expect(sendButton).toBeInTheDocument()
  })

  test("Shows multiple accounts warning and code input directly when multiple accounts exist", async () => {
    LocalStorage.saveUser({
      id: "u1",
      token: "jwt_token",
      nickName: "Tom",
      username: "tom1",
      avatarURL: ""
    } as any)

    jest.spyOn(PilasBloquesApi, "getForumStatus").mockResolvedValue({
      hasEmail: true,
      email: "docente@program.ar",
      isVerified: false,
      hasMultipleAccounts: true,
      accountsWithSameEmail: [
        { id: "u1", username: "tom1", nickName: "Tom", isForumPrimary: false },
        { id: "u2", username: "lisa2", nickName: "Lisa", isForumPrimary: false }
      ],
      isCurrentAccountPrimary: false,
      primaryAccountUsername: null,
      canAccessForum: false
    })

    jest.spyOn(PilasBloquesApi, "sendForumCode").mockResolvedValueOnce({
      ok: true,
      email: "docente@program.ar"
    })

    renderComponent(<ForumAccessDialog open={true} onClose={jest.fn()} />)

    const codeInput = await screen.findByTestId("forumCodeInput")
    expect(codeInput).toBeInTheDocument()

    const warningText = await screen.findByText(/Detectamos varias cuentas de Pilas Bloques asociadas a este correo/)
    expect(warningText).toBeInTheDocument()
    expect(warningText.textContent).toContain("Tom")
    expect(warningText.textContent).toContain("cuenta principal de este correo para la Comunidad Pilas Bloques")
  })

  test("Renders secondary account warning if another user is primary", async () => {
    LocalStorage.saveUser({
      id: "u2",
      token: "jwt_token",
      nickName: "Lisa",
      username: "lisa2",
      avatarURL: ""
    } as any)

    jest.spyOn(PilasBloquesApi, "getForumStatus").mockResolvedValueOnce({
      hasEmail: true,
      email: "docente@program.ar",
      isVerified: false,
      hasMultipleAccounts: true,
      accountsWithSameEmail: [
        { id: "u1", username: "tom1", nickName: "Tom", isForumPrimary: true },
        { id: "u2", username: "lisa2", nickName: "Lisa", isForumPrimary: false }
      ],
      isCurrentAccountPrimary: false,
      primaryAccountUsername: "tom1",
      canAccessForum: false
    })

    renderComponent(<ForumAccessDialog open={true} onClose={jest.fn()} />)

    const warningNotice = await screen.findByText("Solo la cuenta principal puede acceder a la Comunidad")
    expect(warningNotice).toBeInTheDocument()
  })

  test("Renders OTP code input step when verification code is sent", async () => {
    LocalStorage.saveUser({
      id: "u1",
      token: "jwt_token",
      nickName: "Tom",
      username: "tom1",
      avatarURL: ""
    } as any)

    jest.spyOn(PilasBloquesApi, "getForumStatus").mockResolvedValue({
      hasEmail: true,
      email: "tom@program.ar",
      isVerified: false,
      hasMultipleAccounts: false,
      accountsWithSameEmail: [],
      isCurrentAccountPrimary: true,
      primaryAccountUsername: null,
      canAccessForum: false
    })

    jest.spyOn(PilasBloquesApi, "sendForumCode").mockResolvedValueOnce({
      ok: true,
      email: "tom@program.ar"
    })

    renderComponent(<ForumAccessDialog open={true} onClose={jest.fn()} />)

    const codeInput = await screen.findByTestId("forumCodeInput")
    const verifyButton = await screen.findByTestId("verifyCodeButton")

    expect(codeInput).toBeInTheDocument()
    expect(verifyButton).toBeInTheDocument()
  })

  test("Renders error state with retry button when getForumStatus fails", async () => {
    LocalStorage.saveUser({
      id: "u1",
      token: "jwt_token",
      nickName: "Tom",
      username: "tom1",
      avatarURL: ""
    } as any)

    jest.spyOn(PilasBloquesApi, "getForumStatus").mockRejectedValueOnce(new Error("Network Error"))

    renderComponent(<ForumAccessDialog open={true} onClose={jest.fn()} />)

    const retryButton = await screen.findByTestId("retryButton")
    expect(retryButton).toBeInTheDocument()
  })
})

describe("isForumDevEnabled", () => {
  const originalLocation = window.location

  beforeEach(() => {
    localStorage.clear()
    delete (window as any).location
    window.location = { ...originalLocation, search: "", hash: "" } as any
  })

  afterAll(() => {
    window.location = originalLocation
  })

  test("returns false when no dev flag is present in localStorage or URL", () => {
    expect(isForumDevEnabled()).toBe(false)
  })

  test("returns true and persists to localStorage when dev_foro=true is in URL search", () => {
    window.location = { ...originalLocation, search: "?dev_foro=true", hash: "" } as any
    expect(isForumDevEnabled()).toBe(true)
    expect(localStorage.getItem("PB_DEV_FORUM_ENABLED")).toBe("true")
  })

  test("returns true and persists to localStorage when foro_dev=1 is in URL hash", () => {
    window.location = { ...originalLocation, search: "", hash: "#/?foro_dev=1" } as any
    expect(isForumDevEnabled()).toBe(true)
    expect(localStorage.getItem("PB_DEV_FORUM_ENABLED")).toBe("true")
  })

  test("returns false and removes from localStorage when dev_foro=false is passed", () => {
    localStorage.setItem("PB_DEV_FORUM_ENABLED", "true")
    window.location = { ...originalLocation, search: "?dev_foro=false", hash: "" } as any
    expect(isForumDevEnabled()).toBe(false)
    expect(localStorage.getItem("PB_DEV_FORUM_ENABLED")).toBeNull()
  })

  test("returns true if already persisted in localStorage", () => {
    localStorage.setItem("PB_DEV_FORUM_ENABLED", "true")
    expect(isForumDevEnabled()).toBe(true)
  })
})
