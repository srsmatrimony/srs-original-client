import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { Modal,Button } from 'react-bootstrap';

// components
import swal from 'sweetalert';

// actions
import { deactivateAccount } from '../store/auth/authActions';
import { resetUserProfile } from '../store/userProfile/userProfileSlice';
import { resetProfiles } from '../store/profiles/profileSlice';
import { resetSelectedProfile } from '../store/selectedProfile/selectedProfileSlice';
import { resetInterest } from '../store/interests/interestSlice';
import { resetAccount } from '../store/account/accountSlice';
import { resetAuth } from '../store/auth/authSlice';

const AccountDeactivate = () => {
    const dispatch = useDispatch();
    
  const [basicModal, setbasicModal] = useState(false);
  const [_id, set_id] = useState('');
  const { userInfo, token } = useSelector(state => state.auth);
  const { userProfile } = useSelector(state => state.userProfile);


  useEffect(() => {
    if (userInfo) {
      set_id(userInfo._id)

    }
  }, [userInfo]);
  
  
  const handleDeactivate = () => {
    setbasicModal(false);
    if (userProfile) {
      swal("Alert", "You already have an active profile. First delete your profile for account deactivation");
      return;
        
    }
    
    dispatch(deactivateAccount({ _id, token }));
    dispatch(resetUserProfile());
    dispatch(resetProfiles());
    dispatch(resetSelectedProfile());
    dispatch(resetInterest());
    dispatch(resetAccount());
    dispatch(resetAuth());

  }
  
    return (
        <>
            <Modal className="fade" show={basicModal}>
                <Modal.Header>
                    <Modal.Title>Are You Sure You want to Deactivate Your SRS Account </Modal.Title>
                    <Button
                      variant=""
                      className="btn-close"
                      onClick={() => setbasicModal(false)}
                    >
                      
                    </Button>
                  </Modal.Header>
                  <Modal.Body> Once Your Account is Deactivated, you can never get it back. Click Delete if you still want to logout .. . otherwise click close</Modal.Body>
                  <Modal.Footer>
                    <Button
                      onClick={() => setbasicModal(false)}
                      variant="danger light"
                    >
                      Close
                    </Button>
            <Button variant="primary"
              onClick={handleDeactivate}
              
            >
              
						Deactivate
            </Button>
            
                  </Modal.Footer>
            </Modal>

            <Link className="dropdown-item ai-icon" onClick={() => setbasicModal(true)}>
                <svg
                  id="icon-logout" xmlns="http://www.w3.org/2000/svg"
                  className="text-danger" width={18} height={18} viewBox="0 0 24 24" 
                  fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                >
                      <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/>
                    
                </svg>
                
              
                   <span className="ms-2" >Deactivate</span>
                
               <p> SRS Account</p> 
           
                
            </Link>
      
        </>
    )
}

export default AccountDeactivate
