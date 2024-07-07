import React, { Fragment, useState , useEffect ,useContext} from "react";
import { Link,useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";

// components
import PageTitle from "../../components/PageTitle";
import { Row, Card, Col, Alert } from "react-bootstrap";
import swal from "sweetalert";
import Spinner from "../../components/Spinner/Spinner";

//data
import { reldata } from "../../data/reldata";
import { ThemeContext } from "../../context/ThemeContext";

// actions

import { getUserProfile,editUserProfile} from '../../store/userProfile/userProfileActions';


const FormBasicProfileEdit = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { 
		
		changeSideBarStyle
		
	} = useContext(ThemeContext);
	useEffect(() => {
		changeSideBarStyle({ value: "modern", label: "Modern" });
	},[]);
 
  const userInfo = useSelector(state => state.auth.userInfo);
  const { token } = useSelector(state => state.auth);
  
  
  useEffect(() => {
    dispatch(getUserProfile({ email: userInfo.email, token }));

  }, [dispatch, userInfo.email, token]);
  
  const { userProfile, loading, success, error } = useSelector(state => state.userProfile);
  
  useEffect(() => {
    if (error) {
      swal(error, "error");
    }
  }, [error]);
  

  
  
  let errorsObj={firstName:'',lastName:'',email:'',gender:'',dob:'',religion:'',caste:'',height:'',weight:'',complexion:'',bodytype:'',physicalStatus:'',bloodGroup:'',mothertongue:'',languages:''};
  const [errors, seterrors] = useState({errorsObj});

  const [firstName, setfirstName] = useState('');
  const [lastName, setlasttName] = useState('');
  const [email, setemail] = useState('');
  const [gender, setgender] = useState('');
  const [dob, setdob] = useState('');
  const [height, setheight] = useState('');
  const [weight, setweight] = useState('');
  const [complexion, setcomplexion] = useState('');
  const [bodytype, setbodytype] = useState('');
  const [physicalStatus, setphysicalStatus] = useState('');
  const [bloodGroup, setbloodGroup] = useState('');
  const [mothertongue, setmothertongue] = useState('');

  const [{ religion, caste }, setData] = useState({});
  const religions = reldata.map((religion) => {
    return (
      <option key={religion.name} value={religion.name}>
        {religion.name}
      </option> 
    )
  })
  const castes = reldata.find(item => item.name === religion)?.castes.map((caste) => {
    return (
      <option key={caste} value={caste}>
        {caste}
      </option>
    )
  })
 
  useEffect(() => {
    
    if (userProfile) {
      const currentDob = userProfile.dob.substring(0, 10);

      setfirstName(userProfile.firstName);
      setlasttName(userProfile.lastName);
      setemail(userProfile.email);
      setgender(userProfile.gender)
      setdob(currentDob);
      setheight(userProfile.height);
      setweight(userProfile.weight);
      setcomplexion(userProfile.complexion);
      setbodytype(userProfile.bodytype);
      setphysicalStatus(userProfile.physicalStatus);
      setbloodGroup(userProfile.bloodGroup);
      setmothertongue(userProfile.mothertongue);
      setData({ religion: userProfile.religion, caste: userProfile.caste });

    }
    
   
  }, [userProfile]);

  
  
  
  const handleReligionChange = (e) => {
    setData(data=>({caste:"",religion:e.target.value}))
  }

  const handleCastChange = (e) => {
    setData(data=>({...data, caste:e.target.value}))
  }

  
  const handleSubmit=(e)=>{
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
          if (firstName === '') {
              errorObj.firstName = 'First Name is Required';
              error = true;
          }
          if (lastName === '') {
            errorObj.lastName = 'Last Name is Required';
            error = true;
          }
          if (email === '') {
            errorObj.email = 'email Id is Required';
            error = true;
          }
          if (gender === '') {
            errorObj.gender = 'Gender is Required';
            error = true;
          }
          if (dob === '') {
            errorObj.dob = 'Date of Birth is Required';
            error = true;
          }
          if (height === '') {
            errorObj.height = 'Height is Required';
            error = true;
          }
          if (weight === '') {
            errorObj.weight = 'Weight is Required';
            error = true;
          }
          if (complexion === '') {
            errorObj.complexion = 'Complexion is Required';
            error = true;
          }
          if (bodytype === '') {
            errorObj.bodytype = 'Body Type is Required';
            error = true;
          }
          if (physicalStatus === '') {
            errorObj.physicalStatus = 'Physical Status is Required';
            error = true;
          }
          if (bloodGroup === '') {
            errorObj.bloodGroup = 'Blood Group is Required';
            error = true;
          }
          if (mothertongue === '') {
            errorObj.mothertongue = 'Mothertongue is Required';
            error = true;
          }
          if (religion === '') {
            errorObj.religion = 'Religion is Required';
            error = true;
          }
          if (caste === '') {
            errorObj.caste = 'Caste is Required';
            error = true;
          }

          seterrors(errorObj);

          if(error){
            return
          }
          else{
            const profileData = { firstName, lastName, email, gender, religion, caste, dob, height, weight, complexion, bodytype, physicalStatus, bloodGroup, mothertongue }      
            
            const _id = userProfile._id;

            dispatch(editUserProfile({ profileData, _id, token }));
            
        
    }
    
    
  }

  useEffect(() => {
    if (success) {
      navigate('/app-profile');
    }
  }, [navigate, success]);
  


  if (userProfile) {
   
  return (
    <Fragment>
      <PageTitle
        activeMenu="Basic"
        motherMenu="Profile"
        pageContent="Basic"
      />

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Edit Your Basic Profile</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <form
                  className="form-valide"
                  action="#"
                  method="post"
                  onSubmit={handleSubmit}
                >
                  <h4>Personal Information</h4>
                  <div className="row">
                    <div className="col-xl-6">
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-firstName"
                        >
                          First Name
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-firstName"
                            name="val-firstName"
                            placeholder="Enter your First Name.."
                            value={firstName}
                            onChange={(e)=> setfirstName(e.target.value) }
                          />
                          
                        </div>
                        {errors.firstName && <div className="text-danger fs-12">{errors.firstName}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-lastName"
                        >
                          Last Name <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-lastName"
                            name="val-lastName"
                            placeholder="Your Second Name.."
                            value={lastName}
                            onChange={(e)=>setlasttName(e.target.value)}
                          />
                        </div>
                        {errors.lastName && <div className="text-danger fs-12">{errors.lastName}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-emailId"
                        >
                          email Id
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="email"
                            className="form-control"
                            id="val-email"
                            name="val-email"
                            placeholder="Enter a Valid email Id.."
                            value={email}
                            onChange={(e)=>setemail(e.target.value)}
                          />
                        </div>
                        {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-gender"
                        >
                          Gender 
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                        <select
                            className="form-control"
                            id="val-gender"
                            name="val-gender"
                            value={gender}
                            onChange={(e)=>setgender(e.target.value)}
                          >
                            <option value="">Please select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                          
                        </div>
                        {errors.gender && <div className="text-danger fs-12">{errors.gender}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-confirm-password"
                        >
                          Date Of Birth
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                            <input type="date" className="form-control" name="dob" id="dob" value={dob} onChange={(e) => setdob(e.target.value)} />
                        </div>
                                              
                        {errors.dob && <div className="text-danger fs-12">{errors.dob}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-religion"
                        >
                          Religion
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <select
                            className="form-control"
                            id="val-religion"
                            name="val-religion"
                            value={religion}
                            onChange={handleReligionChange}
                          >
                            <option value="">Please select</option>
                            {religions}
                          </select>
                        </div>
                        {errors.religion && <div className="text-danger fs-12">{errors.religion}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-caste"
                        >
                          Caste
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <select
                            className="form-control"
                            id="val-caste"
                            name="val-caste"
                            value={caste}
                            onChange={handleCastChange}

                          >
                            <option value="">Please select</option>
                            {castes}
                          </select>
                        </div>
                        {errors.caste && <div className="text-danger fs-12">{errors.caste}</div>}
                      </div>

                      {/* <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-suggestions"
                        >
                          Suggestions <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <textarea
                            className="form-control"
                            id="val-suggestions"
                            name="val-suggestions"
                            rows="5"
                            placeholder="What would you like to see?"
                          ></textarea>
                        </div>
                      </div> */}
                    </div>
                    <div className="col-xl-6">
                      <h4>Physical Info</h4>
                      
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-height"
                        >
                          Height
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-height"
                            name="val-height"
                            placeholder="height in cm"
                            value={height}
                            onChange={(e)=>setheight(e.target.value)}
                          />
                        </div>
                        {errors.height && <div className="text-danger fs-12">{errors.height}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-weight"
                        >
                          Weight
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-weight"
                            name="val-weight"
                            placeholder="weight in kg"
                            value={weight}
                            onChange={(e)=>setweight(e.target.value)}
                          />
                        </div>
                        {errors.weight && <div className="text-danger fs-12">{errors.weight}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-complexion"
                        >
                          Complexion 
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                        <select
                            className="form-control"
                            id="val-complexion"
                            name="val-complexion"
                            value={complexion}
                            onChange={(e)=>setcomplexion(e.target.value)}
                          >
                            <option value="">Please select</option>
                            <option value="fair">Fair</option>
                            <option value="medium">Medium</option>
                            <option value="olive">Olive</option>
                            <option value="brown">Brown</option>
                            <option value="others">Others</option>

                          </select>
                          
                        </div>
                        {errors.complexion && <div className="text-danger fs-12">{errors.complexion}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-bodytype"
                        >
                          Body Type
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                        <select
                            className="form-control"
                            id="val-bodytype"
                            name="val-bodytype"
                            value={bodytype}
                            onChange={(e)=>setbodytype(e.target.value)}
                          >
                            <option value="">Please select</option>
                            <option value="athletic">Athletic</option>
                            <option value="average">Average</option>
                            <option value="heavy">Heavy</option>
                            <option value="slim">Slim</option>
                            <option value="others">Others</option>

                          </select>
                          
                        </div>
                        {errors.bodytype && <div className="text-danger fs-12">{errors.bodytype}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-physicalStatus"
                        >
                          Physical Status
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                        <select
                            className="form-control"
                            id="val-physicalStatus"
                            name="val-physicalStatus"
                            value={physicalStatus}
                            onChange={(e)=>setphysicalStatus(e.target.value)}
                          >
                            <option value="">Please select</option>
                            <option value="normal">Normal</option>
                            <option value="physically challenged">Physically Challenged</option>
                            <option value="others">Others</option>

                          </select>
                          
                        </div>
                        {errors.physicalStatus && <div className="text-danger fs-12">{errors.physicalStatus}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-bloodGroup"
                        >
                          Blood Group
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                        <select
                            className="form-control"
                            id="val-bloodGroup"
                            name="val-bloodGroup"
                            value={bloodGroup}
                            onChange={(e)=>setbloodGroup(e.target.value)}
                          >
                            <option value="">Please select</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>

                            <option value="others">Others</option>

                          </select>
                          
                        </div>
                        {errors.bloodGroup && <div className="text-danger fs-12">{errors.bloodGroup}</div>}
                      </div>
                      <h4>Language Details </h4> 
                      
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-bloodGroup"
                        >
                          Mothertongue
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                        <select
                            className="form-control"
                            id="val-mothertongue"
                            name="val-mothertongue"
                            value={mothertongue}
                            onChange={(e)=> setmothertongue(e.target.value)}
                          >
                            <option value="">Please select</option>
                            <option value="malayalam">Malayalam</option>
                            <option value="tamil">Tamil</option>
                            <option value="hindi">Hindi</option>
                            <option value="english">English</option>
                            <option value="others">Others</option>

                          </select>
                          
                        </div>
                        {errors.mothertongue && <div className="text-danger fs-12">{errors.mothertongue}</div>}
                      </div>
                     
                      <div className="form-group mb-3 row">
                        <div className="col-lg-8 ms-auto">
                          <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? <Spinner /> : "Submit"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
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
};


export default  FormBasicProfileEdit;

