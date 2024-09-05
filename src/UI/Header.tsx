import { ReactElement } from "react";
import logo from '../assets/investment-calculator-logo.png';



const Header = (): ReactElement => {
    return (   
    <>
        <header className="header">
            <img src={logo} alt="logo" />
            <h1>Investment Calculator</h1>
        </header>
    </>
    )   
};

export default Header;