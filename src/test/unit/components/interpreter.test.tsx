import { ExecuteButton } from "../../../components/challengeView/SceneButtons/Execute";
import { Challenge } from "../../../staticData/challenges";
import { renderComponent } from "../../testUtils";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { scene } from "../../../components/challengeView/scene";

// Mock de ThemeContext
jest.mock("../../../theme/ThemeContext", () => ({
  useThemeContext: () => ({
    isSmallScreen: false,
    theme: {
      palette: {
        background: { default: "#fff" },
      },
    },
  }),
}));

// Mock de Blockly
jest.mock('blockly', () => ({
  getMainWorkspace: jest.fn(() => ({
    getVariableMap: jest.fn(),
  })),
  javascriptGenerator: {
    workspaceToCode: jest.fn(() => 'mocked code'),
  },
}));

// Mock de useInterpreterRunner
const mockRun = jest.fn();
jest.mock("../../../components/challengeView/SceneButtons/useInterpreterRunner", () => ({
  useInterpreterRunner: () => ({
    run: mockRun,
    showModal: false,
    setShowModal: jest.fn(),
    stepping: false,
  }),
}));

describe("Interpreter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    scene["restartScene"] = jest.fn();
    scene["isTheProblemSolved"] = jest.fn().mockResolvedValue(true);
  });

  const challenge: Challenge = {
    id: 1,
    sceneDescriptor: `new EscenaLita(["[[A,L,T],[-,-,E],[-,-,-]]","[[A,T,L],[-,-,E],[-,-,-]]"])`,
    toolboxBlockIds: ["AgarrarTomate"],
    imageURL: () => "",
  };

  test("Interpreter runs on execution", async () => {
    renderComponent(
      <ExecuteButton
        challenge={challenge}
        interpreterVersion={0}
        running={false}
        setRunning={jest.fn()}
      />
    );

    const button = await screen.findByTestId("execute-button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockRun).toHaveBeenCalled();
    });
  });
});