import { useState, useRef, useCallback, useEffect } from "react";
import Interpreter from "js-interpreter";
import { scene } from "../scene";
import { interpreterFactory } from "./interpreterFactory";
import { Challenge } from "../../../staticData/challenges";
import { PilasBloquesApi } from "../../../pbApi";
import Blockly from "blockly/core"
import { MulangExpectationResult } from "../../blockly/mulang/mulangResults";
import ReactGA from "react-ga4";

type Mode = 'run' | 'step';

type ValidationResult = {
  canRun: boolean
  mulangResults: MulangExpectationResult[]
}

type UseInterpreterRunnerOptions = {
  runValidations?: () => Promise<ValidationResult>
}

export const useInterpreterRunner = (
  challenge: Challenge,
  setRunning: ((r: boolean) => void) | undefined,
  mode: Mode = 'run',
  interpreterVersion: number,
  blocklyXML: string = '',
  options?: UseInterpreterRunnerOptions
) => {
  const [showModal, setShowModal] = useState(false);
  const [stepping, setStepping] = useState(false);
  const interpreterRef = useRef<Interpreter | null>(null);
  const [mulangResults, setMulangResults] = useState<MulangExpectationResult[]>([]);
  const [solved, setSolved] = useState(false);

  const trackExecutionEvent = useCallback((eventType: 'run' | 'success' | 'failure') => {
    const isOfficial = challenge.id !== 0;
    const actionMap = {
      run: isOfficial ? "run_challenge" : "creator_challenge_run",
      success: isOfficial ? "challenge_success" : "creator_challenge_success",
      failure: isOfficial ? "challenge_failure" : "creator_challenge_failure"
    };

    ReactGA.event({
        category: isOfficial ? "execution" : "creator_execution",
        action: actionMap[eventType],
        label: isOfficial ? challenge.id.toString() : challenge.title
    });
  }, [challenge]);

  useEffect(() => {
    interpreterRef.current = null;
    setStepping(false);
    interpreterFactory.clearHighlight();
  }, [interpreterVersion]);

  const getBlocklyXML = useCallback((): string => {
    try {
      return Blockly.utils.xml.domToText(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()));
    } catch (e) {
      console.warn("No se pudo obtener el XML del Blockly, retornando cadena vacía", e);
      return '';
    }
  }, []);

  const executeUntilEnd = useCallback((): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      let solutionId: string | undefined;
      setRunning && setRunning(true);
      if (!interpreterRef.current) {
        await scene.restartScene(challenge.sceneDescriptor);
        // TODO: Enviar ast, turboModeOn y staticAnalysis como lo hace Ember
        const programXML = blocklyXML || getBlocklyXML();
        const staticAnalysis = { couldExecute: true };
        solutionId = await PilasBloquesApi.runProgram(challenge.id.toString(), { program: programXML, staticAnalysis });
        interpreterRef.current = interpreterFactory.createInterpreter();
      }

      let moreToExecute = false;
      let paused = false;

      const executeInterpreter = () => {
        try {
          if (!paused) {
            if (interpreterRef.current)
              moreToExecute = interpreterRef.current.run();
            if (mode === 'step') {
              paused = true;
              setStepping(true);
            }
          }
        } catch (e) {
          interpreterFactory.clearHighlight();
          reject(e);
          return;
        }

        if (moreToExecute) {
          setTimeout(executeInterpreter, 10);
        } else {
          interpreterRef.current = null;
          setStepping(false);
          interpreterFactory.clearHighlight();

          checkProblemSolved().then(async (solved) => {
            const staticAnalysis = { couldExecute: true };
            if (solutionId) await PilasBloquesApi.executionFinishedEvent(solutionId, staticAnalysis, solved);
            resolve();
          });
        }
      };

      (window as any).continueExecution = () => {
        if (paused && interpreterRef.current) {
          paused = false;
          setStepping(false);
          setTimeout(executeInterpreter, 10);
        }
      };

      executeInterpreter();
    });
  }, [challenge, mode, setRunning, getBlocklyXML]);

  const checkProblemSolved = async () => {
    const solved = await scene.isTheProblemSolved();    
    setSolved(solved);

    trackExecutionEvent(solved ? 'success' : 'failure');

    if (solved) setShowModal(true);
    return solved;
  };

  const run = useCallback(async () => {
    if (mode === 'step' && interpreterRef.current && stepping) {
      (window as any).continueExecution();
    } else {
      const validationResult = await options?.runValidations?.();

      if (validationResult?.canRun === false) return;

      trackExecutionEvent('run');

      setMulangResults(validationResult?.mulangResults || [])

      executeUntilEnd();

    }
  }, [executeUntilEnd, mode, stepping, options, trackExecutionEvent]);

  return {
    run,
    showModal,
    setShowModal,
    stepping,
    mulangResults,
    solved,
  };
};
