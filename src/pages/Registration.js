import React,{useState,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import { useSelector ,useDispatch} from "react-redux";
import swal from "sweetalert";

// image
import logosrs from '../images/svg/srslogo.svg'; 

// action
import { registerUser } from '../store/auth/authActions';
import { resetAuth } from '../store/auth/authSlice';

// components
import Spinner from "../components/Spinner/Spinner";

const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading,success, error } = useSelector(state => state.auth);
  

    const [email, setEmail] = useState('');
    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
    const [password, setPassword] = useState('');
  
  const [type, settype] = useState('password');
	const [icon, seticon] = useState('fa fa-eye-slash');
	
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
  
  
  const handleRegister = (e) => {
    e.preventDefault();
    
    let error = false;
    const errorObj = { ...errorsObj };
    if (email === '') {
            errorObj.email = 'email is Required';
            error = true;
        }
        if (password === '') {
            errorObj.password = 'Password is Required';
            error = true;
        }
		else if(password.length < 8){
			errorObj.password = 'password requires minimum of 8 characters';
            error = true;
		} 
		setErrors(errorObj);

        if (error) {
		
			return ;
		}
    
    const data = { email, password };
    dispatch(registerUser(data));

  }

  const [dispError, setdispError] = useState('');
  useEffect(() => {
    if (error) {
      swal(error, "error");
      setdispError(error);
      dispatch(resetAuth());
  
    }
  }, [error,dispatch]);

  useEffect(() => {
    if (success && !error) {
      navigate('/page-register-success-next');
    }
  }, [error, navigate, success]);
  
  

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
                    <h4 className="text-center mb-4 ">Sign up your account</h4>
                    
                      
                  
                    {dispError && (
                      <div className='bg-red-300 text-danger border border-red-900 p-1 my-2'>
                        {dispError}
                      </div>
                    )}
					{/* {"props.successMessage" && (
						<div className=''>
							{"props.successMessage"}
						</div>
					)} */}
                    <form className="form-validate" onSubmit={handleRegister}>
                      
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Email</strong>
                        </label>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          placeholder="hello@example.com"
                        />
                      </div>
					  {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Password</strong>
                        </label>
                         <div className='input-group'>
                         <input type={type}
                                value={password}
                                onChange={(e) =>
                                  setPassword(e.target.value)
                                }
                                className="form-control"
                          />
                          <span className="input-group-text" onClick={handleToggle}>
                            <i className={icon}></i>
                          </span>
                          
                        </div>
                      </div>
					  {errors.password && <div className="text-danger fs-12">{errors.password}</div>}
                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                          disabled={loading}
                        >
                          {loading ? <Spinner /> : "Sign me up"}
                          
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

