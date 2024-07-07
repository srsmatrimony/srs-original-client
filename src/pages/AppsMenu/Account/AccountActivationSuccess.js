import React,{ useEffect ,Fragment } from 'react';
import { Card, Alert, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';

// components
import LoadingScreen from '../../../components/LoadingScreen';
import PageTitle from '../../../components/PageTitle';
import swal from 'sweetalert';

//actions
import { getUserProfile } from '../../../store/userProfile/userProfileActions';

const AccountActivationSuccess = () => {

  const dispatch = useDispatch();

  const { email } = useSelector(state => state.auth.userInfo);
  const { token } = useSelector(state => state.auth);
	
	useEffect(() => {
    dispatch(getUserProfile({ email, token }));
    

  }, [dispatch, email]);
  

  const { userProfile, loading, error } = useSelector(state => state.userProfile);
  useEffect(() => {
		if (error) {
			swal(error, "error");
		}
  }, [error]);
  

  if (loading) {
    return (
      <div>
        <LoadingScreen />
      </div>
      
    )
  }
  else if (userProfile) {
    return (
      <div>
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
                  <strong> Your Account is activated successfully !!!</strong> .
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
          
      </div>
    )
  }
  else {
    return (
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
}

export default AccountActivationSuccess
