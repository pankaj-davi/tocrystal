import React from 'react'
import classes from "./Footer.module.css";
import Image from "next/image";
import footerLogo from "../../../public/images/logo/toCrystal-logoe.png";
import Link from "next/link";
import { BsFacebook , BsInstagram } from "react-icons/bs";
import  LinkData  from "./FooterLinkData";



const Footer = () => {
     return (
         <footer className={classes.container}>
            <div className={classes.footer}>
                <div className={classes.logo}>
                     <div>
                        <Image src={footerLogo} alt="footer-logo"  objectFit='contain' width={180} height={50}  />
                     </div>
                    <p>We are a wholesale exporter of precious and semi-precious healing crystal stones ranging in various types, sizes, and forms.</p>
                </div>
                <div className={classes.email}>
                     <h4>Email us</h4>
                     <p>inquiry@tocrystal.com</p>
                </div>
                 <div className={classes.link}>
                     <h4>Links</h4>
                    <ul>
                        {LinkData.map((link , idx) => 
                            <Link href={link.href} key={idx} passHref>
                                <li>{link.name}</li>
                            </Link>
                        )}
                    </ul>
                </div>
                 <div className={classes.socialLinks}>
                     <h4>Follow Us</h4>
                     <ul>
                        <li><BsFacebook/></li>
                        <li><BsInstagram/></li>
                     </ul>
                 </div>
            </div>
         </footer>
     )
 }
 
export default Footer;
 