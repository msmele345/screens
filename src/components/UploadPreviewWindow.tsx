import { ReactElement } from "react";

interface UploadedImageWindowProps {
    file?: any
}

const UploadPreviewWindow = ({ file }: UploadedImageWindowProps): ReactElement => {
    return (
        <div className='upload-form_display'>
            {
                file ? <img className="displayImg" src={URL.createObjectURL(file)} alt="no pic" /> : <></>
            }
        </div>
    )
};

export default UploadPreviewWindow;