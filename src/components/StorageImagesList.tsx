import { useEffect } from "react";
import { ImageBlob } from "../App";
import Card from "../UI/Card";

interface ImagesListProps {
    images: Record<string, unknown>[];
}

const StorageImagesList = ({ images = [] }: ImagesListProps) => {
    useEffect(() => {
        console.log("LIST URLS: ",images)
    }, [])
    return (
        <div>
            <ul id="screens">
                {images && images.map((blob, index) => {
                    return (
                        <li className="screen">
                            <Card key={index} >
                                <img src={blob.url as string ?? 'beans url'} alt="no pic" />
                                <h3 style={{ width: "90%" }}>{blob.name as string ?? 'beans name'}</h3>
                                {/* <button className="del" onClick={() => handleDelete(blobItem.name)} > <AiFillDelete /> </button> */}
                            </Card>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
};

export default StorageImagesList;