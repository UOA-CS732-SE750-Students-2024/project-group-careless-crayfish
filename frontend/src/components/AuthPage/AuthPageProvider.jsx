import * as React from "react";
import { useNavigate,Navigate } from "react-router-dom";
import { useAPI, useAuth, useLocalStorage } from "../GlobalProviders";
import { useState } from "react";
import FlexBox from '../FlexBox'
import { GoogleLoginButton } from 'react-social-login-buttons'
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth'
import './LoginStyles.css'
GoogleAuth.initialize({
  clientId: '1072715892589-79a0l62lbjqr0cl6bvsij2t53n3hb1oj',
  scopes: ['profile', 'email'],
  grantOfflineAccess: true,
});
const AuthPageContext = React.createContext({});

export const useAuthPage = () => React.useContext(AuthPageContext);


const AuthPageProvider = () => {
  const { get, post } = useAPI();
  const { isAuthenticated, login,getUserById } = useAuth();
  const { setItem } = useLocalStorage();
  const [formData,setFormData]=useState({
     userName:'',
     email:'',
     password:'',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value  
    }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await post('http://localhost:3000/api/users', formData);
        console.log(formData);
        setFormData({ userName: '', email: '', password: '' }); // Reset form
    } catch (error) {
        console.error('Error creating user:',error);
    }
};

  const handleGoogleLogin = async () => {
    const response = await GoogleAuth.signIn()
    if (!response) {
      return
    }
    await handleLogin('google', response)
  };


  const handleUserEmail = (email) => {
    return email.includes('privaterelay.appleid.com') ? '' : email
  };
  const handleLogin = async (
    loginType, response
  ) => {
    console.log(response);
    const personInfo = {
      email: response.email,
      givenName: response.givenName,
      familyName: response.familyName,
      name: response.name,
      imageUrl: response.imageUrl,
      token: response.authentication.accessToken
    };
    setItem('lt', loginType);
    setItem('ue', handleUserEmail(personInfo.email));
    setItem('gn', personInfo.givenName);
    setItem('token', personInfo.token);
    login();
  };

  const [isToggled, setToggled] = useState(false);
  const [isActive, setActive] = useState(false);

  const preventDefault = (e) => {
    e.preventDefault();
  };

  const changeForm = () => {
    setActive(true);
    setToggled(!isToggled);
    setTimeout(() => {
      setActive(false);
    }, 1500);
  };


  return (
    <AuthPageContext.Provider value={{}}>
      {isAuthenticated ? (
        <Navigate to="/authenticated" />
      ) : (
        <div className="shell">
          <div className={`container ${isToggled ? 'b-container' : 'a-container'}`} id={isToggled ? "b-container" : "a-container"}>

            <form className="form" onSubmit={handleSubmit}>
              {isToggled? <input type="text" className="form_input" placeholder="userName" name="userName" onChange={handleChange}  />:"" }

              <input type="email" className="form_input" placeholder="Email"   name="email"onChange={handleChange}/>
              <input type="password" className="form_input" placeholder="Password" name="password"onChange={handleChange} />

              {isToggled ? <button type="submit" className="button submit" >SIGN UP</button>
               :
              <button type="submit"className="button submit">SIGN IN</button> }
            </form>
            <div className="google-login-container">
               {isToggled ? "" :<FlexBox justifyContent="center">
                <GoogleLoginButton
                  className="google-login-button"
                  text="Continue with Google"
                  onClick={() => handleGoogleLogin()}
                />
              </FlexBox>}
            </div>
           
          </div>

          <div className="switch" id="switch-cnt">
            <div className="switch_circle"></div>
            <div className="switch_circle switch_circle-t"></div>
            <div className={`switch_container ${isToggled ? "" : "is-hidden"}`} id="switch-c1">
              <h2 className="title">Welcome Back！</h2>
              <p className="description">
                Already have an account? Log in to enter the wonderful world!</p>
              <button className="button submit" onClick={changeForm}>SIGN IN</button>
            </div>

            <div className={`switch_container ${isToggled ? "is-hidden" : ""}`} id="switch-c2">
              <h2 className="title">Hello Friend！</h2>
              <p className="description">Register an account and become a prestigious fan member, let us embark on a wonderful journey!</p>
              <button className="button submit" onClick={changeForm}>SIGN UP</button>
            </div>
          </div>
        </div>
      )}
    </AuthPageContext.Provider>
  );
};

export default AuthPageProvider;