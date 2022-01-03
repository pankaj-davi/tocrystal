
import React from 'react'
import classes from "./BlogCard.module.css";

function BlogCard(props) {
    return (
        <div className={classes.blogCard}>
            {props.children}
        </div>
    )
}

export default BlogCard
