import { render, screen } from '@testing-library/react'
import Nav from '../components/Nav'
test('renders nav brand', ()=>{ render(<Nav/>); expect(screen.getByText(/TNL News/i)).toBeInTheDocument(); })
