import React, { useState, useEffect }from 'react'
import '../../styles/admin/adminUsers.scss'
import { MetroSpinner } from 'react-spinners-kit';


const AdminUsers: React.FC = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    type UserType = {
      id: string,
      username: string, 
      firstName: string, 
      lastName: string, 
      email: string,
      isArtist: boolean,
      isAdmin: boolean
    }

    useEffect(() => {
        const fetchUsers = async () => {
          setLoading(true);
            try {
                const response = await fetch(`http://localhost:8080/api/users?page=${currentPage - 1}&size=8`);
                const data = await response.json();
                setUsers(data.content);
                setTotalPages(data.totalPages);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setLoading(false);
            }
        };
        fetchUsers();
    }, [currentPage]);


    // Implement next and previous page handlers
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className='admin-users admin-component'>

          <div className="admin-tab-title">Users</div>

          <div className="searchbar">
            <input type="text" placeholder='Search' />
            <i className="bx bx-search"></i>
          </div>

          <button className="new-user-btn">New User</button>


          {loading ? (
            <div className="users-loader">
              <MetroSpinner />
            </div>
          ) : (
            <>
              {users.map((user: UserType) => (
                <div className="admin-user-wrapper">
                  <div className="admin-user-img">
                    <i className="bx bx-user"></i>
                  </div>

                  <div className="admin-user-meta">
                    <div className="id">{user.id}</div>
                    <div className="username">{user.username}</div>
                    <div className="names">{user.firstName} {user.lastName}</div>
                    <div className="email">{user.email}</div>

                    <div className="admin-user-btns"></div>
                  </div>
                </div>
              ))}

              {loading ? '' : (
                <div className="pagination-btns">
                <button onClick={prevPage} disabled={currentPage === 1}>
                  <i className="bx bx-chevron-left"></i>
                </button>
                <span>{currentPage} of {totalPages}</span>
                <button onClick={nextPage} disabled={currentPage === totalPages}>
                  <i className="bx bx-chevron-right"></i>
                </button>
                </div>
              )}
            </>
          )}

        </div>
    );
}

export default AdminUsers