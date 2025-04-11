import { render, screen } from '@testing-library/react'
import App from '../App'
import { expect, test } from 'vitest'

test('renders Rock Paper Scissor Game', () => {
  render(<App />)
  expect(screen.getByText(/rock - paper - scissors/i)).toBeInTheDocument()
})
