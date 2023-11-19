import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { set_Authentication } from '../../Redux/authentication/authenticationSlice';
import jwt_decode from "jwt-decode";


function UserLogin() {
  const { state } = useLocation();
  const [message, setmessage] = useState(null)
  const [formError, setFormError] = useState([])
  const baseURL = 'http://127.0.0.1:8000'

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (state) {
      setmessage(state)
    }

    navigate('', {});

  }, [state, navigate])


  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setFormError([])
    const formData = new FormData();
    formData.append("email", event.target.email.value);
    formData.append("password", event.target.password.value);
    try {
      const res = await axios.post(baseURL + '/api/accounts/login/', formData)
      if (res.status === 200) {
        localStorage.setItem('access', res.data.access)
        localStorage.setItem('refresh', res.data.refresh)
        console.log(res.data);
        dispatch(
          set_Authentication({
            name: jwt_decode(res.data.access).first_name,
            isAuthenticated: true,
            isAdmin: res.data.isAdmin
          })
        );
        navigate('/')
        return res
      }

    }
    catch (error) {
      console.log(error);
      if (error.response.status === 401) {

        setFormError(error.response.data)
      }
      else {
        console.log(error);

      }
    }
  }


  return (
    <section style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div className="container py-5">
        <div className="row d-flex align-items-center justify-content-center">
          {message && (
            <div className="alert alert-primary" role="alert" data-mdb-color="dark">
              {message}
            </div>
          )}
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1" style={{ background: '#fff', padding: '2rem', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Login</h1>

            <form method="POST" onSubmit={handleLoginSubmit}>
              <div className="mb-4">
              <label className="form-label" htmlFor="form1Example13">Email address</label>
                <input type="email" name="email" id="form1Example13" className="form-control form-control-lg" style={{ borderRadius: '5px' }} />
              </div>

              <div className="mb-4">
              <label className="form-label" htmlFor="form1Example23">Password</label>
                <input type="password" name="password" id="form1Example23" className="form-control form-control-lg" style={{ borderRadius: '5px' }} />
              </div>

              <div className="d-flex justify-content-around align-items-center mb-4">
                <Link to="/register" style={{ textDecoration: 'none', color: 'blue', fontWeight: 'bold' }}>
                  Not Have Account?
                </Link>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                style={{ borderRadius: '5px', background: '#007BFF', border: 'none' }}
              >
                Sign in
              </button>

              <ul style={{ color: 'red', marginTop: '1rem' }}>
                {formError['detail'] && (
                  <li>
                    {formError['detail']}
                  </li>
                )}
              </ul>
            </form>
          </div>
        </div>
      </div>
    </section>

  )
}

export default UserLogin