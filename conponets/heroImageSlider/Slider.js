import React, { Fragment, useState ,useEffect} from 'react'
import { SliderData } from './SliderData'
import Image from "next/image"
import { VscArrowRight , VscArrowLeft } from "react-icons/vsc";
import classes from "./Slider.module.css";
import Link from "next/link";

const Slider = ({ slides }) => {

    const [currentSlide, setCurrentSlide] = useState(0);
    const length = slides.length;
    
    useEffect(() => {

        const timer = setTimeout(() => {
            setCurrentSlide(currentSlide === length - 1 ? 0 : currentSlide + 1);
        } , 7000)

        return () => {
            clearTimeout(timer);
        }
    } ,[currentSlide , length])

    
    
    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

    const preSlideHandler = () => {
        setCurrentSlide(currentSlide === 0 ? length - 1 : currentSlide - 1)  
    }
    const nextSlideHandler = () => {
        setCurrentSlide(currentSlide === length - 1 ? 0 : currentSlide + 1)  
    }


    return (
        <section className={classes.slider}>
            {SliderData.map((data , idx) => {
                return (
                    <div key={idx} className={idx === currentSlide ? `${classes.active}` + "  " + `${classes.slide}` : `${classes.slide}` } >
                        {idx === currentSlide &&
                            
                            <div className={classes.wrapper}>
                                <VscArrowLeft className={classes.leftArrow } onClick={preSlideHandler} />
                                <VscArrowRight className={classes.rigthArrow} onClick={nextSlideHandler} />
                                <div className={classes.content}>
                                    <h1>{data.heading}</h1>
                                    <Link href={data.hrefAtt} passHref >
                                        <button className={classes.btn}>
                                            Explore Collection
                                        </button>
                                    </Link>
                                </div>
                                <div className={classes.images}>
                                    <Image src={data.image} alt={data.alt} priority objectFit="contain" />
                                </div>
                            </div>
                        }
                    </div>
                )
            })}
        </section>
    )
}

export default Slider


