
export interface ImagesListProps {
    images: Record<string, unknown>[];
}

const StorageImagesList = ({ images = [] }: ImagesListProps) => {

    const parseFileName = (filename?: string): string => {
        if (!filename || !filename.includes("_")) {
            return "beans";
        }

        const name = filename.split('_')[1];

        if(name.includes(".")) {
            return name.substring(0, name.indexOf("."));
        }
        
        return name;
    }

    return (
        <div className="card-container">
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