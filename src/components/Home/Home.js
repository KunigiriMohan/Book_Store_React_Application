import React, { useEffect, useState } from "react";
import "../Home/Home.css"
import dmmt from "../../assets/dontmake.png";
import BookStoreHomePageService from "../../service/BookStoreHomePageService";
import logo from "../../assets/education.svg"
import cart from "../../assets/supermarket.svg"
import design from "../../assets/designof.png"
import groupdiscussion from "../../assets/groupdiscussion.png"
import learnux from "../../assets/learnux.png"
import react from "../../assets/react.png";
import sharepoint from "../../assets/sharepoint.png";
import UXdesign from "../../assets/UXdesign.png";
import BookStoreCartService from "../../service/BookStoreCartService";
import { Link } from "react-router-dom";
import WishListService from "../../service/WishListService";
import wishList from "../../assets/heart-492.png";

/**
 * Home functional Component
 */

const Home = (props) => {


    const [bookList, setBookList] = useState([]);

    const [bookname, setBookName] = useState();

    const [sortType, setSortType] = useState();

    const [count, setCount] = useState();

    const [bookpresenttinCart, setBookPresentinCart] = useState();

    const [bookInCart, setBookinCart] = useState([]);

    const [bookInWishList, setBooksInWishList] = useState([]);

    const userid = props.location.state;

    /**
     * Function to Handle Add to Cart Event  by Add to Cart Button
     */
    const addToCart = (e) => {

        let object = bookList.at(bookList.findIndex((book) => book.id === e))
        object.quantity = 1;


        if (bookInCart.findIndex((book1) => book1.id === object.id) === -1) {
            BookStoreCartService.addBookToCart(object, userid);
            BookStoreCartService.noofBooksPresentinCart(userid).then((data) => { setCount(data.data) });
        
            if (!userid) {
                alert("Please login to add Book to the Cart");
                window.location.assign(`/`);
            }
        }
        else {
            props.history.push({
                pathname: "/cart",
                state: userid,
            });
        }
    }

    /**
     * Function to handle onClick Event of Cart Icon in header
     */
    const cartRedirect = () => {

        if (!userid) {
            alert("Please login to go to Cart");
            props.history.push({
                pathname: "/",
                state: userid,
            });

        } else if (userid) {
            props.history.push({
                pathname: "/cart",
                state: userid,
            });
        }
    }


    /**
     * Function to handle input in input fields
     */
    const handleInput = (e) => {
        setBookName(e.target.value);
    }


    /**
     * Function to Handle Sort books 
     */
    const handleOptions = (e) => {
        setSortType(e.target.value);
    }

    /**
     * Function to Handle add to WishList Event by wishlist button
     */
    const addToWishList = (book) => {
        if (bookInWishList.findIndex((book1) => book1.id === book.id) === -1) {
            WishListService.addBookToWishList(book, userid);

            if (!userid) {
                alert("Please login to add Book to the Cart");
                window.location.assign(`/`);
            }

        } else {
            props.history.push({
                pathname: "/wishlist",
                state: userid,
            });
        }

    }

    /**
     * Function to handle wishlist redirect  icon on header
     */
    const wishListRedirect = () => {
        props.history.push({
            pathname: "/wishlist",
            state: userid,
        });
    }

    /**
     * useEffect() to load Books on Home Page
     */
    useEffect(() => {
        if (bookList.length === 0) {
            BookStoreHomePageService.getAllBooksonHomeScreen().then((data) => { setBookList(bookList => [...bookList, ...data.data]) });
            BookStoreCartService.noofBooksPresentinCart(userid).then((data) => { setCount(data.data) })
        }
    }, [])



    /**
     * useEffect() to load books on Home page accordding to sort type or search 
     */
    useEffect(() => {
        if (bookname || sortType) {
            if (bookname) {
                bookList.length = 0;
                BookStoreHomePageService.getAllBooksonSearchScreen(bookname).then((data) => { setBookList(bookList => [...bookList, ...data.data]) })
            }
            else if (bookList.length === 7) {
                if (sortType === "high-to-low") {
                    bookList.sort((a, b) => (a.bookPrice > b.bookPrice) ? 1 : -1)
                } else if (sortType === "low-to-high") {
                    bookList.sort((a, b) => (a.bookPrice < b.bookPrice) ? 1 : -1)
                }
            }
        }


        else if (bookList.length === 1) {
            bookList.length = 0;
            BookStoreHomePageService.getAllBooksonHomeScreen().then((data) => { setBookList(bookList => [...bookList, ...data.data]) });
        }
    }, [bookname, sortType])


    /**
     * useEffect() to store books in a array present in wishlist 
     */
    useEffect(() => {
        WishListService.getBookByUserId(userid).then((data) => { setBooksInWishList(data.data) })
    }, [bookInWishList])

    /**
     * useEffect() to store books in a array present in cart
     */
    useEffect(() => {
        BookStoreCartService.getBookPresentinCart(userid).then((data) => { setBookinCart(data.data) });
    }, [bookpresenttinCart, count, userid,addToCart])


    /**
     * DOM of the Component
     */
    return (
        <>
            <header>
                <Link to="/home"><img className="header-logo" src={logo} /></Link>
                <h2>Book Store</h2>
                <input className="input" type="text" placeholder="Search..." onChange={handleInput} />
                <img className="cart-image" src={cart} onClick={cartRedirect} /><div className="cart-count">{count}</div>
                <img className="wishlist-image" src={wishList} onClick={wishListRedirect} /><div className="cart-count">{bookInWishList.length}</div>
            </header>
            <div className="home-content">
                <div className="header">
                    <h2 className="header-text"><strong>Books</strong></h2><div className="book-count">{bookList.length}</div>
                    <select className="sort-box" onChange={handleOptions}>
                        <option value="relevance">Sort By Relevance</option>
                        <option value="low-to-high">Price:Low to High</option>
                        <option value="high-to-low">Price:High to Low</option>
                        <option value="new-arrival">Newest Arrivals</option>
                    </select>
                </div>
                <div className="book-list">
                    {
                        bookList.map((book) =>
                            <div className="book" key={book.id}>
                                <img className="bookimage" src={
                                    book.bookPath === "../../assets/image 11.png" ? dmmt
                                        : book.bookPath === "../../assets/designof.png" ? design
                                            : book.bookPath === "../../assets/groupdiscussion.png" ? groupdiscussion
                                                : book.bookPath === "../../assets/learnux.png" ? learnux
                                                    : book.bookPath === "../../assets/react.png" ? react
                                                        : book.bookPath === "../../assets/sharepoint.png" ? sharepoint
                                                            : UXdesign} />
                                <h2 className="book-title">{book.bookName}</h2>
                                <p className="book-author">{book.bookAuthor}</p>
                                <p className="book-price">Rs {book.bookPrice}</p>
                                <button className="add-to-bag" onClick={() => addToCart(book.id)}>{(bookInCart.findIndex((book1) => book1.id === book.id) === -1) ? "Add to Bag" : "Go to Cart"}</button>
                                <button className="add-wishlist" onClick={() => addToWishList(book)}>{(bookInWishList.findIndex((book1) => book1.id === book.id) === -1) ? "WishList" : "WishListed"}</button>
                            </div>
                        )
                    }
                </div>
            </div>
        </>


    );

}

export default Home;