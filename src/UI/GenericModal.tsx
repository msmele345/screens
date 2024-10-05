import { ReactElement } from "react";
import { parseFileName } from "../components/StorageImagesList";

interface GenericModalProps {
    onClose?: () => void;
    imageUrl: string;
    imageName: string;
    className?: string;
}


function GenericModal({ onClose, imageName, imageUrl, className = ""}: GenericModalProps): ReactElement {
    return (
      <>
        <div className={"backdrop"} onClick={onClose} />
        <dialog open className={'modal'}>
            <img src={imageUrl as string ?? 'beans url'} alt="Image Not Available" />
            <h3 style={{ width: "450px" }}>{parseFileName(imageName)}</h3>
            <form action="dialog">
              <button>Close</button>
            </form>
        </dialog>
      </>
    );
  }
  
export default GenericModal;