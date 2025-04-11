import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import Image from '../utils/Image'

describe('Image Component', () => {
  test('renders with provided src and alt', () => {
    render(<Image src="test.png" text="Test image" />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', 'test.png')
    expect(img).toHaveAttribute('alt', 'Test image')
  })

  test('uses default alt text when none is provided', () => {
    render(<Image src="default.png" />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('alt', 'Image')
  })

  test('applies custom className', () => {
    render(<Image src="style.png" className="custom-class" />)
    const img = screen.getByRole('img')
    expect(img).toHaveClass('custom-class')
  })
})
