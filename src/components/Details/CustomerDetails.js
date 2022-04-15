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


const CustomerDetails = (props) => {
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



    const [editEnabled, setEditEnabled] = useState(
        {
            edit: true
        }
    );

    const [bookname, setBookName] = useState();

    const [bookList, setBookList] = useState([]);





    useEffect(() => {
        BookStoreCartService.noofBooksPresentinCart(userid).then((data) => { setCount(data.data) });
        BookStoreCartService.getBookPresentinCart(userid).then((data) => { setBookList(data.data) });
    }, [count, bookList]);



    const removeBookFromCart = (id) => {
        BookStoreCartService.removeBookFromCart(id);
        props.history.push({
            pathname: "/details",
            state: userid,
        });
    }


    const addBook = (bookId, quantity) => {
        BookStoreCartService.updateBooksinCart(bookId, quantity + 1);
    }


    const deleteBook = (bookId, quantity) => {
        quantity === 1 ? BookStoreCartService.removeBookFromCart(bookId) :
            BookStoreCartService.updateBooksinCart(bookId, quantity - 1);
    }



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

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value
        setUser({ ...user, [name]: value })

    }

    const orderRedirect = (e) => {
        props.history.push({
            pathname: "/order",
            state: userid,
        });
    }
    useEffect(() => {
        BookStoreCartService.noofBooksPresentinCart(userid).then((data) => { setCount(data.data) });

    }, [count]);

    useEffect(() => {
        UserService.getUserbyId(userid).then((data) => {
            console.log(data.data); setUser({
                ...user, ...data, name: data.data.name, mobileNumber: data.data.mobileNumber,
                pinCode: data.data.pinCode, locality: data.data.locality, address: data.data.address, city: data.data.city, landmark: data.data.landmark
            })
        });
    }, [])

    const updateUser = (e) => {
        //e.prevenDefault();
        //console.log(e);
        UserService.updateUserById(user, userid);
        if (bookList.length === 0) {
            alert("No Books Present in the cart")

            props.history.push({
                pathname: "/home",
                state: userid,
            });
        }

        else {
            props.history.push({
                pathname: "/order",
                state: userid,
            });
        }
    }

    const enableEdit = (e) => {
        setEditEnabled(e);
    }

    return (
        <>
            <header>
                <img className="header-logo1" src={logo} onClick={homeRedirect} />
                <h2>Book Store</h2>
                <img className="cart-image1" src={cart} onClick={cartRedirect} /><div className="cart-count">{count}</div>
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
            <div className="details-content">
                <h2 className="details-header">Customer Details<button className="edit-button" onClick={() => enableEdit(false)}>Edit</button></h2>
                <form className="details-form">
                    <input type="text" className="details-row-content" name="name" placeholder="Name" value={user.name} disabled={editEnabled} onChange={handleInput}></input>
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
                    <button className="continue-button" onClick={() => updateUser(user)}>Continue</button>
                </form>
            </div>
        </>
    )
}
export default CustomerDetails;