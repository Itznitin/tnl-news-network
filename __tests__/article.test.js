import { render, screen } from '@testing-library/react'
import ArticleCard from '../components/ArticleCard'

const article = { title: 'Test Article', description: 'Short desc', url: 'https://example.com' }

test('ArticleCard renders title and read link', ()=>{
  render(<ArticleCard article={article} onSave={()=>{}} saved={false} />)
  expect(screen.getByText(/Test Article/i)).toBeInTheDocument()
  expect(screen.getByText(/Read/i)).toBeInTheDocument()
})
