import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { set_Authentication } from '../../../Redux/authentication/authenticationSlice';
import userimg from '../../../images/user.png'


function UserHeader() {
  const authentication_user = useSelector(state => state.authentication_user)
  const user_basic_details = useSelector(state => state.user_basic_details)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const logout = () => {
    localStorage.clear();
    dispatch(
      set_Authentication({
        name: null,
        isAuthenticated: false,
        isAdmin: false
      })
    );
    navigate('/')

  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ background: 'grey' }}>
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Link className="navbar-brand mt-2 mt-lg-0" to='/'>
            Home
          </Link>
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {authentication_user.isAuthenticated ? (
                <Link className="nav-link" to='/profile'>{authentication_user.name}</Link>
              ) : (
                <Link className="nav-link" to='/login'>Login</Link>
              )}
            </li>
            <li className="nav-item">
              {authentication_user.isAuthenticated ? (
              <li className="nav-item">
                <Link to="/" onClick={logout} className="nav-link">
                  Logout
                </Link>
              </li>
            ): (
                <Link className="nav-link" to='/register'>Register</Link>
              )}
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center">
          <div className="dropdown">
            <Link
              className="dropdown-toggle d-flex align-items-center hidden-arrow"
              href="#"
              id="navbarDropdownMenuAvatar"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={
                  authentication_user.isAuthenticated && user_basic_details.profile_pic
                    ? user_basic_details.profile_pic
                    : userimg
                }
                className="rounded-circle"
                height="25"
                alt="User Profile"
                loading="lazy"
              />
            </Link>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuAvatar"
            >
              <li>
                <Link className="dropdown-item" to='/profile'>My profile</Link>
              </li>
              <li>
                {!authentication_user.isAuthenticated ? (
                  <Link className="dropdown-item" to='/login'>Login</Link>
                ) : (
                  <button className="dropdown-item" onClick={logout}>Logout</button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}


export default UserHeader