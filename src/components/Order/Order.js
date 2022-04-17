import React from "react";
import logo from "../../assets/education.svg";
import cart from "../../assets/supermarket.svg";
import { useEffect, useState } from "react";
import BookStoreCartService from "../../service/BookStoreCartService";
import "../Details/CustomerDetails.css";
import UserService from "../../service/UserService";
import design from "../../assets/designof.png"
import groupdiscussion from "../../assets/groupdiscussion.png"
import learnux from "../../assets/learnux.png"
import react from "../../assets/react.png";
import sharepoint from "../../assets/sharepoint.png";
import UXdesign from "../../assets/UXdesign.png";
import dmmt from "../../assets/dontmake.png";
import "../Order/Order.css"
import WishListService from "../../service/WishListService";
import wishList from "../../assets/heart-492.png";

/**
 * Function Component of Order
 * @param {*} props  
 */
const Order = (props) => {

    const userid = props.location.state;
    const [count, setCount] = useState();
    const [user, setUser] = useState({
        name: '',
        mobileNumber: '',
        pinCode: '',
        locality: '',
        address: '',
        city: '',
        landmark: ''
    });


    const idOfOrder = Math.floor(Math.random()*900000) + 100000;

    const [cartTotal, setCartTotal] = useState();

    const [bookList, setBookList] = useState([]);

    const [bookInWishList,setBooksInWishList] =useState([]);

    const [parameters ,setParameters] =useState({
        userId:userid,
        orderId:idOfOrder
    })

    const [editEnabled, setEditEnabled] = useState(
        {
            edit: true
        }
    );

    /**
     * Function to handle remove book from cart event 
     * @param {} id 
     */
    const removeBookFromCart = (id) => {
        BookStoreCartService.removeBookFromCart(id);
        props.history.push({
            pathname: "/order",
            state: userid,
        });
    }

     /**
     * Function to handle increasing quantity of books event 
     * @param {*} bookId 
     * @param {*} quantity 
     */
    const addBook = (bookId, quantity) => {
        BookStoreCartService.updateBooksinCart(bookId, quantity + 1);
    }

    /**
     * Function to handle decreasing books quantity from cart event 
     * @param {*} bookId 
     * @param {*} quantity 
     */
    const deleteBook = (bookId, quantity) => {
        quantity === 1 ? BookStoreCartService.removeBookFromCart(bookId) :
            BookStoreCartService.updateBooksinCart(bookId, quantity - 1);
    }

     /**
     * Function to handle cart redirect icon in header
     */
    const cartRedirect = () => {
        props.history.push({
            pathname: "/cart",
            state: userid,
        });
    }

    /**
     * Function to handle WishList redirect icon in header
     */
    const wishListRedirect = () =>{
        props.history.push({
            pathname: "/wishlist",
            state: userid,
        });
    }

    /**
     * Function to handle Home redirect icon in header
     */
    const homeRedirect = () => {
        props.history.push({
            pathname: "/home",
            state: userid,
        });
    }

    /**
     * Function to Handle the input field in the edit form
     * @param {*} e 
     */
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value
        setUser({ ...user, [name]: value })

    }

    /**
     * Function to handle onClick edit button in user details edit field
     * @param {*} e 
     */
    const enableEdit = (e) => {
        setEditEnabled(e);
    }

    /**
     * Function to handle onClick contine button 
     * @param {*} e 
     */
    const checkOut = () => {
        if(bookList.length===0){
            alert("No Books Present in the cart to checkout!");
            props.history.push({
                pathname: "/home",
                state: userid,
            })

        }else{
            UserService.updateUserById(user, userid);

        bookList.map((book) => {book.orderId =idOfOrder;delete book.bookId})
        let object = {
            orderId:idOfOrder,
            date:new Date(),
            price:cartTotal,
            quantity:count,
            address:user.address,
            userId:userid,
            books:bookList
        }
        
        BookStoreCartService.removeBookFromCartusingUserId(userid);
        BookStoreCartService.saveOrder(object);
    
        props.history.push({
            pathname: "/ordersummary",
            state: parameters,
        })
        }
    }

    /**
     * useEffect() to load details of no of books present in cart, books present cart, total cart value
     */
    useEffect(() => {
        BookStoreCartService.noofBooksPresentinCart(userid).then((data) => { setCount(data.data) });
        BookStoreCartService.getBookPresentinCart(userid).then((data) => { setBookList(data.data) });
        BookStoreCartService.getCartTotal(userid).then((data) => { setCartTotal(data.data) })
    }, [count, bookList]);

    /**
     * 
     */
    useEffect(() => {
        BookStoreCartService.noofBooksPresentinCart(userid).then((data) => { setCount(data.data) });
    }, [count]);

    /**
     * useEffect() to load details of user present in database
     */
    useEffect(() => {
        UserService.getUserbyId(userid).then((data) => {console.log(user);
            setUser({
                ...user, ...data, name: data.data.name, mobileNumber: data.data.mobileNumber,
                pinCode: data.data.pinCode, locality: data.data.locality, address: data.data.address, city: data.data.city, landmark: data.data.landmark
            })
        });
    },[])

    /**
     * useEffect() to load books present in wishlist
     */
    useEffect(() =>{
        WishListService.getBookByUserId(userid).then((data) =>{setBooksInWishList(data.data)})
    },[bookInWishList])

    /**
     * DOM Element of Order Component
     */
    return (
        <>
            <header>
                <img className="header-logo1" src={logo} onClick={homeRedirect} />
                <h2>Book Store</h2>
                <img className="cart-image1" src={cart} onClick={cartRedirect} /><div className="cart-count">{count}</div>
                <img className="wishlist-image" src={wishList} onClick={wishListRedirect} /><div className="cart-count">{bookInWishList.length}</div>
            </header>
            <div className="cart-main">
                <h2 className="cart-details"><strong>My Cart ({count})</strong></h2>
                {
                    bookList.map((book) =>
                        <div className="cart-book" key={book.id}>
                            <img className="book-image" src={
                                book.bookPath === "../../assets/image 11.png" ? dmmt
                                    : book.bookPath === "../../assets/designof.png" ? design
                                        : book.bookPath === "../../assets/groupdiscussion.png" ? groupdiscussion
                                            : book.bookPath === "../../assets/learnux.png" ? learnux
                                                : book.bookPath === "../../assets/react.png" ? react
                                                    : book.bookPath === "../../assets/sharepoint.png" ? sharepoint
                                                        : UXdesign} />
                            <div className="values">
                                <h2 className="book-title">{book.bookName}</h2>
                                <p className="book-author">{book.bookAuthor}</p>
                                <p className="book-price">Rs {book.bookPrice * book.quantity}</p>
                                <div className="quantity">
                                    <button className="quantity-button" onClick={() => addBook(book.bookId, book.quantity)}>+</button>
                                    <p className="book-quantity">{book.quantity}</p>
                                    <button className="quantity-button" onClick={() => deleteBook(book.bookId, book.quantity)}>-</button>
                                    <button className="remove" onClick={() => removeBookFromCart(book.bookId)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="details-content1">
                <h2 className="details-header1">Customer Details<button className="edit-button" onClick={() => enableEdit(false)}>Edit</button></h2>

                <form className="details-form">
                    <input type="text" className="details-row-content" name="name" placeholder="Name" value={user.name} disabled={editEnabled} onChange={handleInput} ></input>
                    <input type="text" className="details-row-content" name="mobileNumber" placeholder="Phone Number" value={user.mobileNumber} disabled={editEnabled} onChange={handleInput}></input>
                    <input type="text" className="details-row-content" name="pinCode" placeholder="Pin Code" value={user.pinCode} disabled={editEnabled} onChange={handleInput}></input>
                    <input type="text" className="details-row-content" name="locality" placeholder="Locality" value={user.locality} disabled={editEnabled} onChange={handleInput}></input>
                    <input type="text" className="details-row" name="address" placeholder="Address" value={user.address} disabled={editEnabled} onChange={handleInput}></input>
                    <input type="text" className="details-row-content" name="city" placeholder="City" value={user.city} disabled={editEnabled} onChange={handleInput}></input>
                    <input type="text" className="details-row-content" name="landmark" placeholder="Landmark" value={user.landmark} disabled={editEnabled} onChange={handleInput}></input>
                    <p className="type-text">Type</p>
                    <input className="radio" type="radio" id="type" name="type" onChange={handleInput}></input>
                    <label className="type-label-text">Home</label>
                    <input className="radio" type="radio" id="type" name="type" onChange={handleInput}></input>
                    <label className="type-label-text">Work</label>
                    <input className="radio" type="radio" id="type" name="type" onChange={handleInput}></input>
                    <label className="type-label-text">Other</label>
                </form>
            </div>
            <div className="cart-main">
                <h2 className="cart-details"><strong>Order Summary</strong></h2>
                {

                    bookList.map((book) =>
                        <div className="cart-book" key={book.id}>
                            <img className="book-image" src={
                                book.bookPath === "../../assets/image 11.png" ? dmmt
                                    : book.bookPath === "../../assets/designof.png" ? design
                                        : book.bookPath === "../../assets/groupdiscussion.png" ? groupdiscussion
                                            : book.bookPath === "../../assets/learnux.png" ? learnux
                                                : book.bookPath === "../../assets/react.png" ? react
                                                    : book.bookPath === "../../assets/sharepoint.png" ? sharepoint
                                                        : UXdesign} />
                            <div className="values">
                                <h2 className="book-title">{book.bookName}</h2>
                                <p className="book-author">{book.bookAuthor}</p>
                                <p className="book-price" >Rs {book.bookPrice * book.quantity}</p>
                            </div>
                        </div>
                    )
                }
                <div className="button-order">
                    <div className="cart-total-div">
                        <h1 className="cart-total-title">Total Cart Value : </h1>
                        <h2 className="cart-total">{cartTotal}</h2>
                    </div>
                    <button className="order-button" onClick={() => checkOut(user)}>Checkout</button>
                </div>
            </div>
        </>
    )
}
export default Order;