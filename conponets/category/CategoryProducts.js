
import React from 'react';
import classes from "./CategoryProducts.module.css";
import ProductCard from '../UI/Card/ProductCard';


const CategoryProducts = (props) => {

    const { categorys, products } = props.item;
    
    return (
        <div className={classes.categoryHeading} >
            <div className={classes.categoryHeading} >
                <h1>{categorys.ProductCategory}</h1>
                <p>
                    <strong>{categorys.description}</strong>
                </p>
                <ProductCard products={products} />
            </div>
        </div>
    );
};


export default CategoryProducts;


