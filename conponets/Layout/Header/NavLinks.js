import React, { Fragment } from 'react';
import {FaBars} from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { FaAngleDown } from 'react-icons/fa';
import Link from 'next/link';
import styled from "./Header.module.css";
import { useState } from 'react';
import Image from "next/image";
import logoImg from "../../../public/images/logo/cropped-4tDGOW72-toCrystal-logo-image.png";
import { useDispatch , useSelector } from 'react-redux';
import { categoryHoverAction } from "../../../Store/category-onhover";
import ProductCategory from '../../category/ProductCategoryList';

function NavLinks() {
 
    const dispatch = useDispatch();
    const showCategoryList = useSelector((state )=> state.showCategory.showCategoryList)
    

    const [showLinks, setShowLinks] = useState(false);
    const [show, setShow] = useState(false);

    const mobileMenuHandler = () => {
        setShowLinks(prevCheck => !prevCheck);
    }

    const showCategory = () => {
        dispatch(categoryHoverAction.showCate());
    }
    
        

    return (
        <Fragment>
            
            {showLinks ?
                <GrClose className={styled.menubar} onClick={mobileMenuHandler} />
                :
                <FaBars
                    className={styled.menubar} onClick ={mobileMenuHandler}
                />
            }

            <div className={styled.logo}>
                <Link href="/" >
                    <a>
                    <Image src={logoImg} alt="logo"  />
                    </a>
                </Link>
            </div>

            <div className={showLinks ? `${styled.navLinkSide}` : `${styled.navlinks}`}>
                <nav>
                    <ul>
                        <li >
                            <Link href="/">Product</Link>
                            <span> <FaAngleDown/></span>
                        </li>
                        <li onMouseEnter={showCategory} >
                            <Link href="/">Crystals</Link>
                            <span> <FaAngleDown /></span>
                            {showCategoryList ?  <ProductCategory  /> : null}
                        </li>
                        <li>
                            <Link href="/">About Crystals</Link>
                        </li>
                        <li>
                            <Link href="/">Contact Us</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </Fragment>
    )
}

export default NavLinks
