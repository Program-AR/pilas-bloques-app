import { render, screen, fireEvent } from '@testing-library/react'
import { ImportChallengeCard } from '../components/home/ImportChallengeCard';
import { BrowserRouter } from 'react-router-dom';


test('shows error modal when invalid file is uploaded', async () => {
  const { container } = render(<BrowserRouter><ImportChallengeCard /></BrowserRouter>);
  const input = container.querySelector('#import-input')!
  
  const invalidFileMock = {
    text: () => JSON.stringify({pepita: "hola"})
  }
  
  fireEvent.change(input, { target: { files: [invalidFileMock] } });

  const errorModal = await screen.findByTestId("invalid-import-modal")

  expect(errorModal).toBeTruthy()

})