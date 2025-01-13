import { ChangeEvent, useContext } from "react";
import AppContext from "../store/AppContext";
import { getImageName } from "../util/StringUtils";
import BlobImageItem from "./BlobImageItem";
import axios, { AxiosResponse } from "axios";

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

type StatusResponse = {
    resultStatus: string
};

const StorageImagesList = ({ images = [] }: ImagesListProps) => {

    const appContext = useContext(AppContext);

    const imageClickHandler = async (event: ChangeEvent<HTMLImageElement>) => {
        const url = (event.target as HTMLImageElement).src as string
        appContext.setSelectedImage({ name: getImageName(url), url:  url});

        let statusResponse: AxiosResponse<StatusResponse>;

        try {
          statusResponse = await axios.post('http://localhost:8086/image-status', {
                id: crypto.randomUUID(),
                currentStatus: "VIEWED",
                imageName: getImageName(url)
            });
            console.log("IMAGE STATUS HTTP CALL SUCCESS. RESPONSE: ", statusResponse.data);
        } catch(e: any) {
            console.error('IMAGE STATUS HTTP ERROR', {e});
        }

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