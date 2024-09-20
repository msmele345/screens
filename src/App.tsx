import { BlobServiceClient } from '@azure/storage-blob';
import './App.css'
import Header from './UI/Header';
import { useEffect, useState } from 'react';
import TabLayoutContainer from './components/TabLayoutContainer';


export interface Screen {
  title: string;
  image: string;
  description: string;
};

export interface ImageBlob {
  name: string;
  url: string;
};

// const defaultCredential = new DefaultAzureCredential();
const account = import.meta.env.VITE_STORAGE_ACCOUNT  // get the storage account name from the .env file
const containerName = import.meta.env.VITE_STORAGE_CONTAINER
const sas = import.meta.env.STORAGE_SAS
const endpoint = `https://${account}.blob.core.windows.net/?${sas}`
// const blobServiceClient = new BlobServiceClient(endpoint, defaultCredential);  // create a blobServiceClient
const blobServiceClient = new BlobServiceClient(endpoint);  // create a blobServiceClient
// const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);  // create a blobServiceClient
const containerClient = blobServiceClient.getContainerClient(containerName);  // create a containerClient



function App() {
  const [imageUrls, setImageUrls] = useState<Record<string, unknown>[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchError, setIsFetchError] = useState(false);

  useEffect(() => {
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
  };

  return (
    <div>
      <Header />
      {
        !isFetchError && !isLoading &&
        (
          <>
            <TabLayoutContainer images={imageUrls} />
          </>

        )
      }
    </div>
  );
};

export default App;