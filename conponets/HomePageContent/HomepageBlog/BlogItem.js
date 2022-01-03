import React from 'react'
import { BlogData } from './HomeBlogData';
import Link from "next/link"
import Image from "next/image"
import classes from "./BlogItems.module.css";
import BlogCard from '../../UI/Card/BlogCard/BlogCard';

const BlogItem = () => {
    return (
        <div className={classes.blogItmes}>
            {BlogData.map(item =>
                
                <BlogCard key={item.id}>
                    <div className={classes.blogs}> 
                        <Link href={item.images.href} passHref>
                            <div className={classes.images}>
                                <Image src={item.images.image} alt={item.images.alt} />
                            </div>
                        </Link>
                        
                        <div className={classes.blogDetail}>
                            <h3><Link href={item.images.href} passHref >{item.title}</Link></h3>
                                <p>Author: {item.author.name}</p>
                            <p>{item.date}</p>
                            <h6><Link href={item.images.href} passHref >Read more</Link></h6>
                        </div> 
                    </div>
                </BlogCard>

            )}
        </div>
    )
}

export default BlogItem
