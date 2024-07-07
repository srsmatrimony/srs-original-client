import React from "react";
import { Link } from "react-router-dom";
import {Card,Alert} from 'react-bootstrap'

import logosrs from '../images/svg/srslogo.svg'; 

function RegisterSuccessNext() {
  
   
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
						<Link to="/dashboard">
                            <img src={logosrs} alt="logo" width="290" height="35" viewBox="0 0 336 41" fill="none" />                  
						</Link>
                    </div>
                    <h4 className="text-center mb-4 ">Registration Success</h4>

                    <Card>
                      <Card.Body>
                        <Alert
                          variant="success"
                          className="solid alert-dismissible fade show"

                        >
                          <Link to="/dashboard" style={{"textDecoration":"none","color":"white"}}>
                            <strong> Your Registration is successful  </strong> . please login again
                          </Link>
                          
                        </Alert>
                        
                      </Card.Body>                     
                    </Card>
                      
                    
                    
                    <div className="new-account mt-3">
                      <p className="">
                        Please Click{" "}
                        <Link className="text-primary" to="/dashboard">
                          Log in
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



export default RegisterSuccessNext;

