import { BlobServiceClient } from '@azure/storage-blob';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from "@mui/material/Button";
import { useState } from "react";
import UploadPreviewWindow from "./UploadPreviewWindow";

interface UploadFormProps {
    refreshImages: () => Promise<void>;
};

const blobServiceClient = new BlobServiceClient('https://reactblob1.blob.core.windows.net/sa1?sp=r&st=2024-12-27T13:11:38Z&se=2025-01-04T21:11:38Z&spr=https&sv=2022-11-02&sr=c&sig=5iOFAp7pwOPKn%2BkehU%2FXOo1adUdtdhLVMziK9B3lmnU%3D');
const containerName = "sa1";
const containerClient = blobServiceClient.getContainerClient(containerName);

const UploadForm = ({ refreshImages }: UploadFormProps) => {

    const [file, setFile] = useState<any>(null);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!file) {
            alert('Please select an image to upload');
            return;
        }

        try {
            const blobName = file.name as string;
            const blobClient = containerClient.getBlockBlobClient(blobName);
            console.log("HERE IN BLOB UPLOAD PAST CLIENT")
            await blobClient.uploadData(file);
            await refreshImages();
        } catch (error) {
            console.error("Upload Error", { error });
        }
    };

    const onChangeHandler = (e: any) => {
        if (e.target && e.target.files) {
            setFile(e.target.files[0])
        }
    }

    return (
        <div className="row-form">
            <form className='upload-form'>
                <UploadPreviewWindow file={file} />
                <div className='upload-form_inputs'>
                    <label htmlFor="fileInput">Click here to add image</label>
                    <input type="file" style={{ display: "none" }} id="fileInput" onChange={onChangeHandler} />
                    <div className='upload-button'>
                        <Button 
                            type='submit' 
                            variant="contained" 
                            color="secondary" 
                            disableElevation 
                            onClick={handleSubmit}
                            startIcon={<CloudUploadIcon/>}
                        >
                           Upload
                        </Button>
                    </div>
                {/* <FileUploadButton/> TODO */}
                </div>
            </form>
        </div>
    )
};

export default UploadForm;