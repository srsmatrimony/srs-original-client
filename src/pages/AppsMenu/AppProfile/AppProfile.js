import React, { Fragment, useEffect, useState, useContext} from "react";
import { Button, Dropdown, Modal,Row, Card, Col, Alert} from "react-bootstrap";
import { Link} from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import Compress from 'react-image-file-resizer';

import { ThemeContext } from "../../../context/ThemeContext";

// components
import LoadingScreen from '../../../components/LoadingScreen';
import swal from "sweetalert";

// import url

// import action
import {
	getUserProfile,
	updateProfilePic,
	deleteProfilePic,
	updateImage1,
	deleteImage1,
	updateImage2,
	deleteImage2,
	deleteUserProfile

} from '../../../store/userProfile/userProfileActions';


//** Import Image */
import profile01 from "../../../images/profile/1.jpg";
import profile02 from "../../../images/profile/2.jpg";
import profile03 from "../../../images/profile/3.jpg";
import profile04 from "../../../images/profile/4.jpg";
import profile05 from "../../../images/profile/5.jpg";
import profile06 from "../../../images/profile/6.jpg";
import profile07 from "../../../images/profile/7.jpg";


import defaultProfile from "../../../images/avatar/defaultProfilePic.png";
import PageTitle from "../../../components/PageTitle";

// data

import { monthdata } from '../../../data/monthdata';

