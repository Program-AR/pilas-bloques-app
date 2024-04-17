import { screen } from '@testing-library/react'
import { defaultChallenge } from "../../components/serializedChallenge"
import { LocalStorage } from '../../localStorage';
import { renderComponent, renderWithContext } from '../testUtils';
import { ToolboxPreview } from '../../components/creator/Editor/ChallengeDetailsEdition/ToolBoxEditor/ToolboxPreview';
import { commonBlocks, sceneBlocks } from '../../components/blockly/blocks';

describe('Toolbox Preview', () => {
    /*
    afterEach(() => {
        localStorage.clear()
    })

    beforeEach(() => {
        localStorage.clear()
        LocalStorage.saveCreatorChallenge(defaultChallenge("Lita"))
    })

    */

    test('rendering toolbox preview ', async () => {

      const toolBoxItems = [...commonBlocks.map((block => block.id)), ...sceneBlocks.map((block => block.id))]
      
      
      renderWithContext(<ToolboxPreview blockIds={toolBoxItems} categorized={false}/>)
      
      const blocks = await screen.findByTestId(toolBoxItems.join(","))
            
      expect(blocks).toBeInTheDocument()
    })
/*
    test('check tool button not belongs to the scene ', async () => {
  
        renderComponent(<SceneTools />)

        const toolButton = screen.queryByTestId('K')
            
        expect(toolButton).toBeNull()
    })
*/    
})
