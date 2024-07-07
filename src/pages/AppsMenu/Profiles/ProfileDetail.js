import React, { Fragment,useState ,useEffect,useContext } from "react";
import { Button, Modal, Nav, Tab,Row, Card, Col, Alert,Badge } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import defaultProfilePic from '../../../images/avatar/defaultProfilePic.png';


//components
import PageTitle from "../../../components/PageTitle";
import { ThemeContext } from "../../../context/ThemeContext";
import LoadingScreen from "../../../components/LoadingScreen";
import Spinner from '../../../components/Spinner/Spinner';
import swal from "sweetalert";

//actions
import { getUserProfile } from '../../../store/userProfile/userProfileActions';
import { getSelectedProfile } from '../../../store/selectedProfile/selectedProfileActions';
import {
	getInterest,
	addInterest,
	deleteInterest,
	acceptInterest,
	rejectInterest
} from '../../../store/interests/interestActions';
import { validateAccount } from '../../../store/account/accountActions';

// reset actions

import { resetInterest } from '../../../store/interests/interestSlice';
import { resetSelectedProfile } from '../../../store/selectedProfile/selectedProfileSlice';
import { resetProfiles } from '../../../store/profiles/profileSlice';

// data

import { monthdata } from "../../../data/monthdata";


const ProfileDetail = () => {

	const dispatch = useDispatch();

	
    const { 
		changeSideBarStyle
		
	} = useContext(ThemeContext);
	useEffect(() => {
		changeSideBarStyle({ value: "modern", label: "Modern" });
	},[]);

	
	const { email } = useSelector(state => state.auth.userInfo);
	const { token } = useSelector(state => state.auth);
	
	
	useEffect(() => {
		dispatch(getUserProfile({ email, token }));
		
  }, [dispatch, email, token]);

	const [reviewToggle, setReviewToggle] = useState(false);
	const [activeTab, setActiveTab] = useState('0');
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const {id} =useParams();
	
	useEffect(() => {
		dispatch(getSelectedProfile({ id, token }));
	}, [dispatch, id, token]);
	
	

	const { selectedProfile ,loading} = useSelector(state => state.selectedProfile);
	const { userProfile } = useSelector(state => state.userProfile);

	useEffect(() => {
		if (userProfile && selectedProfile) {
			const userId = userProfile._id;
			const selectedProfileId = selectedProfile._id;
			dispatch(getInterest({ userId, selectedProfileId, token }));

		}
	}, [dispatch, selectedProfile, userProfile, token]);
	
	
	const { interest ,loadingInterest ,error } = useSelector(state => state.interest);
	

	const [activeToggle, setActiveToggle] = useState("basicProfile");
	const [rejectInterestModal, setrejectInterestModal] = useState(false);


	const handleSendInterest=()=>{
		
		const newIneterest = {
			sender: userProfile._id,
			receiver: selectedProfile._id,
			status:"active"
		}

		dispatch(addInterest({ newIneterest, token }));

	}

	const handleDeleteInterest=()=>{
		const _id = interest._id;
		dispatch(deleteInterest({ _id, token }));

	}
	const handleAcceptInterest=()=>{
		const _id = interest._id;
		dispatch(acceptInterest({ _id, token }));

	}

	const handleRejectInterest=()=>{
		setrejectInterestModal(false);
		const _id = interest._id;
		dispatch(rejectInterest({ _id, token }));
		
	}

	useEffect(() => {
		if (error) {
			swal(error, "error");
		}
	}, [error]);

	useEffect(() => {
		if (userProfile) {
			const _id = userProfile._id;
			dispatch(validateAccount({ _id, token }));
		}
	}, [dispatch, userProfile, token]);
  

	useEffect(() => {
		return (
			() => {
				dispatch(resetInterest())
				dispatch(resetSelectedProfile())
				dispatch(resetProfiles())
			}
		)

	}, [dispatch]);


	if (loading) {
		return(
		<div>
			<LoadingScreen/>
			</div>
		)

	}
	else if (!userProfile) {
		return(
		<Fragment>
                          <PageTitle activeMenu="Basic" motherMenu="Profile" />
                          
                          <Row>
                          <Col xl={6} className="col-xxl-12">
                              <Card>
                                <Card.Header className="d-block">
                                  <Card.Title>Profile Status</Card.Title>
                                  
                                </Card.Header>
                                <Card.Body>
                                  
                                    <Alert
                                      variant='info'
                                      className="solid alert-square"
                                    >
                                      <strong> User is not associated with any profile !!!</strong> Please Fill Up your Profile if you like.
                                    </Alert>
                                
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col xl={6} className="col-xxl-12">
                              <Card>
                                <Card.Body>
                                  <Link to="/form-add-basic-profile"> Click Here to Fill Up your  Profile </Link>
                                </Card.Body>
                              
                              </Card>
                              
                            </Col>
                          </Row>
		</Fragment>
		)

	}

	else if (selectedProfile) {
		
		const {firstName,lastName,email,dob,religion,caste,height,weight,bloodGroup,bodytype,complexion,languages,mothertongue,
			physicalStatus, advanceProfileStatus, profilePic, image1, image2 } = selectedProfile;
		const dateOfBirth=new Date(dob);
		const dobDay = dateOfBirth.getDate();
		const dobMonth = dateOfBirth.getMonth();
		const dobYear = dateOfBirth.getFullYear();
		
		const { aboutMe, countryLiving, currentLocation, occupation, annualIncome, nativePlace, diet, smoking, drinking, family, education, residential, contact } = selectedProfile;
		
		
	 
		return (
			<>
				<PageTitle motherMenu="Profile" activeMenu=" Details" />
				{
					userProfile.accountStatus ?
						
					<div className="row">
				
						<div className="col-lg-12">
							<div className="card">
								<div className="card-body">
									<div className="row">
										<div className="col-xl-3 col-lg-6  col-md-6 col-xxl-5 ">
						
											<div className="col-lg-10">
												<div className="card">
													<div className="card-body">
														<div className="profile-statistics">
															{
																loadingInterest ?
																	<div className="text-center">
																		<h3 className="text-black">Status </h3>
																		<LoadingScreen />
																	
																	</div>
																	:
																	interest ?
																		interest.status === "active" ?
																			interest.sender === userProfile._id ? // you are sender
																				<div className="text-center">
																					<h3 className="text-black">Delete Your Interest</h3>
																					<p>
																						You have already sent interest to this profile. You can delete your interest if you like
																					</p>
																						
																					<button className="btn btn-secondary me-2" onClick={handleDeleteInterest}>
																					
																						<span className="me-2"> <i className="fa fa-trash" /> </span> {loadingInterest ? <Spinner /> : "Delete"}
																					</button>
																				</div>
																					
																				:   // you are receiver 
																				<div className="text-center">
																					<h3 className="text-black">Received an Interest</h3>
																			
																					<p>
																						You have received an interest from this profile. You can accept interest if you like or tou can reject
																					</p>
																									
																					<button className="btn btn-success me-2" onClick={handleAcceptInterest}>
																								
																						<span className="me-2"> <i className="fa fa-thumbs-up" /> </span> {loadingInterest ? <Spinner /> : "Accept"}
																					</button>
																					<button className="btn btn-danger me-2" onClick={() => setrejectInterestModal(true)}>
																						<span className="me-2"> <i className="fa fa-thumbs-down" /> </span> {loadingInterest ? <Spinner /> : "Reject"}
																					</button>
																					<Modal className="fade" show={rejectInterestModal}>
																						<Modal.Header>
																							<Modal.Title>Are You Sure You want to reject this Profile</Modal.Title>
																							<Button
																								variant=""
																								className="btn-close"
																								onClick={() => setrejectInterestModal(false)}
																							>
																									
																							</Button>
																						</Modal.Header>
																						<Modal.Body> Once you reject this profile , it will never appear again</Modal.Body>
																						<Modal.Footer>
																							<Button
																								onClick={() => setrejectInterestModal(false)}
																								variant="danger light"
																							>
																								Close
																							</Button>
																							<Button variant="primary"
																								onClick={handleRejectInterest}
																							>
																								Delete
																							</Button>
																						</Modal.Footer>
																					</Modal>
																				</div>
																		
																				
																			: interest.status === "accept" ? // interest is accepted
																			
																				<div className="text-center">
																					<h3 className="text-success">Mutually Interested</h3>
																					<p>
																						Now both you and the user are interested. You can still delete Interest.
																					</p>
																					<button className="btn btn-secondary me-2" onClick={handleDeleteInterest}>
																						<span className="me-2"> <i className="fa fa-trash" /> </span>
																						{loadingInterest ? <Spinner /> : "Delete"}
																					</button>
																				</div>
																			
																				: // interest is rejected

																				<div className="text-center">
																					<h3 className="text-danger">Interest is Rejected</h3>
																					<p>
																						The Interest is rejected by You or the User. You cannot perform any actvities further
																					</p>


																					{/* <button className="btn btn-secondary me-2" onClick={handleDeleteInterest}>													
																					<span className="me-2"> <i className="fa fa-trash" /> </span>
																					{loadingInterest ? <Spinner /> : "Delete"}			
																				</button> */}
																				</div>
																		: // no active interest ... profile is fresh
																		<div className="text-center">
																			<h3 className="text-black">Send Interest To this Profile</h3>
																			<p>
																				This profile is new. You can send interest to this profile if you wish.
																			</p>
																				
																			<button className="btn btn-primary me-2" onClick={handleSendInterest}>
																				<span className="me-2"> <i className="fa fa-thumbs-up" /> </span> {loadingInterest ? <Spinner /> : "Send"}
																			</button>
																		</div>
															
															
															}
							
														</div>
													</div>
												</div>
											</div>
											{/* Tab panes */}
											<Tab.Container defaultActiveKey="first">
												<Tab.Content>
													<Tab.Pane eventKey="first">
														<img className="img-fluid rounded" src={profilePic || defaultProfilePic} alt="Profile Pic" style={{ width: "400px", height: "500px", objectFit: "cover" }} />
													</Tab.Pane>
												</Tab.Content>
												<div className="tab-slide-content new-arrival-product mb-4 mb-xl-0">
													{/* Nav tabs */}
													{/* <Nav as="ul" className="nav slide-item-list mt-3" role="tablist">
													<Nav.Item as="li">
														<Nav.Link as="a" eventKey="first" to="#first">
															<img className="img-fluid" src={profilePic||defaultProfilePic} alt="" width={50} height={25} />
														</Nav.Link>
													</Nav.Item>
													<Nav.Item as="li">
														<Nav.Link as="a" eventKey="second" to="#second">
															<img className="img-fluid" src={image1||defaultProfilePic} alt="" width={50} height={25} />
														</Nav.Link>
													</Nav.Item>
													<Nav.Item as="li">
														<Nav.Link as="a" eventKey="third" to="#third">
															<img className="img-fluid" src={image2||defaultProfilePic} alt="" width={50} height={25} />
														</Nav.Link>
													</Nav.Item>
									
												</Nav> */}
												</div>
											</Tab.Container>
										</div>
										{/*Tab slider End*/}
										<div className="col-xl-6">
											<div className="card">
												<div className="card-body">
													<div className="profile-tab">
														<div className="custom-tab-1">
															<ul className="nav nav-tabs">
							
																<li className="nav-item" onClick={() => setActiveToggle("basicProfile")}>
																	<Link to="#basic-profile" data-toggle="tab" className={`nav-link ${activeToggle === "basicProfile" ? "active show" : ""}`}>Basic Profile</Link>
																</li>
																<li className="nav-item" onClick={() => setActiveToggle("advancedInfo")}>
																	<Link to="#advanced-info" data-toggle="tab" className={`nav-link ${activeToggle === "advancedInfo" ? "active show" : ""}`}>Advanced Info</Link>
																</li>
																<li className="nav-item" onClick={() => setActiveToggle("photos")}>
																	<Link to="#my-posts" data-toggle="tab" className={`nav-link ${activeToggle === "photos" ? "active show" : ""}`}>Photos </Link>
																</li>
							
							
															</ul>
															<div className="tab-content">
																<div id="basicProfile" className={`tab-pane fade ${activeToggle === "basicProfile" ? "active show" : ""}`}>
																	<div className="profile-about-me">
																		<div className="pt-4 border-bottom-1 pb-3">
																			<h4 className="text-primary mb-4">
																				Personal Information
																			</h4>
																			<div className="row mb-2">
																				<div className="col-3">
																					<h5 className="f-w-500"> Name<span className="pull-right">:</span></h5>
																				</div>
																				<div className="col-9">
																					<span>{firstName} &nbsp; {lastName}</span>
																				</div>
																			</div>
																			<div className="row mb-2">
																				<div className="col-3">
																					<h5 className="f-w-500">Email<span className="pull-right">:</span></h5>
																				</div>
																				<div className="col-9">
																					<span>{email}</span>
																				</div>
																			</div>
																			<div className="row mb-2">
																				<div className="col-3">
																					<h5 className="f-w-500">  Date of Birth <span className="pull-right">:</span></h5>
																				</div>
																				<div className="col-9">
																					<span>{dobDay} - {monthdata[dobMonth]} - {dobYear}</span>
																				</div>
																			</div>
																			<div className="row mb-2">
																				<div className="col-3">
																					<h5 className="f-w-500"> Religion <span className="pull-right">:</span></h5>
																				</div>
																				<div className="col-9">
																					<span>{religion}</span>
																				</div>
																			</div>
																			<div className="row mb-2">
																				<div className="col-3">
																					<h5 className="f-w-500">  Caste <span className="pull-right">:</span></h5>
																				</div>
																				<div className="col-9">
																					<span>{caste}</span>
																				</div>
																			</div>
																		</div>
							
							
																		<div className="pt-4 border-bottom-1 pb-3">
																			<h4 className="text-primary mb-4">
																				Physical Info
																			</h4>
																			<div className="row mb-2">
																				<div className="col-3">
																					<h5 className="f-w-500"> Height<span className="pull-right">:</span></h5>
																				</div>
																				<div className="col-9">
																					<span>{height} cm </span>
																				</div>
																			</div>
																			<div className="row mb-2">
																				<div className="col-3">
																					<h5 className="f-w-500"> Weight <span className="pull-right">:</span></h5>
																				</div>
																				<div className="col-9">
																					<span>{weight} kg</span>
																				</div>
																			</div>
																			<div className="row mb-2">
																				<div className="col-3">
																					<h5 className="f-w-500">  Complexion <span className="pull-right">:</span></h5>
																				</div>
																				<div className="col-9">
																					<span>{complexion}</span>
																				</div>
																			</div>
																			<div className="row mb-2">
																				<div className="col-3">
																					<h5 className="f-w-500"> Body Type <span className="pull-right">:</span></h5>
																				</div>
																				<div className="col-9">
																					<span>{bodytype}</span>
																				</div>
																			</div>
																			<div className="row mb-2">
																				<div className="col-3">
																					<h5 className="f-w-500">  Physical Status <span className="pull-right">:</span></h5>
																				</div>
																				<div className="col-9">
																					<span>{physicalStatus}</span>
																				</div>
																			</div>
																			<div className="row mb-2">
																				<div className="col-3">
																					<h5 className="f-w-500">  Blood Group <span className="pull-right">:</span></h5>
																				</div>
																				<div className="col-9">
																					<span>{bloodGroup}</span>
																				</div>
																			</div>
																		</div>
																		<div className="profile-lang  mb-5">
																			<div className="pt-4 border-bottom-1 pb-3">
																				<h4 className="text-primary mb-2">Language Details</h4>
																				<div className="row mb-2">
																					<div className="col-3">
																						<h5 className="f-w-500">  Mothertongue  <span className="pull-right">:</span></h5>
																					</div>
																					<div className="col-9">
																						<span>{mothertongue}</span>
																					</div>
																				</div>
																				<div className="row mb-2">
																					<div className="col-3">
																						<h5 className="f-w-500"> Languages Known <span className="pull-right">:</span></h5>
																					</div>
																					<div className="col-9">
																						{languages && languages.map((language) => <span key={language}> {language} , </span>)}
												
																					</div>
											
																				</div>
																			</div>
																		</div>
																	</div>
						
																</div>
						
						
																<div id="advanced-info" className={`tab-pane fade ${activeToggle === "advancedInfo" ? "active show" : ""}`}>
																	{
																		advanceProfileStatus ?
																			<div>
																			
								
																				<div className="profile-about-me">
																					<div className="pt-4 border-bottom-1 pb-3">
																						<h4 className="text-primary">About Me</h4>
																						<p className="mb-2">
																							{aboutMe}
																						</p>
											
																					</div>
																				</div>
									
									
																				<div className="profile-about-me">
																					<div className="pt-4 border-bottom-1 pb-3">
																						<h4 className="text-primary mb-4">
																							More Info About The Profile
																						</h4>
																						<div className="row mb-2">
																							<div className="col-4">
																								<h5 className="f-w-500"> Country Of Living<span className="pull-right">:</span></h5>
																							</div>
																							<div className="col-8">
																								<span>{countryLiving}</span>
																							</div>
																						</div>
																						<div className="row mb-2">
																							<div className="col-4">
																								<h5 className="f-w-500">Place Of Birth <span className="pull-right">:</span></h5>
																							</div>
																							<div className="col-8">
																								<span>{nativePlace}</span>
																							</div>
																						</div>
																						<div className="row mb-2">
																							<div className="col-4">
																								<h5 className="f-w-500">  Current Location <span className="pull-right">:</span></h5>
																							</div>
																							<div className="col-8">
																								<span>{currentLocation}</span>
																							</div>
																						</div>
																						<div className="row mb-2">
																							<div className="col-4">
																								<h5 className="f-w-500">Diet<span className="pull-right">:</span></h5>
																							</div>
																							<div className="col-8">
																								<span>{diet}</span>
																							</div>
																						</div>
																						<div className="row mb-2">
																							<div className="col-4">
																								<h5 className="f-w-500">  Smoking <span className="pull-right">:</span></h5>
																							</div>
																							<div className="col-8">
																								<span>{smoking ? 'Yes' : 'No'}</span>
																							</div>
																						</div>
																						<div className="row mb-2">
																							<div className="col-4">
																								<h5 className="f-w-500">Drinking<span className="pull-right">:</span></h5>
																							</div>
																							<div className="col-8">
																								<span>{drinking}</span>
																							</div>
																						</div>
																					</div>
																				</div>
																				<div className="profile-about-me">
																					<div className="pt-4 border-bottom-1 pb-3">
																						<h4 className="text-primary mb-4">
																							Occupation and Family Details
																						</h4>
																						<div className="row mb-2">
																							<div className="col-4">
																								<h5 className="f-w-500"> Occupation <span className="pull-right">:</span></h5>
																							</div>
																							<div className="col-8">
																								<span>{occupation}</span>
																							</div>
																						</div>
																						<div className="row mb-2">
																							<div className="col-4">
																								<h5 className="f-w-500">Annual Income <span className="pull-right">:</span></h5>
																							</div>
																							<div className="col-8">
																								<span>Rs. {annualIncome}/- </span>
																							</div>
																						</div>
																						<div className="row mb-2">
																							<div className="col-4">
																								<h5 className="f-w-500">  About My Family <span className="pull-right">:</span></h5>
																							</div>
																							<div className="col-8">
																								<span>{family.aboutMyFamily}</span>
																							</div>
																						</div>
																						<div className="row mb-2">
																							<div className="col-4">
																								<h5 className="f-w-500">Father's Occupation<span className="pull-right">:</span></h5>
																							</div>
																							<div className="col-8">
																								<span>{family.occupationFather}</span>
																							</div>
																						</div>
																						<div className="row mb-2">
																							<div className="col-4">
																								<h5 className="f-w-500">  Mother's Occupation <span className="pull-right">:</span></h5>
																							</div>
																							<div className="col-8">
																								<span>{family.occupationMother}</span>
																							</div>
																						</div>
																					</div>
																				</div>
																				<div className="profile-about-me">
																					<div className="pt-4 border-bottom-1 pb-3">
																						<h4 className="text-primary mb-4">
																							Educational Details
																						</h4>
																						<div className="row mb-2">
																							<div className="col-4">
																								<h5 className="f-w-500"> Highest Education<span className="pull-right">:</span></h5>
																							</div>
																							<div className="col-8">
																								<span>{education.course}</span>
																							</div>
																						</div>
																						<div className="row mb-2">
																							<div className="col-4">
																								<h5 className="f-w-500">Corresponding Discipline<span className="pull-right">:</span></h5>
																							</div>
																							<div className="col-8">
																								<span>{education.discipline} </span>
																							</div>
																						</div>
										
																					</div>
																				</div>
																				<div className="profile-about-me">
																					<div className="pt-4 border-bottom-1 pb-3">
																						<h4 className="text-primary mb-4">
																							Contact Information
																						</h4>
																						<div className="row mb-2">
																							<div className="col-4">
																								<h5 className="f-w-500"> Residential Address<span className="pull-right">:</span></h5>
																							</div>
																							<div className="col-8">
																								<span>{residential}</span>
																							</div>
																						</div>
																						<div className="row mb-2">
																							<div className="col-4">
																								<h5 className="f-w-500">Contact Number <span className="pull-right">:</span></h5>
																							</div>
																							<div className="col-8">
																								<span>{contact.contact1} </span>
																							</div>
																						</div>
																						<div className="row mb-2">
																							<div className="col-4">
																								<h5 className="f-w-500">Additional Contact Number <span className="pull-right">:</span></h5>
																							</div>
																							<div className="col-8">
																								<span>{contact.contact2} </span>
																							</div>
																						</div>
										
																					</div>
																				</div>
  									
																			</div>
																			: <div>
																				<Row>
																					<Col xl={6} className="col-xxl-12">
																						<Card>
																							<Card.Header className="d-block">
																								<Card.Title>Profile Status</Card.Title>
											
																							</Card.Header>
																							<Card.Body>
											
																								<Alert
																									variant='info'
																									className="solid alert-square"
																								>
																									<strong> This User is Not Associated with Advance Info !!!</strong>
																								</Alert>
											
																							</Card.Body>
																						</Card>
																					</Col>
										
																				</Row>
																			</div>
																	}
																</div>
																<div id="my-posts" className={`tab-pane fade ${activeToggle === "photos" ? "active show" : ""}`} >
																	<div className="my-post-content pt-3">
																		<div className="profile-uoloaded-post border-bottom-1 pb-5">
																			<img src={profilePic || defaultProfilePic} alt="" className="img-fluid w-80 rounded" />
																					
																			<Link className="post-title" to="/post-details">
																				<h3 className="text-black">This is the profile pic</h3>
																			</Link>
																			<p>
																				Here you can see the  profile picture which appears in the selected profile. If the profile Pic is not added by this user, you will see a default pic in this place.
																						
																			</p>
																	
																			
																		</div>
																		<div className="profile-uoloaded-post border-bottom-1 pb-5">
																			<img src={image1 || defaultProfilePic} alt="" className="img-fluid w-80 rounded" />
																			<Link className="post-title" to="/post-details">
																				<h3 className="text-black">The second picture of the profile</h3>
																			</Link>
																			<p>
																				Here you can see a picture of the selected Profile. If any picture is not added by this user, you will see a default pic in this place.
																						
																			</p>

																	
														
																	
																		</div>
																		<div className="profile-uoloaded-post pb-3">
																			<img src={image2 || defaultProfilePic} alt="" className="img-fluid  w-80 rounded" />
																			<Link className="post-title" to="/post-details">
																				<h3 className="text-black">The Third picture</h3>
																			</Link>
																			<p>
																				Here you see  another picture which appears in this  profile. If any picture is not added by this user, you will see a default pic in this place.
																			</p>
														
																		

												
												  
																		
																
																		</div>
																		{/* Modal */}
																	
																	</div>
																</div>
						
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

                
									</div>
								</div>
							</div>
						</div>
						{/* review */}
        
						</div>
						:
						<Row>
							<Col xl={6} className="col-xxl-12">
								<Card>
									
									<Link to="/activate-account">			
										<Card.Header className="d-block">
											<Card.Title>Status</Card.Title>
											
										</Card.Header>
										<Card.Body>
											
											<Alert
												variant='warning'
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


			</>
		);
	}
	else {
		
		return (
			<Fragment>
			<PageTitle activeMenu="Profile" motherMenu="App" />
			
			<Row>
			<Col xl={6} className="col-xxl-12">
          <Card>
            <Card.Header className="d-block">
              <Card.Title>Profile Status</Card.Title>
              
            </Card.Header>
            <Card.Body>
              
                <Alert
                  variant='warning'
                  className="solid alert-square"
                >
                  <strong> profile not found !!!</strong> This User is not associated with any Profile.
                </Alert>
            
            </Card.Body>
          </Card>
        </Col>
		
			</Row>
		</Fragment>
		)
}
};



export default ProfileDetail ;
