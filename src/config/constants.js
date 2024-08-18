const baseurl = "https://srs-original-server.onrender.com";
const Constants = {
  appname: "SRS",
  baseurl: baseurl,

  /// auth
  url_login: baseurl + "/api/auth/login",
  url_register: baseurl + "/api/auth/register",
  url_forgot_password: baseurl + "/api/auth/request-reset-password",
  url_reset_password: baseurl + "/api/auth/reset-password",
  url_deactivate_account: baseurl + "/api/auth/deactivate-account",
  
  /// profile
  url_profiles: baseurl + "/api/profile/profiles",
  url_user_profile: baseurl + "/api/profile/profiles/user-profile",
  url_profile_pic: baseurl + "/api/profile/profiles/profile-pic",
  url_image1: baseurl + "/api/profile/profiles/image1",
  url_image2: baseurl + "/api/profile/profiles/image2",
  url_matching_profiles: baseurl + "/api/profile/profiles/get-matching-profiles",
  url_fresh_profiles: baseurl + "/api/profile/profiles/get-fresh-profiles",
  url_sent_interest_profiles: baseurl + "/api/profile/profiles/get-sent-interest-profiles",
  url_received_interest_profiles: baseurl + "/api/profile/profiles/get-received-interest-profiles",
  url_mutual_interest_profiles: baseurl + "/api/profile/profiles/get-mutual-interest-profiles",
  
  /// interests
  url_interests: baseurl + "/api/interest/interests",
  url_sent_interests: baseurl + "/api/interest/interests/sent-interests",
  url_received_interests: baseurl + "/api/interest/interests/received-interests",
  url_mutual_interests: baseurl + "/api/interest/interests/mutual-interests",
  
  /// payment
  url_order_details: baseurl + "/api/payment/order-details",
  url_orders: baseurl + "/api/payment/orders",
  url_verify: baseurl + "/api/payment/verify",
  url_account: baseurl + "/api/payment/account"
  
  
};

export default Constants;
