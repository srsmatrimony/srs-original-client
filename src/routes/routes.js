import {Navigate} from 'react-router-dom'

/// pages

import Login from "../pages/Login";
import Registration from "../pages/Registration";
import RegisterSuccessNext from "../pages/RegisterSuccessNext";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import PasswordMailsendStatus from '../pages/PasswordMailsendStatus';
import PasswordUpdateStatus from '../pages/PasswordUpdateStatus';

// import Error404 from "../pages/Error404";

/// dashboard

import Home from "../pages/Dashboard/Home";

/// forms

import FormBasicProfileAdd from "../pages/Forms/formBasicProfileAdd";
import FormBasicProfileEdit from '../pages/Forms/formBasicProfileEdit';
import FormAdvanceProfileAdd from "../pages/Forms/formAdvanceProfileAdd";
import FormAdvanceProfileEdit from "../pages/Forms/formAdvanceProfileEdit";

/// apps menu

import AppProfile from "../pages/AppsMenu/AppProfile/AppProfile";

/// profiles

import ProfilesMatching from "../pages/AppsMenu/Profiles/ProfileList/ProfilesMatching";
import ProfilesFresh from "../pages/AppsMenu/Profiles/ProfileList/ProfilesFresh";
import ProfilesInterstSent from "../pages/AppsMenu/Profiles/ProfileList/ProfilesInterestSent";
import ProfilesInterestReceived from "../pages/AppsMenu/Profiles/ProfileList/ProfilesInterestReceived";
import ProfilesInterestMutual from "../pages/AppsMenu/Profiles/ProfileList/ProfilesInterestMutual";
import ProfilesSearch from '../pages/AppsMenu/Profiles/ProfileList/ProfilesSearch';
import ProfileDetail from "../pages/AppsMenu/Profiles/ProfileDetail";

/// account

import AccountStatus from "../pages/AppsMenu/Account/AccountStatus";
import ActivateAccount from "../pages/AppsMenu/Account/ActivateAccount";
import AccountActivationSuccess from '../pages/AppsMenu/Account/AccountActivationSuccess';

/// test pages

import TestPage from "../pages/TestPage";


const publicRoutes = [
    { path: 'page-login', element: Login },
    { path: 'page-register', element: Registration },
    { path: 'page-register-success-next', element: RegisterSuccessNext },
    { path: 'page-forgot-password', element: ForgotPassword },
    { path: 'page-reset-password', element: ResetPassword },
    { path: 'page-password-mailsend-status', element: PasswordMailsendStatus },
    { path: 'page-password-update-status', element: PasswordUpdateStatus },
    
    // { path: '*', element: Error404 }
    
]

const authProtectedRoutes = [
    /// dashboard
    { path: '/', element: () => <Navigate to='/dashboard' /> },
    { path: 'dashboard', element: Home },
    
    ///form
    { path: 'form-add-basic-profile', element: FormBasicProfileAdd },
    { path: 'form-edit-basic-profile', element: FormBasicProfileEdit },
    { path: 'form-add-advance-info', element: FormAdvanceProfileAdd },
    { path: 'form-edit-advance-info', element: FormAdvanceProfileEdit },
    
    /// user profile
    { path: 'app-profile', element: AppProfile },
    
    /// profiles
    { path: 'profiles-matching', element: ProfilesMatching },
    { path: 'profiles-fresh', element: ProfilesFresh },
    { path: 'profiles-sent-interest', element: ProfilesInterstSent },
    { path: 'profiles-received-interest', element: ProfilesInterestReceived },
    { path: 'profiles-mutual-interest', element: ProfilesInterestMutual },
    { path: 'profiles-search', element: ProfilesSearch },
    { path: 'profile-detail/:id', element: ProfileDetail },
    
    /// account 
    { path: 'activate-account', element: ActivateAccount },
    { path: 'account-status', element: AccountStatus },
    { path: 'activate-account-success', element: AccountActivationSuccess },
    
    /// test

    { path: 'test-testpage', element: TestPage }
    
    
]

export { publicRoutes, authProtectedRoutes }

