import { BlobServiceClient } from '@azure/storage-blob';


export const useBlobClient = () => {
    const blobServiceClient = new BlobServiceClient('https://reactblob1.blob.core.windows.net/?sp=racwdl&st=2024-11-09T14:16:16Z&se=2024-11-14T22:16:16Z&spr=https&sv=2022-11-02&sr=c&sig=BfjAOa32YFhnwi4ZfOZYWq07iQ6gLptH6zXXGvUMTBQ%3D');
    const containerName = "sa1";
    const containerClient = blobServiceClient.getContainerClient(containerName);

    return { containerClient: containerClient }

}