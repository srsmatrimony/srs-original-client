import React from 'react';
import { Link } from "react-router-dom";
import {Card,Alert} from 'react-bootstrap'

import logosrs from '../images/svg/srslogo.svg';

const PasswordMailsendStatus = () => {
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
                    <h4 className="text-center mb-4 ">Password-reset Request Succeess</h4>

                    <Card>
                      <Card.Body>
                        <Alert
                          variant="primary"
                          className="solid alert-dismissible fade show"

                        >
                         
                            <strong> Check Your e-mail for the reset link   </strong> if it is not in the inbox , check your spam mail 
                        
                          
                        </Alert>
                        
                      </Card.Body>                     
                    </Card>
                      
                    
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordMailsendStatus
