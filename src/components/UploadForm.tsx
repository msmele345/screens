import { Dispatch, SetStateAction, useState } from "react";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { ContainerClient } from "@azure/storage-blob";

interface UploadFormProps {
    refreshImages: () => Promise<void>;
    containerClient: ContainerClient;
    isLoading: Dispatch<SetStateAction<boolean>>;
}

const UploadForm = ({ refreshImages, containerClient, isLoading }: UploadFormProps) => {

    const [file, setFile] = useState<any>(null);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!file) {  // check if the file is selected
            alert('Please select an image to upload');
            return;
        }

        try {
            isLoading(true);
            const blobName = `${new Date().getTime()}-${file.name as string}`; // Specify a default blob name if needed
            const blobClient = containerClient.getBlockBlobClient(blobName);  // get the blob client
            await blobClient.uploadData(file, { blobHTTPHeaders: { blobContentType: file.type } }); // upload the image
            await refreshImages();   // fetch all images again after the upload is completed
        } catch (error) {
            console.error("Upload Error", error);  // Handle error
        } finally {
            isLoading(false); // Turn off loading
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