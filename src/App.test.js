import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders with Home link', () => {
  const { getByText } = render(<App />)
  
  const homeLinkElement = getByText(/Home/i)
  expect(homeLinkElement).toBeInTheDocument()
  
  const passionLinkElement = getByText(/Passion/i)
  expect(passionLinkElement).toBeInTheDocument()

  const contactLinkElement = getByText(/Contact/i)
  expect(contactLinkElement).toBeInTheDocument()
})
