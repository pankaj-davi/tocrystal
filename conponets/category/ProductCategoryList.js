import React from 'react';
import calsses from "./ProductCategory.module.css";
import { useDispatch , useSelector } from 'react-redux';
import { categoryHoverAction } from "../../Store/category-onhover";
import Link from "next/link";

const ProductCategory = () => {
    
    const dispatch = useDispatch();
    const categoryLinks = useSelector(state => state.showCategory.categoryItems.payload);
    

    const hideCategoryHandler = () => {
        dispatch(categoryHoverAction.hideCate());
    }
    
    return (
        <div className={calsses.categortList}>
            <ul className={calsses.categortItem} onMouseLeave={hideCategoryHandler} >
                {categoryLinks.map((item, idx) =>
                    <Link key={idx} href={`/product-category/${item.categorySlug}`} passHref >
                        <li >{item.ProductCategory}</li>
                    </Link>
                )}
            </ul>
        </div>
    )
}

export default ProductCategory
