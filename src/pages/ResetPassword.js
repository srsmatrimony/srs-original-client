import React, { useState, useEffect } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

//components
import Spinner from "../components/Spinner/Spinner";
import swal from "sweetalert";

//actions
import { resetPassword } from '../store/auth/authActions';
import { resetAuth } from '../store/auth/authSlice';

// image
import logosrs from '../images/svg/srslogo.svg'; 

const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(window.location.search);
  const token = queryParameters.get("token");
  const id = queryParameters.get("id");
  
  
  const { loading, error, success } = useSelector(state => state.auth);
  
  let errorsObj = { password: '', confirmPassword: '' };
  
  const [errors, seterrors] = useState({ errorsObj });
  
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassford] = useState('');
  
  const [type, settype] = useState('password');
  const [typec, settypec] = useState('password');
  const [icon, seticon] = useState('fa fa-eye-slash');
  const [iconc, seticonc] = useState('fa fa-eye-slash');
	
	const handleToggle = () => {
    
    
    if (type === 'password') {
      settype('text')
      seticon('fa fa-eye');
      
    }
    else {
      settype('password');
      seticon('fa fa-eye-slash');
    }

	}

  const handleTogglec = () => {
    
    
    if (typec === 'password') {
      settypec('text')
      seticonc('fa fa-eye');
      
    }
    else {
      settypec('password');
      seticonc('fa fa-eye-slash');
    }

  }
  
  const handleResetPassword = (e) => {
    e.preventDefault();
    
    let error = false;
    const errorObj = { ...errorsObj };

    if (password === '') {
      errorObj.password = 'password is required';
      error = true;
    }

    seterrors(errorObj);

    if (confirmPassword === '') {
      errorObj.confirmPassword = 'please confirm your password';
      error = true;

    }
    seterrors(errorObj);

    if (password !== confirmPassword) {
      errorObj.confirmPassword = 'passwords entered are different';
      error =true
    }
    seterrors(errorObj);

    if (error) {
      return
    }

    const payload = {
      userId: id,
      password,
      token
    }


    dispatch(resetPassword(payload));

    
  }

  const [dispError, setdispError] = useState('');

	useEffect(() => {
		if (error) {
			swal("error", error);
			setdispError(error);
			dispatch(resetAuth());

		}
  }, [dispatch, error]);
  

  useEffect(() => {
    if (success) {
      navigate('/page-password-update-status');
    }
  }, [navigate, success]);
  

  return (
    <div className="authincation h-100 p-meddle">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">  
                      <Link to="/page-login">
                        <img width="290" height="35" viewBox="0 0 336 41" fill="none" src={logosrs} alt="" />
                      </Link>
                      
                    </div>
                    <h4 className="text-center mb-4 ">Plese Enter Password for Your SRS account</h4>
                    
                      
                  
                    {
                      dispError && (
                        <div className='bg-red-300 text-danger border border-red-900 p-1 my-2'> 
                          {dispError}
                        </div>
                      )
                    }
                    
					{/* {"props.successMessage" && (
						<div className=''>
							{"props.successMessage"}
						</div>
					)} */}
                    <form onSubmit={handleResetPassword}>
                      
                    
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Password</strong>
                        </label>
                        <div className='input-group'>
                        <input
                          type={type}
                          value={password}
                          onChange={(e) =>setPassword(e.target.value)}
                          className="form-control"
                          defaultValue="Password"
                          />
                          <span className="input-group-text" onClick={handleToggle}>
                            <i className={icon}></i>
                          </span>
                        </div>
                        
                      </div>
                    {errors.password && <div className="text-danger fs-12">{errors.password}</div>}
                    <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Confirm Password</strong>
                        </label>
                        <div className='input-group'>
                        <input type={typec}
                          value={confirmPassword}
                          onChange={(e) =>setconfirmPassford(e.target.value)}
                          className="form-control"
                          />
                          <span className="input-group-text" onClick={handleTogglec}>
                            <i className={iconc}></i>
                          </span>
                        </div>
                        
                      </div>
                      {errors.confirmPassword && <div className="text-danger fs-12">{errors.confirmPassword}</div>}
                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          {loading ? <Spinner /> : "Reset Password"}
                        </button>
                      </div>
                    </form>
                    <div className="new-account mt-3">
                      <p className="">
                        Already have an account?{" "}
                        <Link className="text-primary" to="/page-login">
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Register;



