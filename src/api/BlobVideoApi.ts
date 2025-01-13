import { BlobServiceClient } from "@azure/storage-blob";
import getVideoContainerClient from "../storage/videoStorageClient";


const endpoint = ``
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