import { useContext } from "react";
import AppContext from "../store/AppContext";
import BlobImageItem from "./BlobImageItem";

export interface ImagesListProps {
    images: Record<string, unknown>[];
}

export const parseFileName = (filename?: string): string => {
    if (!filename || !filename.includes("_")) {
        return "beans";
    }

    const name = filename.split('_')[1];

    if (name.includes(".")) {
        return name.substring(0, name.indexOf("."));
    }

    return name;
}

const StorageImagesList = ({ images = [] }: ImagesListProps) => {

    const appContext = useContext(AppContext);

    const imageClickHandler = (e: any) => {
        console.log("Clicked on image", e.target.attributes['src']);
        appContext.setSelectedImage({ name: "default parse me from url", url: e.target.attributes['src'] });
    }

    return (
        <div className="card-container">
            {images && images.map((blob, index) => {
                return (
                    <div key={index} style={{margin: "3px"}}>
                        <BlobImageItem
                            imageName={blob.name as string ?? ""}
                            imageUrl={blob.url as string}
                            onClickHandler={imageClickHandler}
                        />
                    </div>
                )
            })}
        </div>
    )
};

export default StorageImagesList;