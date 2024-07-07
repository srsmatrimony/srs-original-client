import React from "react";
import { Link } from "react-router-dom";

const SingleProfileList = (props) => {
   const {
      _id,
      profilePic,
      firstName,
      lastName,
      religion,
      caste,
      dob,
   } = props.profile;

   const dateOfBirth=new Date(dob);
   const dobDay =dateOfBirth.getDate();
  const dobMonth =dateOfBirth.getMonth()+1 ;
  const dobYear=dateOfBirth.getFullYear();
   return (
      <div className="col-lg-12 col-xl-3">
         <Link to={`/profile-detail/${_id}`}>
         <div className="card">
            <div className="card-body">
               <div className="row m-b-30">
                  <div className="col-md-5 col-xxl-12">
                     <div className="new-arrival-product mb-4 mb-xxl-4 mb-md-0">
                        <div className="new-arrivals-img-contnent">
                           <img className="img-fluid rounded" src={profilePic} alt="Profile Pic" style={{width:"300px" , height:"350px" ,objectFit:"cover"}} />
                        </div>
                     </div>
                  </div>
                  <div className="col-md-7 col-xxl-12">
                     <div className="new-arrival-content position-relative text-center">
                        
                        <h4>
                        {firstName} &nbsp; {lastName}
                              
                          
                        </h4>
                        <p className="text-success">  {religion} &nbsp; {caste}</p>
                        
                        
                        
                        <p className="text-content"> Date Of Birth : {dobDay}-{dobMonth}-{dobYear}</p>
                        
                     </div>
                  </div>
               </div>
            </div>
         </div>
         </Link>
      </div>
   );
};

export default SingleProfileList;
