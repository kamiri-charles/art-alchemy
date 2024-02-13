import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Product from './pages/Product'
import AdminSignIn from './components/Admin/AdminSignIn'
import 'boxicons/css/boxicons.min.css'
import './App.scss'
import Admin from './pages/Admin'

function App() {

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='' element={ <Landing /> } />
          <Route path='/sign-in' element={ <SignIn /> } />
          <Route path='/sign-up' element={ <SignUp /> } />
          <Route path='/product' element={ <Product />} />

          {/* Admin */}
          <Route path='/admin/sign-in' element={ <AdminSignIn /> } />
          <Route path='/admin' element={ <Admin /> } />
        </Routes>
      </Router>
    </div>
  )
}

export default App
