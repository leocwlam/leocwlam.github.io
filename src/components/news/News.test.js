import React from 'react'
import { render } from '@testing-library/react'

import News from './News'

test('Success renders News title', () => {
  const { getByText } = render(<News />)
  const linkElement = getByText(/News/i)
  expect(linkElement).toBeInTheDocument()
})
