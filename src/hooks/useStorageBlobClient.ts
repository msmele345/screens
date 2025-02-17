import { useEffect, useState } from 'react';
import getContainerClient from '../storage/storageclient';


export const useStorageBlobClient = () => {
    const [imageUrls, setImageUrls] = useState<Record<string, unknown>[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchError, setIsFetchError] = useState(false);

    useEffect(() => {
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

                console.log("Blob Items from hook: ", urls);

            } catch (e: any) {
                console.log("Blob Client Error During Fetch : ", e.message || "unknown server error");
                setIsFetchError(true);
                setIsLoading(false);
            }
            setIsLoading(false)
            setImageUrls(urls);
        }

        fetchBlobs();
    }, [])

    return { imageUrls, isLoading, isFetchError }
};