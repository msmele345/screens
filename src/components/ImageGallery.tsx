import { ContainerClient } from "@azure/storage-blob";
import { useEffect, useState } from "react";
import TabLayoutContainer from "./TabLayoutContainer";
import { ClickedImage } from "../store/AppContext";

export interface HomePageProps {
    containerClient: ContainerClient;
}


const ImageGallery = ({ containerClient }: HomePageProps) => {

    const [imageUrls, setImageUrls] = useState<Record<string, unknown>[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchError, setIsFetchError] = useState(false);

    useEffect(() => {
        // console.log("SELECTED IMAGE: ", selectedImage);
        fetchBlobs();
    }, []);


    const fetchBlobs = async () => {
        setIsLoading(true);
        const urls: Record<string, unknown>[] = [];

        try {
            const blobItems = containerClient.listBlobsFlat();

            for await (const blob of blobItems) {
                const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);
                urls.push({ name: blob.name, url: tempBlockBlobClient.url });
            }

            console.log("Blob Items: ", urls);

        } catch (e: any) {
            console.log("Error***: ", e.message || "server error");
            setIsFetchError(true);
            setIsLoading(false);
        }
        setIsLoading(false)
        setImageUrls(urls);
    }

    return (
        <>
            { !isFetchError && !isLoading &&
                (
                    <>
                        {/* <UploadForm refreshImages={fetchBlobs} containerClient={containerClient} isLoading={setIsLoading} /> */}
                        <TabLayoutContainer images={imageUrls} />
                    </>

                )
            }
        </>
    )
}

export default ImageGallery;