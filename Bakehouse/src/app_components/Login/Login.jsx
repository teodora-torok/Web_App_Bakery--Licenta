import React, { useContext, useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { userLogIn } from '../../service/RegisterLogIn_Service';
import {ContextStore} from '../../context/Context_Store';
import { toast } from 'react-toastify';

const Login = () => {
  const {set_Token, CartLoading}= useContext(ContextStore);
  const homeNavigate= useNavigate();
  const [data, setData]= useState({
    mail: '',
    password: ''
  });

const onChange_Handler= (event) => {
  const name= event.target.name;
  const value= event.target.value;
  setData(data=> ({...data, [name]: value}));
}

const onSubmit_Handler= async (event) => {
  event.preventDefault(); 
   console.log("FORM SUBMIT HANDLER TRIGGERED");
  try {
    const response= await userLogIn(data);

    if(response.status===200) {
      set_Token(response.data.token);
      localStorage.setItem('token', response.data.token); 
      await CartLoading(response.data.token);
      homeNavigate('/');
    } else {
      toast.error('Log In failed. Try again.');
    }
  } catch (error) {
    console.log('error during login', error);
    toast.error('Log In failed. Try again.');
  }
};
//method="post" la form 
  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card">
            <div className="card-body login-card p-4 p-sm-5">
              <h5 className="card-title login-title text-center mb-5 mb-8">LOG IN</h5>
              <form onSubmit={onSubmit_Handler} > 
                <div className="form mb-3 email-field">
                  <label htmlFor="input">Email address</label>
                  <input type="email" className="custom-input" id="input" placeholder=""
                  name="mail"
                  onChange={onChange_Handler}
                  value={data.mail}
                  />
                </div>
                <div className="form mb-3 pass-field">
                  <label htmlFor="Password">Password</label>
                  <input type="password" className="custom-input" id="Password" placeholder="" 
                  name="password"
                  onChange={onChange_Handler}
                  value={data.password}
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
                    type="submit">SIGN IN</button>
                </div>
                <div className="mt-4 text-center"
                  style={{
                    color: '#472f17',
                    letterSpacing: '6px',
                    wordSpacing: '8px',
                    fontSize: '16px'
                  }}
                >
                  Don't have an account? <Link to="/register" style={{ color: '#472f17' }} >SIGN UP</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;