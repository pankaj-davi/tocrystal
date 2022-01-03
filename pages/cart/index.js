import CartPage from "../../conponets/Cart/CartPage";
import dynamic from "next/dynamic";

function Cart() {

    return (
        <CartPage />
    )
}

export default  dynamic(() => Promise.resolve(Cart) , {ssr : false});