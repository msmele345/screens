import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';



export default function getContainerClient(): ContainerClient {
    const account = import.meta.env.VITE_STORAGE_ACCOUNT  // get the storage account name from the .env file
    const containerName = import.meta.env.VITE_STORAGE_CONTAINER
    const sas = import.meta.env.STORAGE_SAS
    const endpoint = `https://${account}.blob.core.windows.net/?${sas}`
    // const blobServiceClient = new BlobServiceClient(endpoint, defaultCredential);  
    const blobServiceClient = new BlobServiceClient(endpoint);  // create a blobServiceClient
    // const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);  // create a blobServiceClient
    return blobServiceClient.getContainerClient(containerName);  // create a containerClient
};