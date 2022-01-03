import { Fragment } from "react";
import Header from "./Header/Header";
import classes from "./Layout.module.css";
import Footer from "./Footer/Footer";


function Layout(props) {
    return (
        <div className={classes.layout}>
            <Header />
            <main className={classes.main}>{props.children}</main>
            <Footer />
        </div>
    )
}

export default Layout;



