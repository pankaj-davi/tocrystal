import React from "react";
import Image from "next/image";
import category from "../../modals/cotegory";
import db from "../../uitility/connectDB";
import product from "../../modals/product";
import { useDispatch } from "react-redux";
import { categoryHoverAction } from "../../Store/category-onhover";
import { useRouter } from "next/router";


function ProductDetail(props) {
    const dispatch = useDispatch();
    const router = useRouter()

    const { slug } = router.query;

    const { products : product } = props.result;
    const { navLinks } = props.result;
    
    
    (() => {
        dispatch(categoryHoverAction.categoryLinks(navLinks));
    })()

    console.log()


    if (product[0].slug !== slug) {
        return <div>No product Found</div>
    }

    return (
        <div>
            {product.map(item => 
                <div key={item._id}>
                    <h1 >{item.price}</h1>
                    <h1>{item.title}</h1>
                </div>
            )}
        </div>
    )
}


export default ProductDetail;




export async function getServerSideProps(context) { 

    const { slug } = context.params;

    await db.connect();

    const products = await product.find({slug : slug});

    const navLinks = await category.find({});
    
    const data = { products, navLinks }
    
    const result = JSON.parse(JSON.stringify(data));
    
    return {
        props: {
            result,
        },
    }
}