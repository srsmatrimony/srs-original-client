import React, { useState ,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'

//components
import Spinner from '../components/Spinner/Spinner';
import swal from "sweetalert";

//actions
import { requestResetPassword } from '../store/auth/authActions';
import { resetAuth } from '../store/auth/authSlice';

// image
import logosrs from '../images/svg/srslogo.svg';



const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, message } = useSelector(state => state.auth);

  let errorsObj = { email: '' };

  const [errors, seterrors] = useState({ errorsObj });
  
  const [email, setemail] = useState('');

  const handleForgotPassword = (e) => {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };

    if (email === '') {
      
      errorObj.email = 'email is required';
      error = true;
    }

    seterrors(errorObj);

    if (error) {
      return
    }

    else {
     
      dispatch(requestResetPassword({ email }));
    }
  
  }
useEffect(() => {
    if (message === "success") {
      navigate('/page-password-mailsend-status');

    }
  }, [message, navigate]);
  
  const [dispError, setdispError] = useState('');

  useEffect(() => {
		if (error) {
			swal("error", error);
			setdispError(error);
			dispatch(resetAuth());

		}
  }, [dispatch, error]);


  return (
    <div className="authincation h-100 p-meddle">
      <div className="container h-100">
        {" "}
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
						<Link to="/login">
							<img src={logosrs} alt="logo" width="290" height="35" viewBox="0 0 336 41" fill="none"/>
						</Link>
                    </div>
                    <h4 className="text-center mb-4 ">Forgot Password</h4>
                    {dispError && (
                      <div className='bg-red-300 text-danger border border-red-900 p-1 my-2'>
                        {dispError}
                      </div>
                    )}
                    <form onSubmit={handleForgotPassword} className="form-validate">
                      <div className="form-group">
                        <label className="">
                          <strong>Email</strong>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter email for SRS Account"
                          value={email}
                          onChange={(e) => setemail(e.target.value)}
                        />
                        {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
                      </div>
                      <div style={{marginTop:"1rem" }}>

                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          {loading ? <Spinner /> : "SUBMIT"}

                        </button>
                      </div>
                    </form>
                    <div className="new-account mt-3">
										<p>Back to <Link className="text-primary" to="/page-login">Log in</Link></p>
										
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

export default ForgotPassword;

