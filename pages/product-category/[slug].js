import React, { Fragment } from 'react';
import CategoryProducts from "../../conponets/category/CategoryProducts";
import category from "../../modals/cotegory";
import db from "../../uitility/connectDB";
import product from "../../modals/product";
import { useDispatch } from "react-redux";
import { categoryHoverAction } from "../../Store/category-onhover";

function CategoryDetail(props) {
    

    
    const dispatch = useDispatch();

    const categoryData = props.result.categoryProducts;

    const { navLinks } = props.result;
    
    
    (() => {
        dispatch(categoryHoverAction.categoryLinks(navLinks));
    })()
    
    return (
        <Fragment>
            <CategoryProducts item={categoryData} />
        </Fragment>
    )
}

export default CategoryDetail ;


export async function getServerSideProps(context) { 

    const { slug } = context.params;

    await db.connect();

    const categorys = await category.find({_id : slug});

    const products = await product.find({ category: categorys[0]._id });

    const navLinks = await category.find({});
    
    const categoryProducts = { categorys: categorys[0], products: products }

    const data = {categoryProducts ,navLinks }
    
    const result = JSON.parse(JSON.stringify(data));
    
    return {
        props: {
            result,
            
        },
    }
}
