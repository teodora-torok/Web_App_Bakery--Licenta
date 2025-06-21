import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { userRegistration } from '../../service/RegisterLogIn_Service';

const Register = () => {
  const loginNavigate= useNavigate();
  const [data, setData] = useState({
    name: '',
    mail: '',
    password: ''
  });

  const onChange_Handler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  }

  const onSubmit_Handler = async (event) => {
    event.preventDefault();
    try {
      const response = await userRegistration(data);
      if (response.status===201) {
        toast.success('Registration was successful. Log in to your new account.');
        loginNavigate("/login");
      } else {
        toast.error('Registration failed. Please try again later.');
      }
    } catch (error) {
      toast.error('Registration failed. Please try again later.');
    }
  };

  return (
    <div className="container signup-container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card">
            <div className="card-body register-card p-4 p-sm-5">
              <h5 className="card-title register-title text-center mb-5">CREATE AN ACCOUNT</h5>
              <form onSubmit={onSubmit_Handler}>
                <div className="form mb-3 name-field ">
                  <label htmlFor="Name">Full Name</label>
                  <input type="text" className="custom-input" id="Name" placeholder=""
                    name="name"
                    onChange={onChange_Handler}
                    value={data.name}
                    required
                  />

                </div>
                <div className="form mb-3 email-field ">
                  <label htmlFor="Input">Email address</label>
                  <input type="email" className="custom-input" id="Input" placeholder=""
                    name="mail"
                    onChange={onChange_Handler}
                    value={data.mail}
                    required
                  />

                </div>
                <div className="form mb-3 pass-field ">
                  <label htmlFor="Password">Password</label>
                  <input type="password" className="custom-input" id="Password" placeholder=""
                    name="password"
                    onChange={onChange_Handler}
                    value={data.password}
                    required
                  />

                </div>
                <div className="d-grid">
                  <button className="btn btn-primary btn-login"
                    style={{
                      marginTop: '30px',
                      marginBottom: '10px',
                      backgroundColor: '#D8C7BF',
                      color: '#472f17',
                      fontSize: '18px',
                      letterSpacing: '5px',
                      wordSpacing: '1.25px',
                      padding: '12px 24px',
                      border: 'none'
                    }}
                    type="submit">SIGN UP</button>
                </div>
                <div className="mt-4 text-center"
                  style={{
                    color: '#472f17',
                    letterSpacing: '6px',
                    wordSpacing: '8px',
                    fontSize: '16px'
                  }}
                >
                  Already have an account?
                </div>
                <div className="text-center"
                  style={{
                    color: '#472f17',
                    letterSpacing: '6px',
                    wordSpacing: '8px',
                    fontSize: '16px'
                  }}
                >
                  <Link to="/login" style={{ color: '#472f17', alignItems: 'center' }} >SIGN IN</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;