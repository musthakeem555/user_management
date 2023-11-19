import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AdminCreateUser() {

  const navigate = useNavigate();
  const [formError, setFormError] = useState([])
  const baseURL = "http://127.0.0.1:8000";
  const [formData, setFormData] = useState({
    first_name: '',
    phone_number: '',
    email: '',
    password: '',
    profile_pic: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      profile_pic: file,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const { profile_pic, ...userData } = formData;
    const userDataWithProfilePic = new FormData();

    userDataWithProfilePic.append('User_Profile.profile_pic', profile_pic);

    Object.keys(userData).forEach((key) => {
      userDataWithProfilePic.append(key, userData[key]);
    });

    axios.post(baseURL + '/api/accounts/admin/users/', userDataWithProfilePic, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then(response => {

        navigate('/admincontrol')

      })
      .catch(error => {
        console.error('Error creating user:', error);
        if (error.response.status === 400) {

          setFormError(error.response.data)
        }
        else {
          console.log(error);

        }
      });
  };




  return (
    <section style={{ backgroundColor: "#fffff" }}>
      <div className="container py-5 ">
        <div className="row d-flex justify-content-center align-items-center ">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 ">

                <h3 className="mb-5 text-center">Create New User</h3>
                <form onSubmit={handleSubmit} method='POST'>

                  <div className=" mb-4">
                    <label className="form-label" >Name</label>
                    <input type="text" name='first_name' className="form-control form-control-lg" required onChange={handleInputChange} />
                  </div>
                  <div className=" mb-4">
                    <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                    <input type="email" id="typeEmailX-2" name='email' className="form-control form-control-lg" required onChange={handleInputChange} />
                  </div>

                  <div className=" mb-4">
                    <label className="form-label" >Mobile Number</label>
                    <input type="text" className="form-control form-control-lg" name='phone_number' required onChange={handleInputChange} />
                  </div>

                  <div className=" mb-4">
                    <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                    <input type="password" id="typePasswordX-2" className="form-control form-control-lg" name='password' required onChange={handleInputChange} />
                  </div>

                  <div className=" mb-4">
                    <label className="form-label" htmlFor="typePasswordX-2">Profile Picture</label>
                    <input type="file" className="form-control form-control-lg" name='profile_pic' required onChange={handleFileChange} />
                  </div>



                  <button className="btn btn-dark btn-lg btn-block" type="submit">Create Now</button>
                </form>

                <ul className='text-danger'>
                  {Object.keys(formError).map((key) => (
                    formError[key].map((message, index) => (
                      <li key={`${key}_${index}`}>{message}</li>
                    ))
                  ))}
                </ul>





              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminCreateUser