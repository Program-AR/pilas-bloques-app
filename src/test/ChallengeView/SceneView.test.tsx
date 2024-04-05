/**
 * @jest-environment jsdom
 * @jest-environment-options { "resources": "usable" }
 */
// This enables iframe loading on rendering, otherwise it's turned off.

import { SceneView } from "../../components/challengeView/SceneView"
import { screen } from '@testing-library/react'
import { renderComponent } from "../testUtils"
describe('SceneView renders all challenges', () => {

    test.skip(`Scene LimpiandoElHumedal loads ok`, () => {
        
        return new Promise<void>(resolve => {
            const onLoad = () => {
                expect((screen.getByTestId("scene-iframe") as any).contentWindow.eval("pilas.escena_actual().automata")).toBeTruthy()
                resolve()
            }

            renderComponent(<SceneView 
                descriptor={"new LimpiandoElHumedal()"}
                onLoad={onLoad}
            />)
        })        
    }, 15000)

    // const expectSceneLoadedOk = async () => {
    //     expect((await screen.findByTestId("scene-iframe") as any)
    //             .contentWindow.eval("pilas.escena_actual().automata")).toBeTruthy()

    // }  

    // allDescriptors().concat("new EscenaFalopa()").forEach( sceneDescriptor => {
    //     test(`Scene ${scene.sceneName(sceneDescriptor)} renders ok`, () => {
    //         return new Promise<void>((success) => {
    //             renderComponent(<SceneView descriptor={sceneDescriptor} onLoad={async (event) => {await expectSceneLoadedOk(); success()}} />)
    //         }
    //         )
    //     })
    // })

})