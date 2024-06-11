import { screen } from '@testing-library/react'
import { renderComponent } from '../testUtils';
import { ToolboxPreview } from '../../components/creator/Editor/ChallengeDetailsEdition/ToolBoxEditor/ToolboxPreview';
import { commonBlocks, sceneBlocks } from '../../components/blockly/blocks';

describe('Toolbox Preview', () => {
  test('rendering toolbox preview ', async () => {
    const toolBoxItems = [...commonBlocks.map((block => block.id)), ...sceneBlocks.map((block => block.id))]
    renderComponent(<ToolboxPreview blockIds={toolBoxItems} categorized={false} />);
    const idPBBlockly = await screen.findByTestId('pb-blockly')
    const injectBlockly = await screen.findByText('child-blockly')
    expect(idPBBlockly).toBeInTheDocument()
    expect(injectBlockly).toBeInTheDocument()
  });

})
