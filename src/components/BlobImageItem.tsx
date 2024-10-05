import { Dispatch, SetStateAction, useState } from "react";
import { parseFileName } from "./StorageImagesList";

interface BlobImageItemProps {
    imageUrl: string;
    imageName: string;
    className?: string;
    onCloseHandler?: Dispatch<SetStateAction<boolean>>;
}

const BlobImageItem = ({ imageName, imageUrl }: BlobImageItemProps) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const imageClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log("Clicked on image", e.target);
        setIsExpanded(!isExpanded);
    }

    return (
        <div className='card' onClick={imageClickHandler}>
            <img src={imageUrl as string ?? 'beans url'} alt="Image Not Available" />
            <h3 style={{ width: "90%" }}>{parseFileName(imageName as string)}</h3>
            {/* <button className="del" onClick={() => handleDelete(blobItem.name)} > <AiFillDelete /> </button> */}
        </div>
    )
}

export default BlobImageItem;