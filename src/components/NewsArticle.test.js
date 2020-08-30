import React from 'react'
import { render } from '@testing-library/react'

import newsData from '../__tests__/news-data'

import NewsArticle from './NewsArticle'

test('Success renders News with all fields', () => {
  const { getByText, getByRole } = render(<NewsArticle article={newsData.articles[0]} />)
  const sourceNameElement = getByText(new RegExp(newsData.articles[0].source.name, "i"))
  expect(sourceNameElement).toBeInTheDocument()

  const authorElement = getByText(new RegExp(newsData.articles[0].author, "i"))
  expect(authorElement).toBeInTheDocument()

  const titleElement = getByText(new RegExp(newsData.articles[0].title, "i"))
  expect(titleElement).toBeInTheDocument()

  const descriptionElement = getByText(new RegExp(newsData.articles[0].description, "i"))
  expect(descriptionElement).toBeInTheDocument()

  expect(titleElement.href).toBe(newsData.articles[0].url)

  const urlToImageElement = getByRole('img', { name: 'Generic placeholder' });
  expect(urlToImageElement).toHaveAttribute('src', newsData.articles[0].urlToImage)

  const publishedAtElement = getByText(new RegExp(new Date(newsData.articles[0].publishedAt).toLocaleString(), "i"))
  expect(publishedAtElement).toBeInTheDocument()
})
