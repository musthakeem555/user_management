import React from 'react'

import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'



function UserHome() {

  const navigate = useNavigate()
  const authentication_user = useSelector(state => state.authentication_user)

  return (

    <div className="row my-4 mx-4">
      <div className="col-md-6 mb-4">
        <h4><strong>{authentication_user.isAuthenticated ? <>Welcome Back {authentication_user.name} ! </> : <>Hello Guest User</>} </strong></h4>
        <h4><strong>Home Page </strong></h4>
        <p className="text-muted">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        {authentication_user.isAuthenticated ? <>
          <Link type="button" className="btn btn-primary" to='/profile'>Go To Profile  ! </Link></>
          : <><Link type="button" className="btn btn-primary" to='/login'> Login to get more</Link></>}


      </div>
    </div>

  )
}

export default UserHome