import React from 'react';
import { BsCartCheck } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import styled from "./Header.module.css";
import { useSelector } from 'react-redux';
import Link from "next/link";


export const SearchBar = () => {

    const totalItemInCart = useSelector(state => state.cart.totalItem)

    return (
        <div className={styled.searchbar}>
            <span className={styled.search}>
                <AiOutlineSearch />
            </span>
            <input type="search" placeholder="Search for product..." />
            <Link href={`/cart`} passHref>
                <span className={styled.cart}>
                    <BsCartCheck className={styled.cartIcon} />
                    <span className={styled.numberOfItems}>{totalItemInCart}</span>
                </span>
            </Link>
        </div>
    )
}


