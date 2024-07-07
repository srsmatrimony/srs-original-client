/// Menu
import Metismenu from "metismenujs";
import React, { Component, useContext, useEffect } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link } from "react-router-dom";
import { useScrollPosition } from "react-use-scroll-position";
import { ThemeContext } from "../../context/ThemeContext";
import LogoutPage from '../../pages/Logout';
import AccountDeactivate from "../../pages/AccountDeactivate";

/// Image
//import profile from "../../../images/profile/pic1.jpg";
//import plus from "../../../images/plus.png";

class MM extends Component {
	  componentDidMount() {
		this.$el = this.el;
		this.mm = new Metismenu(this.$el);
	  }
	  componentWillUnmount() {
	  }
	render() {
		return (
			<div className="mm-wrapper">
				<ul className="metismenu" ref={(el) => (this.el = el)}>
					{this.props.children}
				</ul>
			</div>
		);
	}
}

const SideBar = () => {
  const {
    iconHover,
    sidebarposition,
    headerposition,
    sidebarLayout,
  } = useContext(ThemeContext);
  useEffect(() => {
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");
    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }
    btn.addEventListener("click", toggleFunc);
	
	//sidebar icon Heart blast
	var handleheartBlast = document.querySelector('.heart');
        function heartBlast() {
            return handleheartBlast.classList.toggle("heart-blast");
        }
        handleheartBlast.addEventListener('click', heartBlast);
	
  }, []);
  let scrollPosition = useScrollPosition();
  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  /// Active menu
  let deshBoard = [
    "",
    "dashboard-dark",
    "guest-list",
    "guest-detail",
    "concierge",
    "room-list",
    "reviews",
    "task",
  ],
    app = [
      "app-profile",
      "post-details",
      "app-calender",
      "email-compose",
      "email-inbox",
      "email-read",
      "ecom-product-grid",
      "ecom-product-list",
      "ecom-product-order",
      "ecom-checkout",
      "ecom-invoice",
      "ecom-customers",
      "post-details",
      "ecom-product-detail",
    ],
    profiles = [
      "profiles-matching",
      "profiles-fresh",
      "profiles-sent-interest",
      "profiles-received-interest",
      "profiles-mutual-interest"
    ],
    account = [
      "account-status"
    ];
    
  return (
    <div
      className={`deznav ${iconHover} ${
        sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
          ? scrollPosition > 120
            ? "fixed"
            : ""
          : ""
      }`}
    >
      <PerfectScrollbar className="deznav-scroll">
        <MM className="metismenu" id="menu">
          <li className={`${deshBoard.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="/dashboard" >
              <i className="flaticon-025-dashboard"></i>
              <span className="nav-text">Dashboard</span>
            </Link>
     
          </li>
          <li className={`${profiles.includes(path) ? "mm-active" : ""}`}>
				    <Link className="has-arrow ai-icon" to="/profiles-matching" >
					    <i className="flaticon-045-heart"></i><span className="nav-text">Matching Profiles</span>
				    </Link>
          </li>
          <li className={`${profiles.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="/profiles-fresh" >
              <i className="flaticon-041-graph"></i>
              <span className="nav-text">New Profiles</span>
            </Link>
     
          </li>

          <li className={`${profiles.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="/profiles-sent-interest" >
              <i className="flaticon-045-heart"></i>
              <span className="nav-text">Interest Sent</span>
            </Link>
          </li>

           <li className={`${profiles.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="/profiles-received-interest" >
              <i className="flaticon-086-star"></i>
              <span className="nav-text">Interest Received</span>
            </Link>
          </li>
          
          <li className={`${profiles.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="/profiles-mutual-interest" >
              <i className="flaticon-013-checkmark"></i>
              <span className="nav-text">Mutual Interests</span>
            </Link>
          </li>

          <li className={`${account.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="/account-status" >
              <i className="flaticon-087-stop"></i>
              <span className="nav-text">Account Details</span>
            </Link>
          </li>
          <li className={`${app.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="/app-profile" >
              <svg
						  id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-white"
						  width={25} height={25} viewBox="0 0 24 24" fill="none"
						  stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
						>
						  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
						  <circle cx={12} cy={7} r={4} />
						</svg>
              <span className="nav-text">Your Profile</span>
            </Link>
          </li>
          <li>
            {/* <Link className="has-arrow ai-icon" > */}
              {/* <i className="fa fa-ban"></i>
              <span className="nav-text">Deactivate Your SRS Account</span> */}
              <AccountDeactivate  />

            {/* </Link> */}
            
            
          </li>
          <li >
            <LogoutPage className="text-white"/>
            </li>

         
        </MM>
		<div className="copyright">
			<p><strong>Exiant Technologies</strong> © 2022 All Rights Reserved</p>
			<p className="fs-12">Made with <span className="heart"></span> by Exiant </p>
		</div>
      </PerfectScrollbar>
    </div>
  );
};

export default SideBar;
