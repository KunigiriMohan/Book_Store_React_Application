import React from "react";
import logo from "../../assets/education.svg";
import cart from "../../assets/supermarket.svg";
import { useState,useEffect } from "react";
import BookStoreCartService from "../../service/BookStoreCartService";
import image from "../../assets/Group 4132.svg"
import "../OrderSummary/Ordersummary.css"
import WishListService from "../../service/WishListService";
import wishList from "../../assets/heart-492.png";

/**
 * Function Component of OrderSummary
 * @param {*} props 
 * @returns 
 */
const OrderSummary = (props) => {

    const [count, setCount] = useState();

    const data = props.location.state;

    const [bookInWishList,setBooksInWishList] =useState([]);

     /**
     * Function to handle Home redirect icon in header
     */
    const homeRedirect = () => {
        props.history.push({
            pathname: "/home",
            state: data.userId,
        });
    }

    /**
     * Function to handle cart redirect icon in header
     */
    const cartRedirect = () => {
        props.history.push({
            pathname: "/cart",
            state: data.userId,
        });
    }

     /**
     * Function to handle Home redirect icon in header
     */
    const redirectToHomePage =()=>{
        props.history.push({
            pathname: "/home",
            state: data.userId,
        });
    }

    /**
     * Function to handle wishlist redirect icon in header
     */
    const wishListRedirect = () =>{
        props.history.push({
            pathname: "/wishlist",
            state: data.userId,
        });
    }

    /**
     * useEffect() to load books count present in cart
     */
    useEffect(() => {
        BookStoreCartService.noofBooksPresentinCart(data.userId).then((data) => { setCount(data.data) });
    },[]);

    /**
     * useEffect() to load books count present in wishlist
     */
    useEffect(() =>{
        WishListService.getBookByUserId(data.userId).then((data) =>{setBooksInWishList(data.data)})
    },[bookInWishList])

    /**
     * DOM element of OrderSummary page
     */
    return (
        <>
            <header>
                <img className="header-logo1" src={logo} onClick={homeRedirect} />
                <h2>Book Store</h2>
                <img className="cart-image1" src={cart} onClick={cartRedirect} /><div className="cart-count">{count}</div>
                <img className="wishlist-image" src={wishList} onClick={wishListRedirect} /><div className="cart-count">{bookInWishList.length}</div>
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