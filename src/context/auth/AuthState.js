import React, {useState} from "react";
import AuthContext from "./AuthContext";
import Alert from "../../components/Alert";

const AuthState = (props) => {
  const [user, setUser] = useState();

  const setUserAuth = (auth) => {
    setUser(auth);
  };

  // Show messages code starts here
  // Note: It doesn't belong here. Needs to be moved to a separate context or component.
  const [alert, setAlert] = useState();

  const showAlert = (message, type) => {
    setAlert({
      show: true,
      message: message,
      type: type,
    });
    setTimeout(() => {
      hideAlert();
    }, 5000);
  };

  const hideAlert = () => {
    setAlert({
      show: false,
      message: "",
      type: "",
    });
  };

  return (
    <AuthContext.Provider value={{ user, setUserAuth, showAlert }}>
      <Alert alert={alert} hideAlert={hideAlert} />
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
