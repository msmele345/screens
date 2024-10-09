import { Dispatch, SetStateAction, useState } from "react";
import { parseFileName } from "./StorageImagesList";

interface BlobImageItemProps {
    imageUrl: string;
    imageName: string;
    onClickHandler: (e: any) => void;
    className?: string;
    onCloseHandler?: Dispatch<SetStateAction<boolean>>;
}

const BlobImageItem = ({ imageName, imageUrl, onClickHandler }: BlobImageItemProps) => {

    const imageClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log("Clicked on image", e.target);

    }

    return (
        <div className='card' onClick={onClickHandler}>
            <img src={imageUrl as string ?? 'beans url'} alt="Image Not Available" />
            <h3 style={{ color: '#d9c9ee'}}>{parseFileName(imageName as string)}</h3>
            {/* <button className="del" onClick={() => handleDelete(blobItem.name)} > <AiFillDelete /> </button> */}
        </div>
    )
}

export default BlobImageItem;