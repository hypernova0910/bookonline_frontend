import React, {useReducer, useEffect} from 'react';
import authReducer from "./authReducer";

import CustomerService from '../../service/CustomerService'

export const AuthContext = React.createContext(null);

export default ({ children }) => {
  // khởi tạo
  //alert(1)
//   const initData = {
//       user: JSON.parse(sessionStorage.getItem('user')),
//       role: sessionStorage.getItem('role')
//   }
  const [state, dispatch] = useReducer(authReducer, -1);

  useEffect(() => {
    CustomerService.loggedId().then((res) => {
      console.log(res.data)
      dispatch({type: "loggedId", id: res.data})
    })
  }, [])
//   const reducer = {
//     state: state,
//     dispatch: dispatch
//   }
  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
};