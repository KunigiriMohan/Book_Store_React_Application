
import "../Login/Login.css"
import logo from "../../assets/education.svg";
import { useEffect, useState } from "react";
import UserService from "../../service/UserService.js"

/**
 * Functional Component of Login
 * @param {*} props 
 * @returns 
 */
const Login = (props) => {

    const[errorMessage,setErrorMessage] = useState()

    const [userLogin,setUserLogin] = useState({
        email:'',
        password:''
    })

    /**
     * Function to handle input fields
     * @param {*} e 
     */
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserLogin({...userLogin, [name] : value});

    }

    /**
     * function to handle onClick signup button 
     */
    const signUp = () =>{
        props.history.push({
            pathname: "/register",
            state: null,
        });
    }

    /**
     * function to handle onClick login button 
     */
    const login = async (data) =>{
        data.preventDefault();
        let object = UserService.userLogin(userLogin);

        if ((await object).data.userId){
            console.log((await object).data.userId)
            props.history.push({
                pathname: "/home",
                state: ((await object).data.userId),
            });
        }
        setErrorMessage((await object).data.data)
    }

    /**
     * useEffect() to show error message
     */
    useEffect(() =>{
    },[errorMessage,userLogin])

    /**
     * DOM Element of Login Component
     */
    return (
        <>
            <div className="login-header">
                <img className="logo" src={logo} />
                <h1 className="head">Book Store</h1>
            </div>
            <div className="login-form">
            <h2 className="title">Login</h2>
                <form className="form-content" action=""  onSubmit={login}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input type="email" className="form-control" name="email" value={userLogin.email} id="email" onChange={handleInput} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={userLogin.password} id="password" onChange={handleInput}/>
                    </div>
                    <p className="error-message">{errorMessage}</p>
                    <span className="button">
                        <button type="submit" className="submit-button" >Login</button>
                        <button type="register"  className="signup-button" onClick={signUp}>Sign-Up</button>
                    </span>
                </form>
            </div>
        </>
    )
}

export default Login;