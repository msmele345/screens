import { ReactElement } from "react";
import BannerVideo from '../assets/bannervideo.mp4';



const Header = (): ReactElement => {
    return (
        <>
            <header className="header">
                <video
                    src={BannerVideo}
                    muted
                    loop
                    autoPlay
                >
                </video>
                <h1>Lights And Music</h1>
            </header>
        </>
    );
};

export default Header;