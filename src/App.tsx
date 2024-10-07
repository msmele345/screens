import { BlobServiceClient } from '@azure/storage-blob';
import './App.css'
import Header from './UI/Header';
import { useEffect, useState } from 'react';
import AppContext, { ClickedImage } from './store/AppContext';
import ImageGallery from './components/ImageGallery';


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
  const [selectedImage, setSelectedImage] = useState<ClickedImage| null>(null);

  useEffect(() => {
    console.log("TOP LEVEL SELECTED IMAGE: ", selectedImage);
  }, [selectedImage]);

  const selectedImageHandler = (imageDetails: ClickedImage) => {
    setSelectedImage(imageDetails);
  }

  return (
    <AppContext.Provider value={{ setSelectedImage: selectedImageHandler, selectedImage: selectedImage }}>
      <div>
        <Header />
        <ImageGallery containerClient={containerClient} />
      </div>
    </AppContext.Provider>
  );
};

export default App;