import { BlobServiceClient } from '@azure/storage-blob';
import './App.css'
import Header from './UI/Header';
import { useEffect, useState } from 'react';
import TabLayoutContainer from './components/TabLayoutContainer';
import UploadForm from './components/UploadForm';
import AppContext, { ClickedImage } from './store/AppContext';


export interface Screen {
  title: string;
  image: string;
  description: string;
};

export interface ImageBlob {
  name: string;
  url: string;
};

const account = import.meta.env.VITE_STORAGE_ACCOUNT  // get the storage account name from the .env file
const containerName = import.meta.env.VITE_STORAGE_CONTAINER
const sas = import.meta.env.STORAGE_SAS
const endpoint = `https://${account}.blob.core.windows.net/?${sas}`
// const blobServiceClient = new BlobServiceClient(endpoint, defaultCredential);  
const blobServiceClient = new BlobServiceClient(endpoint);  // create a blobServiceClient
// const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);  // create a blobServiceClient
const containerClient = blobServiceClient.getContainerClient(containerName);  // create a containerClient



function App() {
  const [imageUrls, setImageUrls] = useState<Record<string, unknown>[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchError, setIsFetchError] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ClickedImage>({ name: "", url: "" });

  useEffect(() => {
    console.log("SELECTED IMAGE: ", selectedImage);
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

  const selectedImageHandler = (imageDetails: ClickedImage) => {
    setSelectedImage(imageDetails);
  }

  return (
    <AppContext.Provider value={{ setSelectedImage: selectedImageHandler, selectedImage: selectedImage }}>
      <div>
        <Header />
        {
          !isFetchError && !isLoading &&
          (
            <>
              <UploadForm refreshImages={fetchBlobs} containerClient={containerClient} isLoading={setIsLoading} />
              <TabLayoutContainer images={imageUrls} />
            </>

          )
        }
      </div>
    </AppContext.Provider>
  );
};

export default App;