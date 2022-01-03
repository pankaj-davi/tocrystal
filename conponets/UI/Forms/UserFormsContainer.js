import React, { Fragment } from 'react'
import classes from "./UserFormsContainer.module.css";
import Link from "next/link";


function UserFormsContainer(props) {
    
    const  { titles } = props;
    
    const titleProps = titles.map((heading, idx) => {

        const { title: head, link: link, ActiveClasses } = heading;
        
        const activeClass = ActiveClasses ? `${classes.active}` : "";

        console.log(activeClass);
        
        return (
            <Fragment key={idx}>

                {link ?
                    <Link href={link} passHref>
                        <h2>
                            {head}
                            <span className={activeClass}></span>
                        </h2>
                    </Link>
                    :
                    <h2>
                        {head}
                        <span className={activeClass}></span>
                    </h2>
                }

            </Fragment>
        );
    });


    return (
        <Fragment>
            
            <div className={classes.container}>

                <div className={classes.forms}>
                    <div className={classes.titles}>
                        {titleProps}
                    </div>
                    
                    {props.children}
                </div>

            </div>

        </Fragment>
    );
}

export default UserFormsContainer;
