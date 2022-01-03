import React from 'react'
import classes from "./HomeProducts.module.css";
import ProductCard from '../../UI/Card/ProductCard';



function HomeProducts(props) {
    
    const {  categorys, products } = props.items;
    return (
        <div className={classes.container}>
            
            {categorys.map((categary, idx) =>
                <div key={idx} className={classes.products} >
                    
                    <h2>{categary.ProductCategory}</h2>
                    <ProductCard products={products} categaryName={categary._id} />
                </div>
            )}
            
        </div>
    )
}

export default HomeProducts;
