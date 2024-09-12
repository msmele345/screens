import { useEffect } from "react";

interface ImagesListProps {
    images: Record<string, unknown>[];
}

const StorageImagesList = ({ images = [] }: ImagesListProps) => {
    useEffect(() => {
        console.log("LIST URLS: ", images)
    }, [])


    const parseFileName = (filename?: string): string => {
        if (!filename || !filename.includes(".")) {
            return "beans";
        }
        return filename.split('.')[0]
    }

    return (
        <div>
            {images && images.map((blob, index) => {
                return (
                    <div key={index} className='card'>
                        <img src={blob.url as string ?? 'beans url'} alt="no pic" />
                        <h3 style={{ width: "90%" }}>{parseFileName(blob.name as string)}</h3>
                        {/* <button className="del" onClick={() => handleDelete(blobItem.name)} > <AiFillDelete /> </button> */}
                    </div>
                )
            })}
        </div>
    )
};

export default StorageImagesList;

/* 
    return (
        <div>
            {images && images.map((blob, index) => {
                return (
                    <div key={index} className='card'>
                        <img src={blob.url as string ?? 'beans url'} alt="no pic" />
                        <h3 style={{ width: "90%" }}>{parseFileName(blob.name as string)}</h3>
//                         </div>
//                     )
//                 })}
//             </div>
//         )

// */