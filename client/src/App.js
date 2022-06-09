import { Container } from '@material-ui/core'
import Home from './components/Home'
import Navbar from './components/Navbar'
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom'
import Auth from './components/Auth'
import PostDetails from './components/PostDetails'

const App = () => (
  <BrowserRouter>
    <Container maxWidth='lg'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to='/posts' />} />
        <Route path='/posts' element={<Home />} />
        <Route path='/posts/search' element={<Home />} />
        <Route path='/posts/:id' element={<PostDetails />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </Container>
  </BrowserRouter>
)
export default App
