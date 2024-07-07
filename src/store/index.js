import { configureStore } from '@reduxjs/toolkit'

//reducers
import authReducer from './auth/authSlice';
import userProfileReducer from './userProfile/userProfileSlice';
import profilesReducer from './profiles/profileSlice'
import selectedProfileReducer from './selectedProfile/selectedProfileSlice';
import interestReducer from './interests/interestSlice';
import accountReducer from './account/accountSlice';

// middleware localstorage
const localStorageMiddleware = ({ getState }) => {
  return next => action => {
    const result = next(action);
    localStorage.setItem('applicationState', JSON.stringify(getState()));
    return result;
  };
};

const reHydrateStore = () => {
  if (localStorage.getItem('applicationState') !== null) {
    return JSON.parse(localStorage.getItem('applicationState')); // re-hydrate the store
  }
};


const store = configureStore({
    reducer: {
        auth: authReducer,
        userProfile: userProfileReducer,
        profiles: profilesReducer,
        selectedProfile: selectedProfileReducer,
        interest: interestReducer,
        account:accountReducer
    },

    preloadedState: reHydrateStore(),
    
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([localStorageMiddleware]),
    
    
})


export default store
