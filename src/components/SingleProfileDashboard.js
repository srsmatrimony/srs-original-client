import React from 'react'

const SingleProfileDashboard = (props) => {
    const {
        profilePic,
        firstName,
        lastName,
        createdAt,
        aboutMe
    } = props.profile;
    

    const createdDate = new Date(createdAt);
    const Day =createdDate.getDate();
    const Month = createdDate.getMonth() + 1;
    const Year = createdDate.getFullYear();
    const Hours = createdDate.getHours();
    const Minutes = createdDate.getMinutes();
    
    
  return (
    <div className="dz-review-bx" >
          <img className="dz-media me-4" src={profilePic} alt="profile-pic" />
          <div className="dz-info">
              <div className="dz-name mb-3">
                  <div>
                      <h6 className="title mb-1">{`${firstName} ${lastName}`}</h6>
                      <span className="date text-black op8">Joined on {`${Day}/${Month}/${Year}`} , at {`${Hours}:${Minutes}`}</span>
                  </div>
              </div>
              <div >
                  <p className="text-black op8 mb-sm-0 mb-3 me-4">{ aboutMe?aboutMe:"The user need to 'add about me' aspect"}</p>
                  
              </div>
              <div className="dz-footer">
                  <span className="review-icon rounded-circle btn-success me-3"  ><i className="far fa-check-circle"></i></span>  
              </div>
          </div>
      </div>
      
  )
}

export default SingleProfileDashboard
