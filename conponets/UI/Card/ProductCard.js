import React, { Fragment } from 'react'
import classes from "./ProductCard.module.css";
import Link from "next/link";
import Image from "next/image";
import Button from "../Button/Button";
import { cartSliceAction } from "../../../Store/cartSlice";
import { useDispatch } from "react-redux";
 

const ProductCard = (props) => {

    const dispatch = useDispatch();

    const addToCartHandler = async (productId) => {

        const product = await fetch(`/api/products`);

        const res = await product.json();

        const data = await res;

        for (const product in data) {
            if (data[product]._id === productId) {
                
                data[product].quantity = 1;
                
                dispatch(cartSliceAction.addToCart(data[product]));
            }
        }
    };

    const { products, categaryName } = props;
    

    const product = products.map((item, idx) => {

        
        if(categaryName === item.category ){
            return (
                <div className={classes.card} key={idx} >
                    <Link href={`/product-detail/${item.slug}`} passHref>
                        <div className={classes.images}>
                            <Image src={item.image} width={500} height={500} alt={item.title} />
                            <h3>{item.title}</h3>
                        </div>
                    </Link>
                    <p>
                        <span>
                            ${item.price}
                        </span>
                        {item.kg ? <span>   {item.kg}</span> : ""}
                    </p>
                    <div className={classes.btn}>
                        <Button title="Add To Cart" icon onClick={() => addToCartHandler(item._id)} />
                    </div>
                </div>
            );
        } else if (!categaryName) {
            return (
                <div className={classes.card} key={idx} >
                    <Link href={`/product-detail/${item.slug}`} passHref>
                        <div className={classes.images}>
                            <Image src={item.image} width={500} height={500} alt={item.title} />
                            <h3>{item.title}</h3>
                        </div>
                    </Link>
                    <p>
                        <span>
                            ${item.price}
                        </span>
                        {item.kg ? <span>   {item.kg}</span> : ""}
                    </p>
                    <div className={classes.btn}>
                        <Button title="Add To Cart" icon onClick={() => addToCartHandler(item._id)} />
                    </div>
                </div>
            );
        }

    });

    return (
        <div className={classes.productItem}  >
            {product}
        </div>
    );
};

export default ProductCard;



