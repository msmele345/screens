import { ReactElement, useEffect, useState } from "react";
import BannerVideo from '/bannervideo.mp4';

import { BlobServiceClient } from "@azure/storage-blob";

const endpoint = ``
const containerName = "videos";
const blobServiceClient = new BlobServiceClient(endpoint);
const videoContainerClient = blobServiceClient.getContainerClient(containerName);


const Header = (): ReactElement => {

    const [videoUrl, setVideoUrl] = useState('');

    useEffect(() => {
    //   fetchVideo();
    }, [])
//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

    const fetchVideo = async () => {
        const videos = [];

        try {
            const videoBlobs = videoContainerClient.listBlobsFlat();

            for await (const videoBlob of videoBlobs) {
                const tempBlockBlobClient = videoContainerClient.getBlockBlobClient(videoBlob.name);
                videos.push({ url: tempBlockBlobClient.url });
            }

            console.log("VIDEO FETCH SUCCESS. VIDEOS: ", videos);
        } catch (e: any) {
            console.log("VIDEO FETCH ERROR: ", { e })
        }

        if (videos && videos.length > 0) {
            console.log("URL: ", videos[0].url)
            setVideoUrl(videos[0].url as string ?? '')
        }
    };

    return (
        <>
            <header className="header">
                <h1>Lights And Music2</h1>
                <video
                    muted={true}
                    loop={true}
                    autoPlay={true}
                    src={BannerVideo}

                >
                   {/* <source src={videoUrl} type="video/mp4"></source> */}
                </video>
            </header>
        </>
    );
};

export default Header;