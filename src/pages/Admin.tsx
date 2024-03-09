import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/Admin/AdminNavbar'
import AdminDashboard from '../components/Admin/AdminDashboard';
import AdminUsers from '../components/Admin/AdminUsers';
import AdminArt from '../components/Admin/AdminArt';
import AdminEvents from '../components/Admin/AdminEvents';
import AdminStats from '../components/Admin/AdminStats';
import AdminSettings from '../components/Admin/AdminSettings';


const Admin: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    // Check if admin is signed in
    if (localStorage.getItem('artAlchemyAdminUserData')) {
      if (currentTab == '') setCurrentTab('dashboard')

    } else {
      nav('/admin/sign-in');
    }

  },  [currentTab, nav]);

  const tabComponents: { [key: string]: JSX.Element } = {
    dashboard: <AdminDashboard setCurrentTab={setCurrentTab} />,
    users: <AdminUsers />,
    art: <AdminArt />,
    events: <AdminEvents />,
    stats: <AdminStats />,
    settings: <AdminSettings />,
  }

  return (
    <div className='admin'>
      <AdminNavbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <div className="admin-content fl-c-c">
        {tabComponents[currentTab]}
      </div>
    </div>
  )
}

export default Admin