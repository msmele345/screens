import { ReactElement } from "react";
import HeaderIcon from '../assets/concert2.jpg';



const Header = (): ReactElement => {
    return (
        <>
            <header className="header">
                <img src={HeaderIcon} alt="logo" />
                <h1>Lights And Music</h1>
            </header>
        </>
    );
};

export default Header;