const AppProfile = () => {

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
	

	const { userProfile, loading, error} = useSelector(state => state.userProfile);
	
	useEffect(() => {
		if (error) {
			swal(error, "error");
		}
	}, [error]);
	
	
  const [activeToggle, setActiveToggle] = useState("basicProfile");
  const [sendMessage, setSendMessage] = useState(false);
  const [replayModal, setReplayModal] = useState(false);

	const [currentProfilePic, setcurrentProfilePic] = useState('');
	const [currentImage1, setcurrentImage1] = useState('');
	const [currentImage2, setcurrentImage2] = useState('');

  	
	const [basicModal, setBasicModal] = useState(false);
	const [deleteProfilePicModal, setdeleteProfilePicModal] = useState(false);
	const [deleteImage1Modal, setdeleteImage1Modal] = useState(false);
	const [deleteImage2Modal, setdeleteImage2Modal] = useState(false);



	const handleDelete = () => {
		setBasicModal(false);
		const _id = userProfile._id;
		dispatch(deleteUserProfile({ _id, token }));

	}
	
	const handleDeleteProfilePic = () => {
		
		const _id = userProfile._id;
		setdeleteProfilePicModal(false);

		dispatch(deleteProfilePic({ _id, token }));
		
	}

	const handleDeleteImage1 = () => {
		
		const _id = userProfile._id;
		setdeleteImage1Modal(false);

		dispatch(deleteImage1({ _id, token }));
		
	}

   const handleDeleteImage2 = () => {
		
		const _id = userProfile._id;
		setdeleteImage2Modal(false);

	   dispatch(deleteImage2({ _id, token }));
		
	}
  
//   const {aboutMe,countryLiving,currentLocation,occupation,annualIncome,nativePlace,diet,smoking,drinking, family,education,residential,contact } =userProfile;

	 let errorsObj = { currentProfilePic: '' };
	const [errors, seterrors] = useState({ errorsObj });
	
	const [isProfilePicEdit, setisProfilePicEdit] = useState(false);
	const [isProfilePicEdit1, setisProfilePicEdit1] = useState(false);
	const [isImage1Edit, setisImage1Edit] = useState(false);
	const [isImage2Edit, setisImage2Edit] = useState(false);


	useEffect(() => {
		if (userProfile) {
			if (!userProfile.profilePic) {
				setisProfilePicEdit(true);
			}
		}
	}, [userProfile]);


	function dataUrlToFile(dataUrl, fileName) {
    
    var arr = dataUrl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime })
    
    
	}
	
	const onFileResizeProfilePic = (e) => {

    const file = e.target.files[0];
    
    Compress.imageFileResizer(
      file,
      600,
      800,
      "JPEG",
      100,
      0,
      (uri) => {
        
        const newFile = dataUrlToFile(uri,file.name);
        
        setcurrentProfilePic(newFile);

      },
      "base64"
    )

	}
	

	const handleProfilePic = (e) => {
		e.preventDefault();

	  let error = false;

		const errorObj = { ...errorsObj };
		
	  if (currentProfilePic === '' || currentProfilePic === null || currentProfilePic === undefined) {
		  errorObj.currentProfilePic = 'Please Select a File';
		  error = true
		}
		
		seterrors(errorObj);

		if (error) {
			return

		}

		const profileData = new FormData();
		profileData.append('profilePic', currentProfilePic);
		setcurrentProfilePic('');
		const _id = userProfile._id;
		setisProfilePicEdit(false);
		setisProfilePicEdit1(false);
		dispatch(updateProfilePic({ profileData, _id, token }));
		
	
	}

	const onFileResizeImage1 = (e) => {

    const file = e.target.files[0];
    
    Compress.imageFileResizer(
      file,
      600,
      800,
      "JPEG",
      100,
      0,
      (uri) => {
        
        const newFile = dataUrlToFile(uri,file.name);
        
        setcurrentImage1(newFile);

      },
      "base64"
    )

	}
	

	const handleImage1 = (e) => {
		e.preventDefault();

	  let error = false;

		const errorObj = { ...errorsObj };
		
	  if (currentImage1 === '' || currentImage1 === null || currentImage1 === undefined) {
		  errorObj.currentImage1 = 'Please Select a File';
		  error = true
		}
		
		seterrors(errorObj);

		if (error) {
			return

		}

		const profileData = new FormData();
		profileData.append('image1', currentImage1);
		setcurrentImage1('');
		const _id = userProfile._id;
		setisImage1Edit(false);
		
		dispatch(updateImage1({ profileData, _id, token }));
		
	
	}

	const onFileResizeImage2 = (e) => {

    const file = e.target.files[0];
    
    Compress.imageFileResizer(
      file,
      600,
      800,
      "JPEG",
      100,
      0,
      (uri) => {
        
        const newFile = dataUrlToFile(uri,file.name);
        
        setcurrentImage2(newFile);

      },
      "base64"
    )

	}
	

	const handleImage2 = (e) => {
		e.preventDefault();

	  let error = false;

		const errorObj = { ...errorsObj };
		
	  if (currentImage2 === '' || currentImage2 === null || currentImage2 === undefined) {
		  errorObj.currentImage2 = 'Please Select a File';
		  error = true
		}
		
		seterrors(errorObj);

		if (error) {
			return

		}

		const profileData = new FormData();
		profileData.append('image2', currentImage2);
		setcurrentImage2('');
		const _id = userProfile._id;
		setisImage2Edit(false);
		
		dispatch(updateImage2({ profileData, _id, token }));
		
	
	
	}
	
	if (loading) {
		return(
		<div>
			<LoadingScreen/>
			</div>
		)

	}
	
  
	else if (userProfile) {
		const {firstName,lastName,email,dob,religion,caste,height,weight,bloodGroup,bodytype,complexion,languages,mothertongue,
			physicalStatus, advanceProfileStatus, profilePic, image1, image2 } = userProfile;
		
		
		const dateOfBirth=new Date(dob);
		const dobDay = dateOfBirth.getDate();
		const dobMonth = dateOfBirth.getMonth();
		const dobYear = dateOfBirth.getFullYear();
		
		const {aboutMe,countryLiving,currentLocation,occupation,annualIncome,nativePlace,diet,smoking,drinking, family,education,residential,contact } =userProfile;
		
		 
  return (
    <Fragment>
      <PageTitle activeMenu="Profile" motherMenu="App" />

      <div className="row">
        <div className="col-lg-12">
          <div className="profile card card-body px-3 pt-3 pb-0">
            <div className="profile-head">
              <div className="photo-content ">
                {/* <div className="cover-photo rounded"></div> */}
              </div>
              <div className="profile-info">
                <div className="profile-photo">
                  <img
                    src={profilePic||defaultProfile}
                    className="img-fluid rounded-circle"
                    alt="profile"
                  />
                </div>
                <div className="profile-details">
                  <div className="profile-name px-3 pt-2">
                    <h4 className="text-primary mb-0">{firstName} &nbsp; {lastName}</h4>
                    <p>{ religion} &nbsp; {caste}</p>
                  </div>
                  <div className="profile-email px-2 pt-2">
                    <h4 className="text-muted mb-0">{email}</h4>
                    <p>Email</p>
                  </div>
                  <Dropdown className="dropdown ms-auto">
                    <Dropdown.Toggle
                      variant="primary"
                      className="btn btn-primary light sharp i-false"
                      data-toggle="dropdown"
                      aria-expanded="true"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        //    xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="18px"
                        height="18px"
                        viewBox="0 0 24 24"
                        version="1.1"
                      >
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <rect x="0" y="0" width="24" height="24"></rect>
                          <circle fill="#000000" cx="5" cy="12" r="2"></circle>
                          <circle fill="#000000" cx="12" cy="12" r="2"></circle>
                          <circle fill="#000000" cx="19" cy="12" r="2"></circle>
                        </g>
                      </svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                      <Dropdown.Item className="dropdown-item" onClick={()=>setisProfilePicEdit(true)}>
                        <i className="fa fa-user-circle text-primary me-2" />
                        change  profile pic 
                      </Dropdown.Item>
                      {/* <Dropdown.Item className="dropdown-item">
                        <i className="fa fa-users text-primary me-2" />
                        Add to close friends
                      </Dropdown.Item> */}
                      {/* <Dropdown.Item className="dropdown-item">
                        <i className="fa fa-plus text-primary me-2" />
                        Add to group
                      </Dropdown.Item> */}
					  <Dropdown.Item className="dropdown-item">
                        <i className="fa fa-trash text-primary me-2" />
						 <span onClick={()=>setdeleteProfilePicModal(true)}>Delete profile pic</span>					  
					  </Dropdown.Item>
					  <Dropdown.Item className="dropdown-item">
						{/* <i className="fa fa-ban text-primary me-2" />
							<span>
								Deactivate Your SRS Account
							</span> */}				  
					  </Dropdown.Item>				  
					</Dropdown.Menu>
									  
				</Dropdown>
				<Modal className="fade" show={deleteProfilePicModal}>
                  <Modal.Header>
                    <Modal.Title>Are You Sure You want to delete Your Profile Pic</Modal.Title>
                    <Button
                      variant=""
                      className="btn-close"
					  onClick={() => setdeleteProfilePicModal(false)}						  
                    >
                      
                    </Button>
                  </Modal.Header>
                  <Modal.Body> Click Delete if you still want to delete your profile pic .. . otherwise click close</Modal.Body>
                  <Modal.Footer>
                    <Button
                      onClick={() => setdeleteProfilePicModal(false)}
                      variant="danger light"
                    >
                      Close
                    </Button>
                    <Button variant="primary"
						onClick={handleDeleteProfilePic}
					>
						Delete 
					</Button>
                  </Modal.Footer>
                </Modal>
				  
                </div>
				
              </div>
            </div>
			{ isProfilePicEdit ?
			<div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-image"
                        >
                          Select Your Profile Pic
                          <span className="text-danger">*</span>
                        </label>
                        <div 
						// className="col-lg-1"
						>
                          
								  <input type="file" name="profile-pic" id="profile-pic" onChange={onFileResizeProfilePic} />
								  <button type="submit" className="btn btn-primary mb-1 ms-1" onClick={handleProfilePic}>
									 <span className="me-2"> <i className="fa fa-upload" /></span> Upload
								  </button>
								  <button className="btn btn-secondary mb-1 ms-1" onClick={()=>setisProfilePicEdit(false)}>
										<span className="me-2"> <i className="fa fa-times" /></span>Cancel
								  </button>
						  
							  </div>
							  
							{errors.currentProfilePic && <div className="text-danger fs-12">{errors.currentProfilePic}</div>}
            </div> : ""
				
						}		
          </div>		  
        </div>
		
      </div>
      <div className="row">
        <div className="col-xl-4">
			<div className="row">
				<div className="col-lg-12">
					<div className="card">
						<div className="card-body">
							<div className="profile-statistics">
								<div className="text-center">
									<div className="row">
										<div className="col">
											<h3 className="m-b-0">150</h3><span>Follower</span>
										</div>
										<div className="col">
											<h3 className="m-b-0">140</h3> <span>Place Stay</span>
										</div>
										<div className="col">
											<h3 className="m-b-0">45</h3> <span>Reviews</span>
										</div>
									</div>
									<div className="mt-4">
										<Link	to=""	className="btn btn-primary mb-1 me-1">Follow</Link>
										<Button as="a" href="#" className="btn btn-primary mb-1 ms-1">Send Message</Button>
									</div>
								</div>
							  {/* send Modal */}
								<Modal className="modal fade" show={sendMessage}>
									<div className="modal-content">
										<div className="modal-header">
											<h5 className="modal-title">Send Message</h5>
											<Button variant="" type="button" className="btn-close" data-dismiss="modal" onClick={() => setSendMessage(false)}>
												
											</Button>
										</div>
										<div className="modal-body">
											<form className="comment-form" onSubmit={(e) => { e.preventDefault(); setSendMessage(false); }}>
												<div className="row">
													<div className="col-lg-6">
														<div className="form-group mb-3">
															<label htmlFor="author" className="text-black font-w600">  Name <span className="required">*</span> </label>
															<input type="text" className="form-control" defaultValue="Author" name="Author" placeholder="Author" />
														</div>
													</div>
													<div className="col-lg-6">
														<div className="form-group mb-3">
															<label htmlFor="email" className="text-black font-w600"> Email <span className="required">*</span></label>
															<input type="text" className="form-control" defaultValue="Email" placeholder="Email" name="Email"/>
														</div>
													</div>
													<div className="col-lg-12">
														<div className="form-group mb-3">
															<label htmlFor="comment" className="text-black font-w600">Comment</label>
															<textarea rows={8} className="form-control" name="comment" placeholder="Comment" defaultValue={""}/>
														</div>
													</div>
													<div className="col-lg-12">
														<div className="form-group mb-3">
															<input type="submit" value="Post Comment" className="submit btn btn-primary" name="submit"/>
														</div>
													</div>
												</div>
											</form>
										</div>
									</div>
								</Modal>
							</div>
						</div>
					</div>
				</div>	
				<div className="col-lg-12">
					<div className="card">
						<div className="card-header border-0 pb-0">
							<h5 className="text-primary">Today Highlights</h5>
						</div>	
						<div className="card-body pt-3"	>	
							<div className="profile-blog ">
								<img  src={profile01}  alt="profile" className="img-fluid  mb-4 w-100 " />
								<Link to="/post-details"> <h4>Darwin Creative Agency Theme</h4> </Link>
								<p className="mb-0">
									A small river named Duden flows by their place and supplies
									it with the necessary regelialia. It is a paradisematic
									country, in which roasted parts of sentences fly into your
									mouth.
								</p>
							</div>
						</div>	
					</div>
				</div>
				<div className="col-lg-12">
					<div className="card">
						<div className="card-header border-0 pb-0">
							<h5 className="text-primary ">Interest</h5>
						</div>
						<div className="card-body pt-3">
							<div className="profile-interest ">
									<div className="row sp4">
										<div className="col-lg-4 col-xl-4 col-sm-4 col-6 int-col mb-1">
											<a href={profile02}> <img src={profile02} alt="profileImage" className="img-fluid" /> </a>
										</div>
										<div className="col-lg-4 col-xl-4 col-sm-4 col-6 int-col mb-1">
											<a href={profile03}> <img src={profile03} alt="profile" className="img-fluid"/></a>
										</div>
										<div className="col-lg-4 col-xl-4 col-sm-4 col-6 int-col mb-1">
											<a href={profile04}><img src={profile04} alt="profile" className="img-fluid" /> </a>
										</div>
										<div className="col-lg-4 col-xl-4 col-sm-4 col-6 int-col mb-1">
											{" "}
											<a href={profile02}><img src={profile02} alt="profile" className="img-fluid" /> </a>
										</div>
										<div className="col-lg-4 col-xl-4 col-sm-4 col-6 int-col mb-1">
											<a href={profile03} className="col-lg-4 col-xl-4 col-sm-4 col-6 int-col" >
												<img src={profile03} alt="profile"	className="img-fluid"/>	
											</a>
										</div>
										<div className="col-lg-4 col-xl-4 col-sm-4 col-6 int-col mb-1">
											<a href={profile04}	className="col-lg-4 col-xl-4 col-sm-4 col-6 int-col">
												<img  src={profile04} alt="profile"	className="img-fluid"/>
											</a>
										</div>
									</div>
								
							</div>
						</div>	
					</div>
				</div>	
				<div className="col-lg-12">
					<div className="card">
						<div className="card-header border-0 pb-0">
							<h5 className="text-primary">Our Latest News</h5>
						</div>	
						<div className="card-body pt-3">
							<div className="profile-news">
							  <div className="media pt-3 pb-3">
								<img src={profile05} alt="" className="me-3 rounded" width={75}/>
								<div className="media-body">
									<h5 className="m-b-5">
										<Link to="/post-details" className="text-black">
											Collection of textile samples
										</Link>
									</h5>
									<p className="mb-0">I shared this on my fb wall a few months back, and I thought. </p>
								</div>
							  </div>
							  <div className="media pt-3 pb-3">
								<img src={profile06} alt=""  className="me-3 rounded" width={75}/>
								<div className="media-body">
									<h5 className="m-b-5">
										<Link to="/post-details" className="text-black">
										Collection of textile samples
										</Link>
									</h5>
									<p className="mb-0">
										I shared this on my fb wall a few months back, and I
										thought.
									</p>
								</div>
							  </div>
							  <div className="media pt-3 ">
								<img src={profile07} alt="" className="me-3 rounded" width={75} />
								<div className="media-body">
									<h5 className="m-b-5">
										<Link to="/post-details" className="text-black">
											Collection of textile samples
										</Link>
									</h5>
									<p className="mb-0">
										I shared this on my fb wall a few months back, and I thought.
									</p>
								</div>
							  </div>
							</div>
						</div>	
					</div>
				</div>	
			</div>	
		</div>	
        <div className="col-xl-8">
          <div className="card">
            <div className="card-body">
              <div className="profile-tab">
                <div className="custom-tab-1">
						<ul className="nav nav-tabs">
							
							<li className="nav-item" onClick={() => setActiveToggle("basicProfile")}>
								<Link to="#basic-profile"  data-toggle="tab" className={`nav-link ${ activeToggle === "basicProfile" ? "active show" : ""}`}>Basic Profile</Link>
							</li>
							<li className="nav-item" onClick={() => setActiveToggle("advancedInfo")}>
								<Link to="#advanced-info"  data-toggle="tab" className={`nav-link ${ activeToggle === "advancedInfo" ? "active show" : ""}`}>Advanced Info</Link>
							</li>
							<li className="nav-item">
								<Link to="#profile-settings" data-toggle="tab" onClick={() => setActiveToggle("setting")} className={`nav-link ${ activeToggle === "setting" ? "active show" : ""}`}>Profile Setting</Link>
							</li>
							<li className="nav-item" onClick={() => setActiveToggle("photos")}>
								<Link to="#my-posts" data-toggle="tab" className={`nav-link ${ activeToggle === "photos" ? "active show" : ""}`}>Upload Photos </Link>
							</li>
						</ul>
					<div className="tab-content">
					<div id="basicProfile" className={`tab-pane fade ${ activeToggle === "basicProfile" ? "active show" : ""}`}>
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
												{ languages.map((language)=><span  key={language}> {language} , </span>)}
												
											</div>
											
										</div>
									</div>
								</div>
						</div>
						
					</div>
						
						
						<div id="advanced-info" className={`tab-pane fade ${ activeToggle === "advancedInfo" ? "active show" : ""}`}>
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
											More Info About Yourself
										</h4>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500"> Country Of Living<span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{countryLiving}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">Place Of Birth <span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{nativePlace}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">  Current Location <span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{currentLocation}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">Diet<span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{diet}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">  Smoking <span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{smoking}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">Drinking<span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
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
											<div className="col-3">
												<h5 className="f-w-500"> Occupation <span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{occupation}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">Annual Income <span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>Rs. {annualIncome}/- </span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">  About My Family <span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{family.aboutMyFamily}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">Father's Occupation<span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{family.occupationFather}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">  Mother's Occupation <span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
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
											<div className="col-3">
												<h5 className="f-w-500"> Highest Education<span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{education.course}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">Corresponding Discipline<span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
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
											<div className="col-3">
												<h5 className="f-w-500"> Residential Address<span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{residential}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">Contact Number <span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{contact.contact1} </span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">Additional Contact Number <span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
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
												<strong> Your Advance Info is Empty !!!</strong> Please Fill up the same.
												</Alert>
											
											</Card.Body>
										</Card>
									</Col>
										<Col xl={6} className="col-xxl-12">
											<Card>
												<Card.Body>
													<Link to="/form-add-advance-info"> Click Here to Fill up Advance Info </Link>
												</Card.Body>
											
											</Card>
											
										</Col>
								</Row>
							</div>
						}	
						</div>
						
						<div id="profile-settings" className={`tab-pane fade ${ activeToggle === "setting" ? "active show" : ""}`}>
							<Row>
							<Card>
								<Card.Header className="d-block">
								<Card.Title>Manage Your Profile</Card.Title>
								<p className="mb-0 subtitle">
									here you can manage your  <code>profile </code> as editing or deleting completely.
								</p>
								</Card.Header>
								<Card.Body>
									<Alert
									variant="success"
									className="alert-dismissible solid fade show"
									>
									<strong> Edit Your Basic Profile</strong>{" "} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  
											<Link style={{color:"white"}} to="/form-edit-basic-profile">
												click here to edit your basic profile
											</Link>
									
									</Alert>
              
            					</Card.Body>
								{userProfile.advanceProfileStatus ?										  
								<Card.Body>
									<Alert
									variant="info"
									className="alert-dismissible solid fade show"
									>
									<strong> Edit Your Advanced Profile</strong>{" "} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									
										<Link style={{color:"white"}} to="/form-edit-advance-info"> click here to edit your advanced profile </Link> 
									
									</Alert>
								
								</Card.Body>
											: ""}
							<Card.Body>
								<Alert
								variant="primary"
								className="alert-dismissible solid fade show"
								>
								<strong> Delete Your Entire Profile</strong>{" "}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									<span
									style={{ color: "white", cursor: "pointer" }}                                      
									onClick={()=> setBasicModal(true)}
									>
																			
									click here to delete your profile
								</span>
								<Modal className="fade" show={basicModal}>
								<Modal.Header>
									<Modal.Title>Are You Sure You want to delete </Modal.Title>
									<Button
									variant=""
									className="btn-close"
									onClick={() => setBasicModal(false)}
									>
									
									</Button>
								</Modal.Header>
								<Modal.Body> Click Delete if you still want to delete your profile .. . otherwise click close</Modal.Body>
								<Modal.Footer>
									<Button
									onClick={() => setBasicModal(false)}
									variant="danger light"
									>
									Close
									</Button>
									<Button variant="primary"
										onClick={handleDelete}
									>
										Delete 
									</Button>
								</Modal.Footer>
								</Modal>
								
								</Alert>
							
							</Card.Body>
						</Card>
											  
                          	</Row>
						</div>
						<div id="my-posts" className={`tab-pane fade ${ activeToggle === "photos" ? "active show" : "" }`} >
							<div className="my-post-content pt-3">
								

								<div className="profile-uoloaded-post border-bottom-1 pb-5">
									<img src={profilePic || defaultProfile} alt="" className="img-fluid w-80 rounded" />
												  
									<Link className="post-title" to="/post-details">
										<h3 className="text-black">This is your profile pic</h3>
									</Link>
									<p>
									Here you can update your profile picture which appears in your profile. Select an image file from your device and click 'Upload.' Your new profile picture will be displayed once the upload is complete.
													  
									</p>

									{ isProfilePicEdit1 ?
								<div className="form-group mb-3 row">
									<label
									className="col-lg-4 col-form-label"
									htmlFor="val-image"
									>
									Select Your Profile Pic
									<span className="text-danger">*</span>
									</label>
									<div 
									// className="col-lg-1"
									>
                          
							  		<input type="file" name="profile-pic1" id="profile-pic1" onChange={onFileResizeProfilePic} />
															  
								  <button type="submit" className="btn btn-primary mb-1 ms-1" onClick={handleProfilePic}>
									 <span className="me-2"> <i className="fa fa-upload" /></span> Upload
								  </button>
								  <button className="btn btn-secondary mb-1 ms-1" onClick={()=>setisProfilePicEdit1(false)}>
										<span className="me-2"> <i className="fa fa-times" /></span>Cancel
								  </button>
						  
										</div>					  
							  
									{errors.currentProfilePic && <div className="text-danger fs-12">{errors.currentProfilePic}</div>}
            					</div> : ""
				
									}					
												  
									<button className="btn btn-primary me-2" onClick={() => setisProfilePicEdit1(true)}>
										<span className="me-2"> <i className="fa fa-user" /> </span> {profilePic?"Edit":"Add Photo"} 
									</button>
									{profilePic?<button className="btn btn-secondary" onClick={() => setdeleteProfilePicModal(true)}>
													  <span className="me-2"> <i className="fa fa-trash" /></span>Delete
									</button> : ""}
												  
								</div>
								<div className="profile-uoloaded-post border-bottom-1 pb-5">
									<img src={image1||defaultProfile} alt="" className="img-fluid w-80 rounded" />
									<Link className="post-title" to="/post-details">
										<h3 className="text-black">Add second picture to your profile</h3>
									</Link>
									<p>
									Here you can add one picture of you which appears in your profile. Select an image file from your device and click 'Upload.' Your new  picture will be displayed once the upload is complete.
													  
									</p>


									{ isImage1Edit ?
										<div className="form-group mb-3 row">
													<label
													className="col-lg-4 col-form-label"
													htmlFor="val-image"
													>
													Select a Photo of Your's 
													<span className="text-danger">*</span>
													</label>
													<div 
													// className="col-lg-1"
													>
													
														<input type="file" name="image1" id="image1" onChange={onFileResizeImage1} />
								  															
															  <button type="submit" className="btn btn-primary mb-1 ms-1" onClick={handleImage1}>
																<span className="me-2"> <i className="fa fa-upload" /></span> Upload
															</button>
															<button className="btn btn-secondary mb-1 ms-1" onClick={()=>setisImage1Edit(false)}>
																	<span className="me-2"> <i className="fa fa-times" /></span>Cancel
															</button>
													
													</div>					  
														
													{errors.currentImage1 && <div className="text-danger fs-12">{errors.currentImage1}</div>}
														  
										</div> : ""
				
									}
												  
												  
									<button className="btn btn-primary me-2" onClick={()=>setisImage1Edit(true)}>
													  
										<span className="me-2"> <i className="fa fa-user" /> </span> {image1?"Edit":"Add Photo"} 
									</button>
									{image1?<button className="btn btn-secondary" onClick={() => setdeleteImage1Modal(true)}>
										<span className="me-2"> <i className="fa fa-trash" /></span>Delete
									</button>:""}
												  
									<Modal className="fade" show={deleteImage1Modal}>
									<Modal.Header>
										<Modal.Title>Are You Sure You want to delete This photo</Modal.Title>
										<Button
										variant=""
										className="btn-close"
										onClick={() => setdeleteImage1Modal(false)}						  
										>
										
										</Button>
									</Modal.Header>
									<Modal.Body> Click Delete if you still want to delete your photo .. . otherwise click close</Modal.Body>
									<Modal.Footer>
										<Button
										onClick={() => setdeleteImage1Modal(false)}
										variant="danger light"
										>
										Close
										</Button>
										<Button variant="primary"
											onClick={handleDeleteImage1}
										>
											Delete 
										</Button>
									</Modal.Footer>
									</Modal>
												  
								</div>
								<div className="profile-uoloaded-post pb-3">
									<img src={image2||defaultProfile} alt="" className="img-fluid  w-80 rounded" />
									<Link className="post-title" to="/post-details">
										<h3 className="text-black">Add one last picture</h3>
									</Link>
									<p>
									Here you can add your picture which appears in your profile. Select an image file from your device and click 'Upload.' Your new profile picture will be displayed once the upload is complete.
													  
									</p>
									{ isImage2Edit ?
										<div className="form-group mb-3 row">
													<label
													className="col-lg-4 col-form-label"
													htmlFor="val-image"
													>
													Select a Photo of Your's 
													<span className="text-danger">*</span>
													</label>
													<div 
													// className="col-lg-1"
													>
													
														<input type="file" name="image1" id="image1" onChange={onFileResizeImage2} />
								  															
															  <button type="submit" className="btn btn-primary mb-1 ms-1" onClick={handleImage2}>
																<span className="me-2"> <i className="fa fa-upload" /></span> Upload
															</button>
															<button className="btn btn-secondary mb-1 ms-1" onClick={()=>setisImage2Edit(false)}>
																	<span className="me-2"> <i className="fa fa-times" /></span>Cancel
															</button>
													
													</div>					  
														
													{errors.currentImage2 && <div className="text-danger fs-12">{errors.currentImage2}</div>}
														  
										</div> : ""
				
									}

												
												  
									<button className="btn btn-primary me-2" onClick={()=>setisImage2Edit(true)}>
										<span className="me-2"> <i className="fa fa-user" /> </span> {image2?"Edit":"Add Photo"} 
									</button>
									{image2?<button className="btn btn-secondary" onClick={() => setdeleteImage2Modal(true)}>
													  
										<span className="me-2"> <i className="fa fa-trash" /></span>Delete
									</button>:""}
									<Modal className="fade" show={deleteImage2Modal}>
									<Modal.Header>
										<Modal.Title>Are You Sure You want to delete This photo</Modal.Title>
										<Button
										variant=""
										className="btn-close"
										onClick={() => setdeleteImage2Modal(false)}						  
										>
										
										</Button>
									</Modal.Header>
									<Modal.Body> Click Delete if you still want to delete your photo .. . otherwise click close</Modal.Body>
									<Modal.Footer>
										<Button
										onClick={() => setdeleteImage2Modal(false)}
										variant="danger light"
										>
										Close
										</Button>
										<Button variant="primary"
											onClick={handleDeleteImage2}
										>
											Delete 
										</Button>
									</Modal.Footer>
									</Modal>
								</div>
								{/* Modal */}
								<Modal   show={replayModal}onHide={() => setReplayModal(false)} className="modal fade" id="replyModal">										
									<div className="modal-content">
										<div className="modal-header">
											<h5 className="modal-title">Post Reply</h5>
											<button type="button" className="btn-close" data-dismiss="modal" onClick={() => setReplayModal(false)}></button>
										</div>
										<div className="modal-body">
											<form>
												<textarea className="form-control" rows="4">Message</textarea>
											</form>
										</div>
										<div className="modal-footer">
											<button type="button" className="btn btn-danger light" data-dismiss="modal" onClick={() => setReplayModal(false)}>Close</button>
											<button type="button" className="btn btn-primary">Reply</button>
										</div>
									</div>
								</Modal>
							</div>
						</div>
					</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
  }
  else{
	return(
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



export default AppProfile;
