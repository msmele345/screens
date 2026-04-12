import { ReactElement } from "react";
import BannerVideo from '/bannervideo.mp4';
import MainNavigation from "./MainNavigation";
import BannerImage from '../assets/concert2.jpg';



const Header = (): ReactElement => {
    return (
        <>
            <MainNavigation />
            <header className="header">
                <h1>Lights And Music</h1>
                <img className='bannerimage' src={BannerImage} alt="No image" />
            </header>
        </>
    );
};

export default Header;

                 /* 
                 VIDEO BANNER sub 
                    <video
                        src={BannerVideo}
                        muted
                        loop
                        autoPlay
                    >
                    </video> 
                */