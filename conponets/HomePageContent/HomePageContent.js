import React from 'react';
import HomePageProducts from "./HomeProducts/HomePageProducts";
// import HomeBlog from "./HomepageBlog/HomeBlog";
import classes from "./HomePageContent.module.css";
// <HomeBlog />

const HomePageContent = (props) => {
    
    return (
        <div className={classes.content}>
            <HomePageProducts items={props.items} />
            
        </div>
    )
}

export default HomePageContent
