import react from "react";
//import "../Login/Login.css"
import logo from "../../assets/education.svg";
import { useEffect, useState } from "react";
import UserService from "../../service/UserService.js"
import "../Login/SignUp.css"
const Signup = (props) => {

    const [userSignUp, setuserSignUp] = useState({
        name: "",
        lastName: '',
        mobileNumber: '',
        landmark:'',
        locality:'',
        address:"",
        city: '',
        pinCode:'',
        country: "",
        email: '',
        password: ''
    })

    const [error,setError] = useState({
        name: "",
        lastName: '',
        mobileNumber: '',
        landmark:'',
        locality:'',
        address:"",
        city: '',
        pinCode:'',
        country: "",
        email: '',
        password: ''
    })
    const [errorMessage, setErrorMessage] = useState()

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setuserSignUp({
            ...userSignUp
            , [name]: value
        });
        validate(e);
    }

    const validate = (e) => {
        const regexName = /^[A-Z]{1}[a-zA-Z]{2,}$/;
        const regexMobile = /^[6-9]{1}[0-9]{9,}$/;
        const regexEmail = /^[a-zA-Z0-9_+/#$%?~.-]+@[a-zA-Z0-9.-]+[.]+[a-zA-Z1-9]{1,}$/;
        const pinCodeRegex = /[0-9]{6}/
        
        if (e.target.name == "name"){
            if (!regexName.test(e.target.value))
            var error = "Enter a valid First Name";
            setError({name: error })
        }

        if (e.target.name == "email"){
            if (!regexEmail.test(e.target.value))
            var error = "Enter a valid Email";
            setError({email: error })
        }

        if (e.target.name == "mobileNumber"){
            if (!regexMobile.test(e.target.value))
            var error = "Enter valid Mobile Number";
            setError({mobileNumber: error })
        }
        if (e.target.name == "landmark"){
            if (!(e.target.value))
            var error = "Enter valid Landmark";
            setError({landmark: error })
        }
        if (e.target.name == "locality"){
            if (!(e.target.value))
            var error = "Enter valid Locality";
            setError({locality: error })
        }
        if (e.target.name == "address"){
            if (!(e.target.value))
            var error = "Enter valid address";
            setError({address: error })
        }

        if (e.target.name == "city"){
            if (!(e.target.value))
            var error = "Enter valid city name";
            setError({city: error })
        }

        if (e.target.name == "pinCode"){
            if (!(pinCodeRegex.test(e.target.value)))
            var error = "Enter valid Pin Code";
            setError({pinCode: error })
        }
        if (e.target.name == "country"){
            if (!(e.target.value))
            var error = "Enter valid country name";
            setError({country: error })
        }

        if (e.target.name == "password"){
            if (!(e.target.value))
            var error = "Enter valid password";
            setError({password: error })
        }

            
    }

    const signup = async (data) => {
        data.preventDefault();
        let object = UserService.userRegister(userSignUp
        );

        console.log(object)
        if ((await object).data.id) {
            alert("User registered Successfully");
            window.location.assign(`http://localhost:3000/`)
        }
        setErrorMessage((await object).data.data)
    }

    return (
        <>
            <div className="signup-header">
                <img className="logo" src={logo} />
                <h1 className="head">Book Store</h1>
            </div>
            <div className="login-form">
                <h2 className="title">Sign Up</h2>
                <form className="form-content" action="" onSubmit={signup}>
                    <div className="row-content">
                        <label htmlFor="name" className="signup-label">Name</label>
                        <input type="text" className="signup-control" name="name" value={userSignUp
                            .name} id="name" onChange={handleInput} />
                    </div>
                    <p className="error-message2">{error.name}</p>
                    <div className="row-content">
                        <label htmlFor="mobile" className="signup-label">Mobile Number</label>
                        <input type="text" className="signup-control" name="mobileNumber" value={userSignUp
                            .mobileNumber} id="mobileNumber" onChange={handleInput} />
                            
                    </div>
                    <p className="error-message2">{error.mobileNumber}</p>
                    <div className="row-content">
                        <label htmlFor="email" className="signup-label">Email Address</label>
                        <input type="text" className="signup-control" name="email" value={userSignUp
                            .email} id="email" onChange={handleInput} />
                            
                    </div>
                    <p className="error-message2">{error.email}</p>
                    <div className="row-content">
                        <label htmlFor="landmark" className="signup-label">Landmark</label>
                        <input type="text" className="signup-control" name="landmark" value={userSignUp
                            .landmark} id="landmark" onChange={handleInput} />
                            
                    </div>
                    <p className="error-message2">{error.landmark}</p>
                    <div className="row-content">
                        <label htmlFor="locality" className="signup-label">Locality</label>
                        <input type="text" className="signup-control" name="locality" value={userSignUp
                            .locality} id="locality" onChange={handleInput} />
                            
                    </div>
                    <p className="error-message2">{error.locality}</p>

                    <div className="row-content">
                        <label htmlFor="address" className="signup-label">Address</label>
                        <input type="text" className="signup-control" name="address" value={userSignUp
                            .address} id="address" onChange={handleInput} />
                            
                    </div>
                    <p className="error-message2">{error.address}</p>
                    

                    <div className="row-content">
                        <label htmlFor="city" className="signup-label">City</label>
                        <input type="text" className="signup-control" name="city" value={userSignUp
                            .city} id="city" onChange={handleInput} />
                            
                    </div>
                    <p className="error-message2">{error.city}</p>

                    <div className="row-content">
                        <label htmlFor="pinCode" className="signup-label">PinCode</label>
                        <input type="text" className="signup-control" name="pinCode" value={userSignUp
                            .pinCode} id="pinCode" onChange={handleInput} />
                            
                    </div>
                    <p className="error-message2">{error.pinCode}</p>

                    <div className="row-content">
                        <label htmlFor="country" className="signup-label">Country</label>
                        <input type="text" className="signup-control" name="country" value={userSignUp
                            .country} id="country" onChange={handleInput} />
                            
                    </div>
                    <p className="error-message2">{error.country}</p>
                    <div className="row-content">
                        <label htmlFor="password" className="signup-label">Password</label>
                        <input type="password" className="signup-control" name="password" value={userSignUp
                            .password} id="name" onChange={handleInput} />
                            
                    </div>
                    <p className="error-message2">{error.password}</p>
                    <p className="error-message1">{errorMessage}</p>
                    <span className="button">
                        <button type="submit" className="signup-button1" >Sign-Up</button>
                    </span>
                </form>
            </div>
        </>
    )
}

export default Signup;