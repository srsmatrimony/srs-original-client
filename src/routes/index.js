import React, { useContext} from 'react'
import { Routes, Route ,Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


/// styles
import "./index.css";
import "./chart.css";
import "./step.css";

/// import routes 

import { publicRoutes ,authProtectedRoutes} from './routes';

/// theme context

import {ThemeContext} from '../context/ThemeContext'

/// layouts

import Footer from '../layouts/Footer';
import  Nav  from '../layouts/nav';

const Markup = () => {
    
    const { menuToggle } = useContext(ThemeContext);

    // console.log(menuToggle);

    // let path = window.location.pathname;

    // path = path.split("/");
    // path = path[path.length - 1];
    // let pagePath = path.split("-").includes("page");
    
    const token = useSelector(state => state.auth.token);
    

  return (
      <>
          <div
              id={`${token ? "main-wrapper" : ""}`}
              className={`${token ? "show" : "vh-100"}  ${
                  menuToggle ? "menu-toggle" : ""
                  }`}
          >
              {token && <Nav />}
              <div className={`${token ? "content-body" : ""}`}>
                  <div
                      className={`${token ? "container-fluid" : ""}`}
                      style={{ minHeight: window.screen.height - 60 }}
                  >
                      
    
                      <Routes>
                          {
                              publicRoutes.map((route, idx) => {
                                  if (!token) {
                                      return <Route
                                          key={idx}
                                          path={`/${route.path}`}
                                          element={<route.element />}
                    
                                      />
                                  }
                                  else {
                                      return <Route
                                          key={idx}
                                          path={`/${route.path}`}
                                          element={<Navigate to='/dashboard' />}
                                          
                                      />

                                  }

                              }
                              )
                            } 
                            {
                              authProtectedRoutes.map((route, idx) => {
                                  if (token) {
                                      return <Route
                                          key={idx}
                                          path={`/${route.path}`}
                                          element={<route.element />}
                    
                                      />
                                  }
                                  else {
                                      return <Route
                                          key={idx}
                                          path={`/${route.path}`}
                                          element={<Navigate to='/page-login' />}
                                          
                                      />

                                  }

                              })
                                
                            }
              
                      </Routes>
                  </div>        
              </div>
              {token && <Footer />}
              
          </div>
          
      </>
  )
}

export default Markup
