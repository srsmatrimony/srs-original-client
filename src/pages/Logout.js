import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Modal,Button } from 'react-bootstrap';

// actions

import { resetUserProfile } from '../store/userProfile/userProfileSlice';
import { resetProfiles } from '../store/profiles/profileSlice';
import { resetSelectedProfile } from '../store/selectedProfile/selectedProfileSlice';
import { resetInterest } from '../store/interests/interestSlice';
import { resetAccount } from '../store/account/accountSlice';
import { resetAuth } from '../store/auth/authSlice';

function LogoutPage() {
    const dispatch = useDispatch();
    
    const [basicModal, setbasicModal] = useState(false);


    
  function handleLogout() {
    setbasicModal(false);
    dispatch(resetUserProfile());
    dispatch(resetProfiles());
    dispatch(resetSelectedProfile());
    dispatch(resetInterest());
    dispatch(resetAccount());
    dispatch(resetAuth());
    localStorage.clear();

  }
  
    return(
        <>
            <Modal className="fade" show={basicModal}>
                <Modal.Header>
                    <Modal.Title>Are You Sure You want to Logout </Modal.Title>
                    <Button
                      variant=""
                      className="btn-close"
                      onClick={() => setbasicModal(false)}
                    >
                      
                    </Button>
                  </Modal.Header>
                  <Modal.Body> Click Delete if you still want to logout .. . otherwise click close</Modal.Body>
                  <Modal.Footer>
                    <Button
                      onClick={() => setbasicModal(false)}
                      variant="danger light"
                    >
                      Close
                    </Button>
            <Button variant="primary"
              onClick={handleLogout}
              
            >
              
						Logout 
            </Button>
            
                  </Modal.Footer>
            </Modal>
            <Link className="dropdown-item ai-icon" onClick={() => setbasicModal(true)}>
                <svg
                  id="icon-logout" xmlns="http://www.w3.org/2000/svg"
                  className="text-secondary" width={18} height={18} viewBox="0 0 24 24" 
                  fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1={21} y1={12} x2={9} y2={12} />
                </svg>
                <span className="ms-2" >Logout </span>
            </Link>
        </>
    )
} 


export default LogoutPage;