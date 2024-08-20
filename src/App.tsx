import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './components/Profile'
import NewArt from './pages/NewArt'
import Art from './pages/Art'
import Checkout from './pages/Checkout'

import Admin from './pages/Admin'
import AdminSignIn from './components/Admin/AdminSignIn'
import AdminNewUser from './components/Admin/AdminNewUser'
import 'boxicons/css/boxicons.min.css'
import './App.scss'
import BreadCrumbsHeader from './components/BreadCrumbsHeader'

function App() {

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='' element={ <Home /> } />
          <Route path='/sign-in' element={ <SignIn /> } />
          <Route path='/sign-up' element={ <SignUp /> } />
          <Route path='/profile' element={ <Profile /> } />
          <Route path='/new-art' element={ <NewArt /> } />
          <Route path='/art/:art-id' element={ <Art /> } />
          <Route path='/checkout' element={ <Checkout /> } />

          {/* Admin */}
          <Route path='/admin' element={ <Admin /> } />
          <Route path='/admin/sign-in' element={ <AdminSignIn /> } />
          <Route path='/admin/new-user' element={ <AdminNewUser /> } />

          {/* Test */}
          <Route path='/test' element={ <BreadCrumbsHeader /> } />
        </Routes>
      </Router>
    </div>
  )
}

export default App