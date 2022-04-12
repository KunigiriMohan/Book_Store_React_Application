import react from "react";
import logo from "../../assets/education.svg";
import cart from "../../assets/supermarket.svg";
import { useEffect, useState } from "react";
import BookStoreCartService from "../../service/BookStoreCartService";
import "../Details/CustomerDetails.css";
import UserService from "../../service/UserService";

const CustomerDetails = (props) => {
    const userid = props.location.state;
    const [count, setCount] = useState();
    const [user,setUser] = useState({
        name:'',
        mobileNumber:'',
        pinCode:'',
        locality:'',
        address:'',
        city:'',
        landmark:''
    });
    const cartRedirect = () => {
        props.history.push({
            pathname: "/cart",
            state: userid,
        });
    }

    const homeRedirect = () => {
        props.history.push({
            pathname: "/home",
            state: userid,
        });
    }

    const handleInput = (e) =>{
        const name = e.target.name;
        const value = e.target.value
        setUser({...user, [name]: value})
      
    }
    useEffect(() => {
        BookStoreCartService.noofBooksPresentinCart(userid).then((data) => { setCount(data.data) });
        
    }, [count]);

    useEffect(() =>{
        UserService.getUserbyId(userid).then((data) => {console.log(data.data);setUser({...user,...data, name:data.data.name,mobileNumber:data.data.mobileNumber,
        pinCode:data.data.pinCode,locality:data.data.locality,address:data.data.address,city:data.data.city,landmark:data.data.landmark})});
    },[])


    return (
        <>
            <header>
                <img className="header-logo1" src={logo} onClick={homeRedirect} />
                <h2>Book Store</h2>
                <img className="cart-image1" src={cart} onClick={cartRedirect}/><div className="cart-count">{count}</div>
            </header>
            <div className="details-content">
                <h2 className="details-header">Customer Details</h2>
                <form className="details-form">
                    <input type="text" className="details-row-content" name="name" placeholder="Name" value={user.name} onChange={handleInput}></input>
                    <input type="text" className="details-row-content" name="mobileNumber" placeholder="Phone Number"value={user.mobileNumber} onChange={handleInput}></input>
                    <input type="text" className="details-row-content" name="pinCode" placeholder="Pin Code" value={user.pinCode} onChange={handleInput}></input>
                    <input type="text" className="details-row-content" name="locality" placeholder="Locality" value={user.locality} onChange={handleInput}></input>
                    <input type="text" className="details-row" name="address" placeholder="Address" value={user.address} onChange={handleInput}></input>
                    <input type="text" className="details-row-content" name="city" placeholder="City" value={user.city} onChange={handleInput}></input>
                    <input type="text" className="details-row-content" name="landmark" placeholder="Landmark" value={user.landmark} onChange={handleInput}></input>
                    <p className="type-text">Type</p>
                    <input className="radio" type="radio" id="type" name="type" onChange={handleInput}></input>
                    <label className="type-label-text">Home</label>
                    <input className="radio" type="radio" id="type" name="type" onChange={handleInput}></input>
                    <label className="type-label-text">Work</label>
                    <input className="radio" type="radio" id="type" name="type" onChange={handleInput}></input>
                    <label className="type-label-text">Other</label>
                    <button className="continue-button">Continue</button>
                </form>
            </div>
        </>
    )
}
export default CustomerDetails;