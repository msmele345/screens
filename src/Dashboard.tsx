import { useState } from 'react';
import './App.css';
import ImageGallery from './components/ImageGallery';
import AppContext, { ClickedImage } from './store/AppContext';
import GenericModal from './UI/GenericModal';
import Header from './UI/Header';
import FeedbackContainer from './components/FeedbackContainer';
import MainNavigation from './UI/MainNavigation';

export interface Screen {
  title: string;
  image: string;
  description: string;
};

export interface ImageBlob {
  name: string;
  url: string;
};


function Dashboard() {
  const [selectedImage, setSelectedImage] = useState<ClickedImage | null>(null);

  const selectedImageHandler = (imageDetails: ClickedImage) => {
    setSelectedImage(imageDetails);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <AppContext.Provider value={{ setSelectedImage: selectedImageHandler, selectedImage: selectedImage }}>
        <main>
          {!selectedImage ?
            <div>
                <Header />
              <ImageGallery />
            </div>
            : (
              selectedImage &&
              <GenericModal
                imageName={selectedImage?.name ?? ""}
                imageUrl={selectedImage?.url ?? ""}
                onClose={closeModal}
              />
            )
          }
          <FeedbackContainer />
        </main>
      </AppContext.Provider>
    </div>
  );
};

export default Dashboard;