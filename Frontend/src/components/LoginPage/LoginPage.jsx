import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

const changeloc4k = () => {
  window.location.href = "http://localhost:4000/auth"; // Redirect to Google authentication
};

const FB = () => {
  window.location.href = "http://localhost:3003/auth/facebook";  //Redirecting to Facebook authentication
};

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [token,setToken] = useState({token:null})
  // const [isLoggedIn, setIsLoggedIn] = useState(true);

  const navigate = useNavigate();

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      }
      );

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        navigate('/');
        alert("User registered successfully");
      } else {
        if (data.message === 'Email is already registered') {
          console.error('Email is already registered. Please use a different email.');
        } else {
          console.error('Error during signup:', data.message);
        }
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };
  
  const handleLogin = async () => {
    try {
      console.log("Trying to fetch the backend of login.");
  
      const bodyContent = JSON.stringify(loginData);
  
      const response = await fetch('http://localhost:3001/logg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': bodyContent.length.toString(),
        },
        body: bodyContent,
      });
  
      const result = await response.json();
      setToken({ token: result.token });
      localStorage.setItem('token', JSON.stringify(result.token));
      console.log(result.token);
  
      if (response.ok) {
        console.log(result.user);
        console.log(result.email);
        console.log(result.user.name);
        localStorage.setItem('username',JSON.stringify(result.user.name));
        localStorage.setItem('email',JSON.stringify(result.email));
        // Perform actions after successful login, e.g., set user in state, redirect, etc.
        navigate('/home');
      } else {
        console.error('Error during login:', result);
        // navigate('/home');
      }
    } catch (error) {
      console.error('Error during login process:', error);
    }
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isSignUp) {
      setSignupData((prevData) => ({ ...prevData, [name]: value }));
    } else {
      setLoginData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

    return (
        <div>
            <head>
                {/* Your head content goes here */}
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
                <title>Login Page | NyaaySahaayak</title>
            </head>

            <body>
                  {/* SIGN UP */}

                <div className={`container ${isSignUp ? 'active' : ''}`} id="container">
                    {/* Your form containers go here */}
                    <div className="form-container sign-up">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <h1>Create Account</h1>

                            {/* For login with faceboob, google */}
                            <div className="social-icons">
                                <Link href="/" className="icon" onClick={changeloc4k}><i className="fa-brands fa-google-plus-g"></i></Link>
                                <Link href="/" className="icon" onClick={FB}><i className="fa-brands fa-facebook-f"></i></Link>
                                {/* <Link href="/" className="icon"><i className="fa-solid fa-phone"></i></Link> */}
                            </div>

                            {/* For signinp up manually */}
                            <span>or use your email for registeration</span>
                            <input type="text" name="name" placeholder="Name" onChange={handleInputChange} />
                            <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
                            <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
                            <button type="button" onClick={handleSignup} >Sign Up</button>
                        </form>
                    </div>

                      {/* LOG IN */}
                    <div className="form-container sign-in">
                        <form onSubmit={(e) => e.preventDefault()}>

                          {/* For login with facebook, google */}
                            <h1>Log In</h1>
                            <div className="social-icons">
                                <Link href="/" className="icon" onClick={changeloc4k}><i className="fa-brands fa-google-plus-g"></i></Link>
                                <Link href="/" className="icon"><i className="fa-brands fa-facebook-f"></i></Link>
                                {/* <Link href="/" className="icon"><i className="fa-solid fa-phone"></i></Link> */}
                            </div>

                            {/* Manual login */}
                            <span>or use your email password</span>
                            <input type="email" name='email' placeholder="Email" onChange={handleInputChange}/>
                            <input type="password" name='password' placeholder="Password" onChange={handleInputChange}/>
                            <a href="/">Forget Your Password?</a>
                            <button type="button" onClick={handleLogin}>Log In</button>
                        </form>
                    </div>

                      {/* For buttons in transition.. */}
                    <div className="toggle-container">
                        <div className="toggle">
                            <div className={`toggle-panel toggle-left ${!isSignUp ? 'hidden' : ''}`}>
                                <h1>Welcome Back!</h1>
                                <p>Enter your personal details to use all site features</p>
                                <button onClick={handleToggle} style={{backgroundColor: "transparent",borderColor: "#fff"}}>Log In</button>
                            </div>
                            <div className={`toggle-panel toggle-right ${isSignUp ? 'hidden' : ''}`}>
                                <h1>Hello, Friend!</h1>
                                <p>Register with your personal details to use all site features</p>
                                <button onClick={handleToggle} style={{backgroundColor: "transparent",borderColor: "#fff"}}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Your script import goes here */}
                <script src="script.js"></script>
            </body>
        </div>
    );
}
