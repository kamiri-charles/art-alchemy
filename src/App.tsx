import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Product from './pages/Product'
import Profile from './components/Profile'

import Admin from './pages/Admin'
import AdminSignIn from './components/Admin/AdminSignIn'
import AdminNewUser from './components/Admin/AdminNewUser'
import 'boxicons/css/boxicons.min.css'
import './App.scss'

function App() {

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='' element={ <Home /> } />
          <Route path='/sign-in' element={ <SignIn /> } />
          <Route path='/sign-up' element={ <SignUp /> } />
          <Route path='/product' element={ <Product />} />
          <Route path='/profile' element={ <Profile /> } />

          {/* Admin */}
          <Route path='/admin' element={ <Admin /> } />
          <Route path='/admin/sign-in' element={ <AdminSignIn /> } />
          <Route path='/admin/new-user' element={ <AdminNewUser /> } />
        </Routes>
      </Router>
    </div>
  )
}

export default App