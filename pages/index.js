import { Fragment } from "react"
import Slider from "../conponets/heroImageSlider/Slider"
import { SliderData } from "../conponets/heroImageSlider/SliderData"
import HomePageContent from "../conponets/HomePageContent/HomePageContent";
import db from "../uitility/connectDB";
import category from "../modals/cotegory";
import product from "../modals/product";
import { useDispatch } from "react-redux";
import { categoryHoverAction } from "../Store/category-onhover";


export default function Home(props) {

  const dispatch = useDispatch();

  const homePageCategory = props.result;

  const { navLinks } = props.result;
  
  
    // category Links from DB IIFE fun
    (() => {
        dispatch(categoryHoverAction.categoryLinks(navLinks));
    })()
  
  return (
    <Fragment  >
      <Slider slides={SliderData} />
      <main >
        <HomePageContent items={homePageCategory} />
      </main>
    </Fragment>
  )
}


export async function getServerSideProps() { 

  await db.connect();
  
  const categorys = await category.find({_id : ["agate", "apatite", "aquamarine"]});

  const navLinks = await category.find({});
  
  const products = await product.find({ category:   ["agate", "apatite", "aquamarine"] });


  
  const categoryProducts = { categorys, products ,navLinks }
  
  const result = JSON.parse(JSON.stringify(categoryProducts));

  return {
      props: {
          result
      },
  }
}