import React from "react";
import logo from "../../assets/education.svg";
import cart from "../../assets/supermarket.svg";
import { useEffect, useState } from "react";
import BookStoreCartService from "../../service/BookStoreCartService";
import "../Cart/Cart.css"
import design from "../../assets/designof.png"
import groupdiscussion from "../../assets/groupdiscussion.png"
import learnux from "../../assets/learnux.png"
import react from "../../assets/react.png";
import sharepoint from "../../assets/sharepoint.png";
import UXdesign from "../../assets/UXdesign.png";
import dmmt from "../../assets/dontmake.png";
import WishListService from '../../service/WishListService'
import "../Wishlist/WishList.css"

/**
 * Functitonal Component of WishList 
 * @param {*} props 
 * @returns 
 */
const WishList = (props) => {

    const userid = props.location.state;

    const [count, setCount] = useState();

    const [bookList, setBookList] = useState([]);

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
     * Function to handle cart redirect icon in header
     */
    const cartRedirect = () => {
        props.history.push({
            pathname: "/cart",
            state: userid,
        });
    }

    /**
     * Functiton for Handling move to cart button onChange event 
     * @param {} book 
     */
    const moveBookToCart =(book) =>{
        book.quantity=1;
        BookStoreCartService.addBookToCart(book,userid);
        WishListService.deleteBookById(book.id);
    }

     /**
     * Functiton for Handling move to cart button onChange event 
     * @param {} book 
     */
      const removeBook =(book) =>{
        WishListService.deleteBookById(book.id);
    }


    /**
     * useEffect to load count of books present in cart and books present in wishlist
     */
    useEffect(() =>{
        WishListService.getBookByUserId(userid).then((data) =>{setBookList(data.data)});
        BookStoreCartService.noofBooksPresentinCart(userid).then((data) => { setCount(data.data) });
    },[bookList])

    /**
     * DOM of wishlist component
     */
    return (
    <>
            <header>
                <img className="header-logo1" src={logo} onClick={homeRedirect} />
                <h2>Book Store</h2>
                <img className="cart-image1" src={cart} onClick={cartRedirect} /><div className="cart-count">{count}</div>
            </header>
            <div className="wishlist-main">
                <h2 className="wishlist-details"><strong>My Wish List ({bookList.length})</strong></h2>
                {
                    bookList.map((book) =>
                        <div className="wishlist-book" key={book.id}>
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
                                <p className="book-price">Rs {book.bookPrice}</p>
                                <div className="button-div">
                                <button className="add-to-cart-wishlist" onClick={() => moveBookToCart(book)}>Add to Cart</button>
                                <button className="remove-book-from-wishlist" onClick={() => removeBook(book)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    )
                }
                </div>
            </>
            )
}
            export default WishList;