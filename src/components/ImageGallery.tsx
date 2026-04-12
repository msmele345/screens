import { ContainerClient } from "@azure/storage-blob";
import { useStorageBlobClient } from "../hooks/useStorageBlobClient";
import TabLayoutContainer from "./TabLayoutContainer";
import UploadForm from "./UploadForm";

export interface HomePageProps {
    containerClient: ContainerClient;
};

const ImageGallery = () => {
    //TEST UPLOAD TODO

    const { isFetchError, isLoading, fetchBlobs,  imageUrls } = useStorageBlobClient();

    return (
        <>
            { !isFetchError && !isLoading &&
                (
                    <div>
                        <UploadForm refreshImages={fetchBlobs} />
                        <TabLayoutContainer images={imageUrls} />
                    </div>

                )
            }
        </>
    )
}

export default ImageGallery;