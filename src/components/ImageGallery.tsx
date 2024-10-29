import { ContainerClient } from "@azure/storage-blob";
import { useEffect, useState } from "react";
import TabLayoutContainer from "./TabLayoutContainer";
import getContainerClient from "../storage/storageclient";
import UploadForm from "./UploadForm";

export interface HomePageProps {
    containerClient: ContainerClient;
}


const ImageGallery = () => {

    const [imageUrls, setImageUrls] = useState<Record<string, unknown>[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchError, setIsFetchError] = useState(false);

    useEffect(() => {
        fetchBlobs();
    }, []);


    const fetchBlobs = async () => {
        setIsLoading(true);
        const urls: Record<string, unknown>[] = [];
        const containerClient = getContainerClient();

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
                    <div>
                        <UploadForm refreshImages={fetchBlobs} isLoading={setIsLoading} />
                        <TabLayoutContainer images={imageUrls} />
                    </div>

                )
            }
        </>
    )
}

export default ImageGallery;