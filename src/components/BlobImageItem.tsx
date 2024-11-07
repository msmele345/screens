import { Dispatch, SetStateAction } from "react";
import { parseFileName } from "./StorageImagesList";

interface BlobImageItemProps {
    imageUrl: string;
    imageName: string;
    onClickHandler: (e: any) => void;
    className?: string;
    onCloseHandler?: Dispatch<SetStateAction<boolean>>;
}

const BlobImageItem = ({ imageName, imageUrl, onClickHandler }: BlobImageItemProps) => {

    return (
        <div className='card'>
            <img src={imageUrl as string ?? 'beans url'} onClick={onClickHandler} alt="Image Not Available" />
            <h3 style={{ color: '#d9c9ee'}}>{parseFileName(imageName as string)}</h3>
        </div>
    )
}

export default BlobImageItem;