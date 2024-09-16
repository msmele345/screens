import { BlobServiceClient } from '@azure/storage-blob';
import './App.css'
import Header from './UI/Header';
import StorageImagesList from './components/StorageImagesList';
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
// const endpoint = `https://${account}.blob.core.windows.net/?sv=2022-11-02&ss=bf&srt=sco&sp=rwdlactfx&se=2024-09-12T01:01:58Z&st=2024-09-09T17:01:58Z&spr=https&sig=Xhc66ZEr1IHirvmG0zkKZGnvaq%2BW6WcPbbJfK7HE2fk%3D`  // get the container name from the .env file
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
  

  const fetchBlobs = async() => {
    setIsLoading(true);
    const urls: Record<string, unknown>[] = [];

    try {
      const blobItems = await containerClient.listBlobsFlat(); 

      for await (const blob of blobItems) {
        const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);  
        console.log("BLOB CLIENT OBJ: ", blob)
        urls.push({ name: blob.name, url: tempBlockBlobClient.url }); 
      }

    } catch (e: any) {
      console.log("Error***: ", e.message || "server error");
      setIsFetchError(true);
      setIsLoading(false);
    }
    console.log(urls);
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
          <TabLayoutContainer images={imageUrls}/>
          {/* <StorageImagesList images={imageUrls} /> */}
        </>

      ) 
      }
    </div>
  );
};

export default App;


/* 
  return (
    <div>
      <Header />
      <TabLayoutContainer/>
      { !isFetchError && !isLoading && <StorageImagesList images={imageUrls} /> }
    </div>
  );

*/