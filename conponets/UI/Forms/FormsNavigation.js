import React, { Fragment } from 'react';
import Link from "next/link";
import classes from "./FormsNavigation.module.css";

const FormsNavigation = (props) => {

    const { formsNavigationProps } = props;

    const navigation = formsNavigationProps.map((item, idx) => {
        
        const { content, link, click } = item;

        return (
            <div className={classes.navigation} key={idx}>
                {content}
                <Link href={link} passHref>
                    <span>&nbsp;&nbsp;{click}</span>
                </Link>
            </div>
        );
    });
    
    return <Fragment> {navigation} </Fragment>;
};

export default FormsNavigation;