import React from 'react'
import classes from "./HomePageProducts.module.css";
import HomeProducts from './HomeProducts';


const HomePageProducts = (props) => {
    return (
        <section className={classes.container}>
            <div className={classes.heading}>
                <h1>
                    <strong>
                        Buy Crystals Wholesale
                    </strong>
                </h1>
                <p>
                    <strong>
                        Buy The Best Quality Precious And Semi-Precious Healing Crystals Wholesale In All Shapes And Sizes At Great Prices.
                    </strong>
                </p>
            </div>
            <HomeProducts items={props.items} />
        </section>
    )
}

export default HomePageProducts;