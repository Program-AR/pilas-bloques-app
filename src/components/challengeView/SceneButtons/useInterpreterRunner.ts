import { useState, useRef, useCallback, useEffect } from "react";
import Interpreter from "js-interpreter";
import { scene } from "../scene";
import { interpreterFactory } from "./interpreterFactory";
import { Challenge } from "../../../staticData/challenges";
import { PilasBloquesApi } from "../../../pbApi";

type Mode = 'run' | 'step';
export const useInterpreterRunner = (
  challenge: Challenge,
  setRunning: ((r: boolean) => void) | undefined,
  mode: Mode = 'run',
  interpreterVersion: number
) => {
  const [showModal, setShowModal] = useState(false);
  const [stepping, setStepping] = useState(false);
  const interpreterRef = useRef<Interpreter | null>(null);

  useEffect(() => {
    interpreterRef.current = null;
    setStepping(false);
  }, [interpreterVersion]);

  const executeUntilEnd = useCallback((): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      let solutionId: string | undefined;
      setRunning && setRunning(true);

      if (!interpreterRef.current) {
        scene.restartScene(challenge.sceneDescriptor);
        solutionId = await PilasBloquesApi.runProgram(challenge.id.toString(), {});
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
          reject(e);
          return;
        }

        if (moreToExecute) {
          setTimeout(executeInterpreter, 10);
        } else {
          interpreterRef.current = null;
          setStepping(false);
          checkProblemSolved().then(async (solved) => {
            const staticAnalysis = {};
            const executionResult = { solved };
            if (solutionId) await PilasBloquesApi.executionFinished(solutionId, staticAnalysis, executionResult);
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
  }, [challenge, mode, setRunning]);

  const checkProblemSolved = async () => {
    const solved = await scene.isTheProblemSolved();
    if (solved) setShowModal(true);
    return solved;
  };

  const run = useCallback(() => {
    if (mode === 'step' && interpreterRef.current && stepping) {
      (window as any).continueExecution();
    } else {
      executeUntilEnd();
    }
  }, [executeUntilEnd, mode, stepping]);

  return {
    run,
    showModal,
    setShowModal,
    stepping,
  };
};
