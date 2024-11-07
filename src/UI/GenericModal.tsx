import { ReactElement } from "react";
import ConcertIcon from '../assets/concert2.jpg';
import { parseFileName } from "../components/StorageImagesList";

export interface GenericModalProps {
  onClose?: () => void;
  imageUrl: string;
  imageName: string;
  className?: string;
}


function GenericModal({ onClose, imageName, imageUrl, className = "" }: GenericModalProps): ReactElement {

  return (
    <>
      <div className={"backdrop"} onClick={onClose} />
      <dialog open className={`modal ${className}`}>
        <img src={imageUrl as string || ConcertIcon } alt="Image Not Available" />
        <div className="modal-dialogue">
          <h3 className="modal-header">{parseFileName(imageName)}</h3>
            <button className="button" onClick={onClose}>Close</button>
        </div>
      </dialog>
    </>
  );
}

export default GenericModal;