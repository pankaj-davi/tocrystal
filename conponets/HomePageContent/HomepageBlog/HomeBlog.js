import React from 'react';
import classes from "./HomeBlog.module.css";
import BlogItem from './BlogItem';


const HomeBlog = () => {
    return (
        <section className={classes.container}>
            <h2>Our Blog</h2>
            <BlogItem />
        </section>
    )
}

export default HomeBlog;
