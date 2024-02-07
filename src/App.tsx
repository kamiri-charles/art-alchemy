import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import 'boxicons/css/boxicons.min.css'
import './App.scss'

function App() {

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='' element={ <LandingPage /> } />
          <Route path='/sign-in' element={ <SignIn /> } />
          <Route path='/sign-up' element={ <SignUp /> } />
        </Routes>
      </Router>
    </div>
  )
}

export default App
