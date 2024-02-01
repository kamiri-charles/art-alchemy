import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import SignIn from './pages/SignIn'
import 'boxicons/css/boxicons.min.css'
import './App.scss'

function App() {

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='' element={ <LandingPage /> } />
          <Route path='/sign-in' element={ <SignIn /> } />
        </Routes>
      </Router>
    </div>
  )
}

export default App
