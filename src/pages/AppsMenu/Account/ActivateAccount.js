import React, { Fragment, useState, useEffect, useContext } from "react";
import { Row, Card, Col, Alert ,Button,Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import axios from "axios";

// components
import { ThemeContext } from "../../../context/ThemeContext";
import PageTitle from "../../../components/PageTitle";
import LoadingScreen from "../../../components/LoadingScreen";
import swal from "sweetalert";

// actions
import { getUserProfile } from '../../../store/userProfile/userProfileActions';
import {
  getOrderDetails
} from '../../../store/account/accountActions';


// images 
import logo from '../../../images/logo.jpg';

import Constants from "../../../config/constants";

const ActivateAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // const userDetails= JSON.parse( localStorage.getItem('userDetails'));
  // const token=userDetails.token;
  // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  
    
  
  const { email } = useSelector(state => state.auth.userInfo);
	const { token } = useSelector(state => state.auth);
	
  const config = {
                    headers: {
                        'authorization': `Bearer ${token}`
                    }
  }
  
	
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

  const [basicModal, setbeviewModal] = useState(false);
  

  useEffect(() => {
    if (userProfile) {
      const _id =userProfile._id
      dispatch(getOrderDetails({ _id, token }));
    }
  }, [dispatch, userProfile]);

  const { orderDetails, loadingAccount, error } = useSelector(state => state.account);
  
  

   const initPayment = (data) => {
    
            const options = {
            key: "rzp_test_jVobFDRadQ7ruh",
            amount: data.amount,
            currency: data.currency,
            name: orderDetails.name,
            description: "Test mode",
            image: logo,
            order_id: data.id,
            handler: async (response) => {
                try {
                    const profileData = { accountStatus: true };
                    const _id = userProfile._id;

                    await axios.patch(`${Constants.url_profiles}/${_id}`, profileData, config);

                    response.userId = userProfile._id;
                    const verifyUrl = Constants.url_verify;
                    const { data } = await axios.post(verifyUrl, response, config);
                  
                    if (data) {
                      navigate('/activate-account-success');
                    }
    

                }
                catch (err) {
                console.log(err)
                }
            }
            }

            const rzp1 = new window.Razorpay(options);
            rzp1.open();

        }
        

  const handlePayment = async() => {

    const newPayment = { amount: orderDetails.amount, accountId: orderDetails.accountId, splitAmount: orderDetails.splitAmount };
    
    const { data } = await axios.post(Constants.url_orders, newPayment, config);

    initPayment(data);
    
  }


  if(loadingAccount){
   return (
			<div>
				<LoadingScreen />
				
			</div>
		)
  }
  

   else if (userProfile) {
            
        return (
          <Fragment>
            
            <PageTitle activeMenu="Activate Account" motherMenu="Account" />
            <div className="container h-100 ">
              <div className="row justify-content-center h-100 align-items-center">
                <div className="col-md-6">
                 
                  <Row>
                    {
                      orderDetails ? // check for the existance of order details
                        userProfile.accountStatus ?
                          <Row>
                            <Col xl={6} className="col-xxl-12">
                              <Card>
                                <Card.Header className="d-block">
                                  <Card.Title>Account Status</Card.Title>
                                  
                                </Card.Header>
                                <Card.Body>
                                  
                                    <Alert
                                      variant='success'
                                      className="solid alert-square"
                                    >
                                      <strong> Account is already activated for this User !!!</strong> no need to activate now.
                                    </Alert>
                                
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col xl={6} className="col-xxl-12">
                              <Card>
                                <Card.Body>
                                  <Link to="/"> Click here to go to dash board </Link>
                                </Card.Body>
                              
                              </Card>
                              
                            </Col>
                          </Row>
                          
                          :
                
                              <Card>
                                <Card.Header className="d-block">
                                  <Card.Title className="text-center">Activate Your Account</Card.Title>
                                              
                                </Card.Header>
                                <Card.Body>
                                  In order to activate your account , you need to pay &#x20b9; {orderDetails.amount}
                            
                                  <div className="pt-4 border-bottom-1 pb-3">
                                    <h4 className="text-primary mb-4 text-center">
                                      Payment Details
                          
                                    </h4>
                                  
                                    <div className="row mb-2">
                                      <div className="col-4">
                                        <h5 className="f-w-500"> Amount<span className="pull-right">:</span></h5>
                                      </div>
                                      <div className="col-4">
                                        <h5 className="f-w-500">  &#x20b9; {orderDetails.amount} </h5>
                                      </div>
                                    </div>

                                    <div className="row mb-2">
                                      <div className="col-4">
                                        <h5 className="f-w-500"> Validity of Premium Account<span className="pull-right">:</span></h5>
                                      </div>
                                      <div className="col-4">
                                        <h5 className="f-w-500">  {orderDetails.validityMonths} months </h5>
                                      </div>
                                    </div>
                                    
                                  </div>
                                  
                                </Card.Body>
                                <Card.Body>
                                  <div className="text-center">
                                    <Button className="xl-5" variant="primary" onClick={handlePayment}>
                                      Procced To Pay
                                    </Button>
                                  
                                  </div>
                                        
                                </Card.Body>
                                    
                              </Card>
                        : // code for the non existance of order details
                        <div className="text-danger text-center ">
                          Payment required to activate the account is not entered by the admin. Please wait a while or inform us.
                        </div>
                      
                    }     
                  </Row>
                    
               
                  
                </div>
              </div>
              </div>
            
            
            
                    {/* review */}
        
            </Fragment>
        );
    }
    else {
        return(
          <Fragment>
            
            <PageTitle activeMenu="Activate Account" motherMenu="Account" />
                        
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



export default  ActivateAccount ;
