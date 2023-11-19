import axios from 'axios';
import jwt_decode from "jwt-decode";
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { set_Authentication } from '../../Redux/authentication/authenticationSlice';





function AdminLogin() {
  const [formError, setFormError] = useState([])
  const baseURL='http://127.0.0.1:8000'

  const navigate = useNavigate(); 
  const dispatch = useDispatch();


  const handleLoginSubmit = async(event)=> {
    event.preventDefault();
    setFormError([])
    const formData = new FormData();
    formData.append("email", event.target.email.value);
    formData.append("password", event.target.password.value);
    try {
      const res = await axios.post(baseURL+'/api/accounts/login/', formData)
      if(res.status === 200){
        localStorage.setItem('access', res.data.access)
        localStorage.setItem('refresh', res.data.refresh)
        dispatch(
          set_Authentication({
            name: jwt_decode(res.data.access).first_name,
            isAuthenticated: true,
            isAdmin:res.data.isAdmin,
          })
        );
        navigate('/admincontrol')
        return res
      }  
      
    }
    catch (error) {
      console.log(error);
      if (error.response.status===401)
      {
       
        setFormError(error.response.data)
      }
      else
      {
        console.log(error);
  
      }
    }
  }





  return (
    <section style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div className="container py-5">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1" style={{ background: '#fff', padding: '2rem', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Admin Login</h1>

            <form method="POST" onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <input type="email" name="email" id="form1Example13" className="form-control form-control-lg" style={{ borderRadius: '5px' }} />
                <label className="form-label" htmlFor="form1Example13">Email address</label>
              </div>

              <div className="mb-4">
                <input type="password" name="password" id="form1Example23" className="form-control form-control-lg" style={{ borderRadius: '5px' }} />
                <label className="form-label" htmlFor="form1Example23">Password</label>
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
  //   <section >
  //   <div className="container py-5">
  //     <div className="row d-flex align-items-center justify-content-center">
      
  //       <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
  //         <form method='POST' onSubmit={handleLoginSubmit}>
  //           {/* <!-- Email input --> */}
  //           <div className=" mb-4">
  //             <input type="email" name='email' id="form1Example13" className="form-control form-control-lg" />
  //             <label className="form-label" htmlFor="form1Example13">Email address</label>
  //           </div>
  
  //           {/* <!-- Password input --> */}
  //           <div className=" mb-4">
  //             <input type="password" name='password' id="form1Example23" className="form-control form-control-lg" />
  //             <label className="form-label" htmlFor="form1Example23">Password</label>
  //           </div>
  
          
  
  //           {/* <!-- Submit button --> */}
  //           <button type="submit" className="btn btn-primary btn-lg btn-block">Sign in</button>
  
  //           <ul className='text-danger'>
  //              {formError['detail'] && <li>
  //              {formError['detail']}
  //               </li>}
  //             </ul>
            
  //         </form>
  //       </div>
  //     </div>
  //   </div>
  // </section>
  )
}

export default AdminLogin