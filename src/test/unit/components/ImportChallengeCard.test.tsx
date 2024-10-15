import { screen, fireEvent } from '@testing-library/react'
import { ImportChallengeCard } from '../../../components/home/ImportChallengeCard';
import { renderComponent } from '../../testUtils';


test('shows error snackbar when invalid file is uploaded', async () => {
  
  renderComponent(<ImportChallengeCard />)
  
  const input = await screen.findByTestId('import-input')
  
  const invalidFileMock = {
    text: () => JSON.stringify({pepita: "hola"})
  }
  
  fireEvent.change(input, { target: { files: [invalidFileMock] } });

  const errorSnackbar = await screen.findByTestId("dialog-snackbar")

  expect(errorSnackbar).toBeTruthy()

})