import { useState } from 'react';
import './App.css';
import ImageGallery from './components/ImageGallery';
import AppContext, { ClickedImage } from './store/AppContext';
import GenericModal from './UI/GenericModal';
import Header from './UI/Header';


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

  const selectedImageHandler = (imageDetails: ClickedImage) => {
    setSelectedImage(imageDetails);
  };

  const closeModal = () => {
    setSelectedImage(null);
  }

  return (
    <AppContext.Provider value={{ setSelectedImage: selectedImageHandler, selectedImage: selectedImage }}>
      {!selectedImage ?
        <div>
          <Header />
          <ImageGallery />
        </div>
        : (
          selectedImage && <GenericModal 
                              imageName={selectedImage?.name ?? ""} 
                              imageUrl={selectedImage?.url ?? ""} 
                              onClose={closeModal}
                            />
        )
      }
    </AppContext.Provider>
  );
};

export default App;