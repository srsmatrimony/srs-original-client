import React, { Fragment, useState, useEffect, useContext } from "react";
import { Row, Card, Col, Alert ,Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';

//components
import { ThemeContext } from "../../../context/ThemeContext";
import PageTitle from "../../../components/PageTitle";
import LoadingScreen from '../../../components/LoadingScreen';
import swal from "sweetalert";

// actions

import { getUserProfile } from '../../../store/userProfile/userProfileActions';

import {
  getPaymentDetails,
  getOrderDetails
} from '../../../store/account/accountActions';


// data
import { monthdata } from "../../../data/monthdata";


const AccountStatus = () => {
  
  const dispatch = useDispatch();
  

  const [payDay, setpayDay] = useState("");
  const [payMonth, setpayMonth] = useState("");
  const [payYear, setpayYear] = useState("");

  const [dueDay, setdueDay] = useState("");
  const [dueMonth, setdueMonth] = useState("");
  const [dueYear, setdueYear] = useState("");

  const { email } = useSelector(state => state.auth.userInfo);
	const { token } = useSelector(state => state.auth);
	
  
	useEffect(() => {
    dispatch(getUserProfile({ email, token }));
    
  }, [dispatch, email, token]);
  

  const { userProfile } = useSelector(state => state.userProfile);

    
  const { 
		
		changeSideBarStyle
		
	} = useContext(ThemeContext);
	useEffect(() => {
		changeSideBarStyle({ value: "modern", label: "Modern" });
		
	},[]);

  const [reviewModal, setReviewModal] = useState(false);
 
  useEffect(() => {
    if (userProfile) {
      const _id = userProfile._id;
      dispatch(getOrderDetails({ _id, token }));
      dispatch(getPaymentDetails({ _id, token }));
    }
  }, [dispatch, userProfile, token]);
  
  const { paymentDetails,orderDetails,loadingAccount ,error} = useSelector(state => state.account);

  useEffect(() => {
    if (paymentDetails) {
      const dateOfPayment = new Date(paymentDetails.paymentDate);
      setpayDay(dateOfPayment.getDate());
      setpayMonth(dateOfPayment.getMonth());
      setpayYear(dateOfPayment.getFullYear());

      const dueDate = new Date(paymentDetails.dueDate);
      setdueDay(dueDate.getDate());
      setdueMonth(dueDate.getMonth());
      setdueYear(dueDate.getFullYear());
      
    }
  }, [paymentDetails]);
  
  useEffect(() => {
		if (error) {
			swal(error, "error");
		}
  }, [error]);
  

  if (loadingAccount) {
    return (
			<div>
				<LoadingScreen />
				
			</div>
		)
  }

  
    else if (userProfile) {
        
    
        return (
            <Fragment>
            <PageTitle activeMenu="Account Status" motherMenu="Account" />
            {
              paymentDetails ? //check for the existance of payment
                
              <div className="row m-1">
                <div className="col-xl-5 col-xxl-5 m-1">

                  <Row>
                    <Card>
                      <Card.Header className="d-block">
                        <Card.Title className="text-info text-center mb-4"> Payment Information</Card.Title>
                                  
                      </Card.Header>
                      <Card.Body>
                        <div className="profile-about-me">
                          <div className="pt-4 border-bottom-1 pb-3">
                            {/* <h4 className="text-info mb-4">
                                        Payment Information
                                        
                                    </h4> */}
                            <div className="row mb-2">
                              <div className="col-6">
                                <h5 className="f-w-500"> Amount<span className="pull-right">:</span></h5>
                              </div>
                              <div className="col-6">
                                  <span> &#x20b9; {orderDetails&&orderDetails.amount} </span>
                              </div>
                            </div>
                            <div className="row mb-2">
                              <div className="col-6">
                                <h5 className="f-w-500"> Order Id<span className="pull-right">:</span></h5>
                              </div>
                              <div className="col-6">
                                  <span> {paymentDetails.orderId} </span>
                              </div>
                            </div>
                            <div className="row mb-2">
                              <div className="col-6">
                                <h5 className="f-w-500"> Payment Id<span className="pull-right">:</span></h5>
                              </div>
                              <div className="col-6">
                                <span> {paymentDetails.paymentId} </span>
                              </div>
                            </div>
                            <div className="row mb-2">
                              <div className="col-6">
                                <h5 className="f-w-500"> Payment Date <span className="pull-right">:</span></h5>
                              </div>
                              <div className="col-6">
                                  <span>{payDay} - {monthdata[payMonth]} - {payYear}</span>
                              </div>
                            </div>
                                    
                          </div>

                        </div>

                      </Card.Body>
                      
                    </Card>
                  </Row>
                    
                        
                </div>
                <div className="col-xl-5 col-xxl-5 m-1">
                  <Row>
                  
                    <Card>
                      <Card.Header className="d-block">
                        <Card.Title className="text-info text-center mb-4"> Account Information</Card.Title>
                      </Card.Header>
                    
                      <Card.Body>
                        <div className="profile-about-me">
                          <div className="pt-4 border-bottom-1 pb-3">
                            {/* <h4 className="text-info mb-4">
                                        Payment Information
                                        
                                    </h4> */}
                            <div className="row mb-2">
                              <div className="col-6">
                                <h5 className="f-w-500"> Status<span className="pull-right">:</span></h5>
                              </div>
                              <div className="col-6">
                                <span> Activated </span>
                              </div>
                            </div>
                            <div className="row mb-2">
                              <div className="col-6">
                                <h5 className="f-w-500"> Account Type<span className="pull-right">:</span></h5>
                              </div>
                              <div className="col-6">
                                <span> {'Premium'} </span>
                              </div>
                            </div>
                            <div className="row mb-2">
                              <div className="col-6">
                                <h5 className="f-w-500"> Validity<span className="pull-right">:</span></h5>
                              </div>
                              <div className="col-6">
                                  <span> {orderDetails&&orderDetails.validityMonths} Months</span>
                              </div>
                            </div>
                            <div className="row mb-2">
                              <div className="col-6">
                                <h5 className="f-w-500"> Account Expires On <span className="pull-right">:</span></h5>
                              </div>
                              <div className="col-6">
                                  <span>{dueDay} - {monthdata[dueMonth]} - {dueYear}</span>
                              </div>
                            </div>
                                    
                          </div>

                        </div>

                      </Card.Body>
                                  
                    
                    </Card>
                  </Row>
                </div>
                </div>
                :
                <Row>
                          <Col xl={6} className="col-xxl-12">
                              <Card>
                                <Card.Header className="d-block">
                                  <Card.Title>Account Status</Card.Title>
                                  
                                </Card.Header>
                                <Card.Body>
                                  
                                    <Alert
                                      variant='warning'
                                      className="solid alert-square"
                                    >
                                      <strong> Account is not activated for this User !!!</strong> please activate now using given link.
                                    </Alert>
                                
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col xl={6} className="col-xxl-12">
                              <Card>
                                <Card.Body>
                                  <Link to="/activate-account"> Click here to activate </Link>
                                </Card.Body>
                              
                              </Card>
                              
                            </Col>
                          </Row>

            }
          
             
        
            </Fragment>
        );
    }
    else {
        return(
          <Fragment>
            
            <PageTitle activeMenu="Account Status" motherMenu="Account" />
                        
            <Row>
              
                      <Col xl={6} className="col-xxl-12">
                          <Card>
                            <Card.Header className="d-block">
                              <Card.Title>Profile Status</Card.Title>
                              
                            </Card.Header>
                            <Card.Body>
                              
                                <Alert
                                  variant='danger'
                                  className="solid alert-square"
                                >
                                  <strong> profile not found !!!</strong> Please Fill up Your Profile.
                                </Alert>
                            
                            </Card.Body>
                          </Card>
                        </Col>
                    <Col xl={6} className="col-xxl-12">
                      <Card>
                        <Card.Body>
                          <Link to="/form-add-basic-profile"> Click Here to Fill up Profile </Link>
                        </Card.Body>
                      
                      </Card>
                      
                    </Col>
            </Row>
            
            
                        </Fragment>
                      )
    }
};



export default  AccountStatus ;
