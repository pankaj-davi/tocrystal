
import styled from "./Header.module.css";
import { SearchBar } from './SearchBar';
import NavLinks from './NavLinks';


const Header = () => {
    
    return (
        <header className={styled.header}>
            <div className={styled.items}>
                <NavLinks/>
                <SearchBar/>
            </div>
        </header> 
    )
}

export default Header;


