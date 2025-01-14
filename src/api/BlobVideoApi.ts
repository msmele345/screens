import { BlobServiceClient } from "@azure/storage-blob";
import getVideoContainerClient from "../storage/videoStorageClient";


const endpoint = `https://reactblob1.blob.core.windows.net/?sp=rl&st=2024-12-06T17:24:10Z&se=2024-12-14T01:24:10Z&spr=https&sv=2022-11-02&sr=c&sig=5zaPA1XgdVwxLql5e%2BWAyMDUpIC4vEz60rJr%2BLZ5dtI%3D`
// const blobServiceClient = new BlobServiceClient('https://reactblob1.blob.core.windows.net/videos?sp=r&st=2024-12-06T17:24:10Z&se=2024-12-14T01:24:10Z&spr=https&sv=2022-11-02&sr=c&sig=OsXMm9gQga1Wy3tiUzC8U0F00bNcANgITJzsnRFpwsU%3D');
const containerName = "videos";
const blobServiceClient = new BlobServiceClient(endpoint);
const containerClient = blobServiceClient.getContainerClient(containerName);

export default async function fetchBannerVideo() {
    const videoContainerClient = getVideoContainerClient();
    const videos = [];

    try {
        // const videoBlobs = videoContainerClient.listBlobsFlat();
        const videoBlobs = containerClient.listBlobsFlat();

        for await (const videoBlob of videoBlobs) {
            const tempBlockBlobClient = videoContainerClient.getBlockBlobClient(videoBlob.name);
            videos.push({ url: tempBlockBlobClient.url });
        }

    } catch(e: any) {
        console.log("VIDEO FETCH ERROR: ", {e})
    }

    return videos;
};