import '../styles/globals.css';
import Layout from '../conponets/Layout/Layout';
import store from "../Store/index";
import { Provider } from "react-redux";



function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}> 
      <Layout>
        <Component {...pageProps} />    
      </Layout>
    </Provider>
  )
}

export default MyApp

  



// export async function getServerSideProps() { 

//   await db.connect();
//   const navLinks = await category.find({});
  
//   const result = JSON.parse(JSON.stringify(navLinks))
//   console.log(result);

//   return {
//       props: {
//           result
//       },
//   }
// }