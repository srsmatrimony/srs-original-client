import React, { Fragment, useState ,useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Modal,Row, Card, Col, Alert,Badge, Media} from "react-bootstrap";
import { useSelector,useDispatch} from "react-redux";

// components
import { ThemeContext } from "../../../../context/ThemeContext";
import PageTitle from "../../../../components/PageTitle";
import SingleProfileList from "../../../../components/SingleProfileList";
import LoadingScreen from "../../../../components/LoadingScreen";
import swal from "sweetalert";

// actions
import { getUserProfile } from '../../../../store/userProfile/userProfileActions';
import { getMatchingProfiles } from '../../../../store/profiles/profileActions';
import { resetProfiles } from '../../../../store/profiles/profileSlice';
import { validateAccount } from '../../../../store/account/accountActions';



const ProfilesSearch = () => {
  
    const dispatch = useDispatch();
    
    const queryParameters = new URLSearchParams(window.location.search);
    const search = queryParameters.get("search");

    
//   const userDetails = useSelector(state => state.auth.user);

  const { email } = useSelector(state => state.auth.userInfo);
  const { token } = useSelector(state => state.auth);
	
	useEffect(() => {
    dispatch(getUserProfile({ email, token }));
    
  }, [dispatch, email, token]);
  
  
  
  const { userProfile} = useSelector(state => state.userProfile);
  
  
  const { 
		changeSideBarStyle
		
	} = useContext(ThemeContext);
	useEffect(() => {
		changeSideBarStyle({ value: "modern", label: "Modern" });
	},[]);

    const [reviewModal, setReviewModal] = useState(false);
    const [searchedProfiles, setsearchedProfiles] = useState([]);

  useEffect(() => {
    if (userProfile) {
      const _id = userProfile._id;
      dispatch(getMatchingProfiles({ _id, token }));
    
    }
    

  }, [dispatch, userProfile, token]);
  
  const { matchingProfiles, loading } = useSelector(state => state.profiles);
  

  useEffect(() => {
		if (userProfile) {
			const _id = userProfile._id;
      dispatch(validateAccount({ _id, token }));
		}
  }, [dispatch, userProfile, token]);
  
  
    useEffect(() => {
        if (matchingProfiles) {
            const searchedResult = matchingProfiles.filter(profile =>
                profile.firstName.toLowerCase().includes(search.toLowerCase())
            )
            
            setsearchedProfiles(searchedResult);

        }
    }, [matchingProfiles, search]);
    
  
  useEffect(() => {
    return () => dispatch(resetProfiles())
  }, [dispatch]);
  
    
  if (loading) {
    return(
      <div>
        <LoadingScreen />
      </div>
      
		)
  }

  else if (userProfile) {
  
    return (
      <Fragment>
            <PageTitle activeMenu="Search Results" motherMenu="Profiles" />
            <h1 className="text-center">Go To Dashboard To Search Again</h1>
        {
          userProfile.accountStatus ? // check if account is activated
            
          <div className="row">
            {searchedProfiles.length !== 0 ? searchedProfiles.map((profile) => <SingleProfileList key={profile._id} profile={profile} />) :                
              <div className="text-danger text-center ">
                    No profiles found. please make sure that you typed the First Name of the profile correctly. 

                    go to dashboard for search again.            
              </div>
            }

            {/* review */}
        
            </div>
            :
            <Row>
                <Col xl={6} className="col-xxl-12">
                <Card>
                <Link to="/form-add-basic-profile">			
                      <Card.Header className="d-block">
                        <Card.Title>Status</Card.Title>
                        
                      </Card.Header>
                      <Card.Body>
                        
                          <Alert
                            variant='primary'
                            className="solid alert-square"
                          >
                            <strong> You dont have access to this page !!!</strong> Please Activate your Premium Account
                          </Alert>
                      
                  </Card.Body>
                </Link>				
                    </Card>
                  </Col>
              <Col xl={6} className="col-xxl-12">
                <Card>
                  <Card.Body>
                    <Link to="/activate-account"> Click Here to Activate Account </Link>
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
			<PageTitle activeMenu="Profile" motherMenu="App" />
			
			<Row>
			<Col xl={6} className="col-xxl-12">
			<Card>
			<Link to="/form-add-basic-profile">			
            <Card.Header className="d-block">
              <Card.Title>Profile Status</Card.Title>
              
            </Card.Header>
            <Card.Body>
              
                <Alert
                  variant='primary'
                  className="solid alert-square"
                >
                  <strong> You dont have a profile !!!</strong> Please Fill up Your Profile first.
                </Alert>
            
				</Card.Body>
			</Link>				
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



export default  ProfilesSearch ;

