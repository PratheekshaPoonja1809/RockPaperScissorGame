import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import Button from '../utils/Button'

describe('Button Component', () => {
  test('renders with default text', () => {
    render(<Button />)
    expect(screen.getByRole('button')).toHaveTextContent('Click')
  })

  test('renders with custom text', () => {
    render(<Button text="Reset" />)
    expect(screen.getByRole('button')).toHaveTextContent('Reset')
  })

  test('calls onClick when clicked', () => {
    const mockClick = vi.fn() 
    render(<Button text="Lets Go" onClick={mockClick} />)

    fireEvent.click(screen.getByRole('button'))
    expect(mockClick).toHaveBeenCalledTimes(1)
  })

  test('applies custom className', () => {
    render(<Button className="my-custom-btn" />)
    expect(screen.getByRole('button')).toHaveClass('my-custom-btn')
  })
})
