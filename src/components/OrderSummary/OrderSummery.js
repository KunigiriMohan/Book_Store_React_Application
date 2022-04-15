import React from "react";
import logo from "../../assets/education.svg";
import cart from "../../assets/supermarket.svg";
import { useState,useEffect } from "react";
import BookStoreCartService from "../../service/BookStoreCartService";
import image from "../../assets/Group 4132.svg"
import "../OrderSummary/Ordersummary.css"

const OrderSummary = (props) => {

    const [count, setCount] = useState();

    const data = props.location.state;

    

    const userid = props.location.state.userid;
    const homeRedirect = () => {
        props.history.push({
            pathname: "/home",
            state: data.userId,
        });
    }

    const cartRedirect = () => {
        props.history.push({
            pathname: "/cart",
            state: data.userId,
        });
    }
    const redirectToHomePage =()=>{
        props.history.push({
            pathname: "/home",
            state: data.userId,
        });
    }

    useEffect(() => {
        BookStoreCartService.noofBooksPresentinCart(data.userId).then((data) => { setCount(data.data) });
    },[]);

    return (
        <>
            <header>
                <img className="header-logo1" src={logo} onClick={homeRedirect} />
                <h2>Book Store</h2>
                <img className="cart-image1" src={cart} onClick={cartRedirect} /><div className="cart-count">{count}</div>
            </header>
            <div className="order-summary-main">
                <img className="order-success-image" src={image}></img>
                <strong><h2 className="order-success-message">Order Placed Successfully</h2></strong>
                <p className="order-id-message">hurray!!! your order is confirmed the order id is <strong>#{data.orderId}</strong> save the order id for further communication..</p>
                <table className="order-success-table">
                    <tr className="table-row">
                        <td className="table-heading">Email Us</td>
                        <td className="table-heading">Contact us</td>
                        <td className="table-heading">Address</td>
                    </tr>
                    <tr>
                        <td className="table-heading">admin@bookstore.com</td>
                        <td className="table-heading">+91 8163475881</td>
                        <td className="table-heading">42, 14th Main, 15th Cross, Sector 4 ,opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore 560034</td>
                    </tr>
                </table>
                <button className="continue-shopping" onClick={redirectToHomePage}>Contine Shopping</button>
            </div>
        </>
    )
}

export default OrderSummary;