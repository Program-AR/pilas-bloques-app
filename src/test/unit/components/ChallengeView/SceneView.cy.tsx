import { mount } from 'cypress/react18'
import React from 'react'
import { SceneView } from '../../../../components/challengeView/SceneView'
import { allDescriptors } from '../../../../staticData/challenges'
import { scene } from '../../../../components/challengeView/scene'
import { screen } from '@testing-library/react'


describe('SceneView renders all challenges', () => {

  allDescriptors().forEach((descriptor) => {
    it(`Scene ${scene.sceneName(descriptor)} renders ok`, () => {
      mount(<SceneView descriptor={descriptor}
        onLoad={() => expect((screen.getByTestId("scene-iframe") as any).contentWindow.eval("pilas.escena_actual().automata")).to.exist} />)
    })
  })
})

