import React, { useState, useEffect } from 'react';
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from 'react-redux';

/// components
import SingleProfileDashboard from './SingleProfileDashboard';
import LoadingScreen from './LoadingScreen';

//actions
import { getUserProfile } from '../store/userProfile/userProfileActions';
import { getMatchingProfiles } from '../store/profiles/profileActions';


const PremiumProfiles = () => {
	
	const dispatch = useDispatch();

	const { token } = useSelector(state => state.auth);
	
	
	const { userProfile } = useSelector(state => state.userProfile);

	useEffect(() => {
		if (userProfile) {
			const _id = userProfile._id;
			dispatch(getMatchingProfiles({ _id, token }))
    }
	}, [dispatch, userProfile,token]);


	const { loading, matchingProfiles } = useSelector(state => state.profiles);
	
	useEffect(() => {
		if (matchingProfiles) {
			const tempProfiles = matchingProfiles.filter(profile => profile.accountStatus);
			setData(tempProfiles);
		}
	}, [matchingProfiles]);


	const [data, setData] = useState(null);
	// This is load more function
	
	if (loading) {
		return (
			<div>
				<LoadingScreen />
			</div>
		)
	}
	else {
		


		return (
			<>
				<div className="card">
					<div className="card-header border-0">
						<h4 className="card-title">Premium Profiles</h4>
					</div>
					<PerfectScrollbar className="card-body customer-review-bx p-0 dz-scroll loadmore-content" id="customerReviewContent">
						{userProfile ?
							data ? data.map(profile => <SingleProfileDashboard key={profile.id} profile={profile} />) :
								<div className="text-danger text-center ">
									No profiles found. please wait a while for new profiles	
								</div>
							:
							<div className="text-danger text-center ">
									Please Add Your Profile To View This. 
							</div>
							
						}
					</PerfectScrollbar>
				
				</div>
			
			</>
		)
	}

} 
export default PremiumProfiles;
