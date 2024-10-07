import { createContext } from "react";


export type ClickedImage = {
    name: string;
    url: string;
    year?: string
}

export interface AppContextValues {
    setSelectedImage: (imageDetails: ClickedImage) => void; 
    selectedImage: ClickedImage | null;
}

const defaultAppState: AppContextValues = {
    setSelectedImage:  () => {},
    selectedImage: {name: "default", url: 'default'}
}

const AppContext = createContext<AppContextValues>(defaultAppState);

export default AppContext;
