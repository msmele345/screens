import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import getContainerClient from "../storage/storageclient";

interface UploadFormProps {
    refreshImages: () => Promise<void>;
    isLoading: Dispatch<SetStateAction<boolean>>;
}

const UploadForm = ({ refreshImages, isLoading }: UploadFormProps) => {

    const [file, setFile] = useState<any>(null);

    useEffect(() => {
        console.log("HERE IN UPLOAD with selected file:  ", file)
    }, [file]);

    const containerClient = getContainerClient();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!file) {  // check if the file is selected
            alert('Please select an image to upload');
            return;
        }

        try {
            isLoading(true);
            const blobName = `${new Date().getFullYear()}-${file.name as string}`;
            const blobClient = containerClient.getBlockBlobClient(blobName);  
            console.log("HERE IN BLOB UPLOAD PAST CLIENT")
            await blobClient.uploadData(file, { blobHTTPHeaders: { blobContentType: file.type } }); 
            // await refreshImages();  
        } catch (error) {
            console.error("Upload Error", error);  // Handle error
        } finally {
            isLoading(false); 
        }
    };

    const onChangeHandler = (e: any) => {
        if(e.target && e.target.files) {
            console.log("FILES: ", e.target.files)
            setFile(e.target.files[0])
        }
    }

    const setFormDisplay = () => {
        return file ? <img className="displayImg" src={URL.createObjectURL(file)} alt="no pic" /> : <UploadFileIcon/>
    }

    return (
        <div className="row-form">
            <form className='upload-form'>
                <div className='upload-form_display'>
                    {
                        file ? <img className="displayImg" src={URL.createObjectURL(file)} alt="no pic" /> : <></>
                    }
                </div>
                <div className='upload-form_inputs'>
                    <label htmlFor="fileInput"> Click Here To Add an Image</label>
                    <input type="file" style={{ display: "none" }} id="fileInput" onChange={onChangeHandler} />
                    <button type="submit" onClick={handleSubmit} >Upload</button>
                </div>
            </form>
        </div>
    )
};

export default UploadForm;