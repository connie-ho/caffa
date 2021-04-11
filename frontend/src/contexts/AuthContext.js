import React from 'react';

export default React.createContext();

// import React, { createContext, useState, useEffect } from "react";
// import { useHistory, useLocation } from "react-router-dom";
// // import { getHashParams } from "../util/auth";

// export const AuthContext = createContext([{}, () => {}]);

// const AuthProvider = (props) => {
//   const [auth, setAuth] = useState({ loading: true, data: null });
//   const location = useLocation();
//   const history = useHistory();

//   const setAuthData = (data) => {
//     setAuth((state) => ({
//       ...state,
//       data: data,
//     }));
//   };

//   // on component mount, set the authorization data to
//   // what is found in local storage
//   useEffect(() => {
//     setAuth({
//       loading: false,
//       data: () => {
//         try {
//           return JSON.parse(window.localStorage.getItem("authData"));
//         } catch (err) {
//           console.error(err.message);
//           return null;
//         }
//       },
//     });
//   }, []);

//   // check the URL for tokens whenever it is updated
//   // if authentication tokens are found, update the
//   // authentication data and redirect
//   // useEffect(() => {
//   //   const checkTokens = () => {
//   //     // get authentication tokens from the URL
//   //     // returns null if no hash with parameters in URL
//   //     let tokens = getHashParams(location);
//   //     if (tokens && tokens.path === "error") {
//   //       alert("There was an error during authentication.");
//   //     } else if (tokens) {
//   //       setAuthData(tokens);
//   //       history.replace("/");
//   //     }
//   //   };
//   //   checkTokens();
//   // }, [location, history]);

//   // when authorization data changes, update the local storage
//   useEffect(() => {
//     window.localStorage.setItem("authData", JSON.stringify(auth.data));
//   }, [auth.data]);

//   return (
//     <AuthContext.Provider value={[auth, setAuthData]}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;