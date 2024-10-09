import { BlobServiceClient } from '@azure/storage-blob';
import './App.css'
import Header from './UI/Header';
import { useEffect, useState } from 'react';
import AppContext, { ClickedImage } from './store/AppContext';
import ImageGallery from './components/ImageGallery';
import GenericModal from './UI/GenericModal';


export interface Screen {
  title: string;
  image: string;
  description: string;
};

export interface ImageBlob {
  name: string;
  url: string;
};


function App() {
  const [selectedImage, setSelectedImage] = useState<ClickedImage | null>(null);

  useEffect(() => {
    console.log("TOP LEVEL SELECTED IMAGE: ", selectedImage);
  }, [selectedImage]);

  const selectedImageHandler = (imageDetails: ClickedImage) => {
    setSelectedImage(imageDetails);
  }

  return (
    <AppContext.Provider value={{ setSelectedImage: selectedImageHandler, selectedImage: selectedImage }}>
      {!selectedImage ?
        <div>
          <Header />
          <ImageGallery />
        </div>
        : (
          selectedImage && <GenericModal imageName={selectedImage?.name ?? ""} imageUrl={selectedImage?.url ?? ""} />
        )
      }
    </AppContext.Provider>
  );
};

export default App;