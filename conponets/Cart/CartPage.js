
import React , {useState} from 'react'
import classes from "./CartPage.module.css";
import { useDispatch , useSelector } from "react-redux";
import Image from "next/image";
import { GrClose } from "react-icons/gr";
import { cartSliceAction } from "../../Store/cartSlice";
import { MdOutlineAddCircleOutline, MdOutlineRemoveCircleOutline } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";




function CartPage() {

    const router = useRouter();
    const dispatch = useDispatch();
    const [hasProduct, sethasProduct] = useState(false);
    
    

    const {productItem , totalPrice } = useSelector(state => state.cart);
    const { login } = useSelector(state => state.login);

    // if (productItem.length > 0) {
    //     sethasProduct(true);
    // }

    

    const addQuanitiyHandler = (product) => {   
        dispatch(cartSliceAction.addToCart(product))
    }

    const removeQuanitiyHandler = (product) => {
        dispatch(cartSliceAction.removeItemQunitity(product))
    }

    const removeItmeCartHandler = (itemId) => {
        dispatch(cartSliceAction.removeItem(itemId));
    }

    const checkoutHandler = () => {
        if (!login) {
           return  router.push('/login') ;
        }

        console.log("...ordring")
    }

    return (
        
        <div className={classes.cartPage}>
            <h1> Shopping Cart</h1>
            
            <div className={classes.container}>
                <div className={classes.cartItems}>
                
                    {productItem.map((product, idx) =>
                        <div key={idx} className={classes.item}>
                            <div className={classes.image}>
                                <Image src={product.image} alt={product.slug} height={100} width={100} />
                            </div>
                            <div className={classes.productDetail}>
                                <Link href={`/product-detail/${product.slug}`} passHref>
                                    <p>Name  : {product.title}</p>
                                </Link>
                                <p>Price : ${product.price}</p>

                                <div className={classes.quantityControl}>
                                    Quantity :
                                    <MdOutlineRemoveCircleOutline className={classes.removeIcon} onClick={() => removeQuanitiyHandler(product)} />
                                
                                    <span>{product.quantity}</span>
                                
                                    <MdOutlineAddCircleOutline className={classes.addIcon} onClick={() => addQuanitiyHandler(product)} />
                                </div>
                            </div>
                            <GrClose className={classes.removeItem} onClick={() => removeItmeCartHandler(product._id)} />
                        </div>
                    )}

                    <div className={classes.subTotal}>
                        <h3>
                            SUB-TOTAL : ${totalPrice}
                        </h3>
                    </div>  
                </div>

                <div className={classes.checkoutCart}>
                    <h2>TOTAL</h2>
                    <p>Sub-Total  <span>${totalPrice}</span> </p>
                    <p>Delivery   <span>${ }</span></p>
                    <button className={classes.checkoutBtn} onClick={checkoutHandler} >Checkout</button>
                </div>  
            </div>
            
        </div>
        
    )
}

export default CartPage;



    // {!hasProduct && 
    //             <div className={classes.cartEmpt}>
    //             <p>There are no product added in shopping cart <span><Link href={'/'}>continue shopping</Link></span> </p>
                
    //             </div>
    //         }    